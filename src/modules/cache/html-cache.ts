/**
 * HTML 页面缓存：
 * - 优先 Cloudflare `caches.default`（按站点真实 origin 建键）
 * - 本地 Node / astro dev 回退到进程内 Map
 * - 常态 TTL 默认 48h（对齐 s-maxage）；内容新鲜度靠 CMS webhook purge，不靠短过期
 * - 可选 CF Zone Purge API（生产 CDN）
 */

import {
  DEFAULT_HTML_CACHE_TTL_SECONDS,
  MIN_HTML_CACHE_TTL_SECONDS,
} from '../site/manifest';

export type HtmlCacheEntry = {
  status: number;
  headers: Array<[string, string]>;
  body: string;
  expiresAt: number;
};

export type PurgeResult = {
  paths: string[];
  deleted: number;
  mode: 'memory' | 'cache-api' | 'cloudflare-api' | 'mixed';
  cloudflare?: { ok: boolean; skipped?: boolean; detail?: string };
  at: number;
};

const MEMORY = new Map<string, HtmlCacheEntry>();
let lastPurge: PurgeResult | null = null;
const DEFAULT_TTL_SECONDS = DEFAULT_HTML_CACHE_TTL_SECONDS;

function cacheKey(url: URL) {
  return `${url.pathname}${url.search}`;
}

/** Cache API 请求键：使用页面真实 origin，避免 html-cache.local 碎片化 */
function cacheApiRequest(url: URL) {
  const path = `${url.pathname}${url.search}` || '/';
  const origin = url.origin && url.origin !== 'null' ? url.origin : 'https://html-cache.local';
  return new Request(new URL(path, origin).href, { method: 'GET' });
}

type CfCacheStorage = CacheStorage & { default?: Cache };

function getGlobalCaches(): CfCacheStorage | undefined {
  const g = globalThis as typeof globalThis & { caches?: CfCacheStorage };
  return g.caches;
}

export function getLastPurge() {
  return lastPurge;
}

/** 本地开发默认关闭 HTML 缓存，避免改 CMS 后页面看起来「不是真实数据」 */
export function shouldUseHtmlCache() {
  const force = String(import.meta.env.HTML_CACHE_IN_DEV || '').trim() === '1';
  if (import.meta.env.DEV && !force) return false;
  if (String(import.meta.env.DISABLE_HTML_CACHE || '').trim() === '1') return false;
  return true;
}

function readTtlSeconds(headers?: Headers | Array<[string, string]>) {
  const raw =
    headers instanceof Headers
      ? headers.get('cache-control') || ''
      : (headers || []).find(([k]) => k.toLowerCase() === 'cache-control')?.[1] || '';
  const match = /s-maxage=(\d+)/i.exec(raw) || /max-age=(\d+)/i.exec(raw);
  const ttl = match ? Number(match[1]) : DEFAULT_TTL_SECONDS;
  if (!Number.isFinite(ttl) || ttl <= 0) return DEFAULT_TTL_SECONDS;
  return Math.max(MIN_HTML_CACHE_TTL_SECONDS, Math.floor(ttl));
}

export async function getCachedHtml(url: URL): Promise<HtmlCacheEntry | null> {
  const key = cacheKey(url);
  const now = Date.now();

  const cachesApi = getGlobalCaches();
  if (cachesApi?.default) {
    try {
      const hit = await cachesApi.default.match(cacheApiRequest(url));
      if (hit) {
        const storedExp = hit.headers.get('x-html-cache-expires');
        if (storedExp && Number(storedExp) <= now) {
          await cachesApi.default.delete(cacheApiRequest(url)).catch(() => undefined);
        } else {
          return {
            status: hit.status,
            headers: [...hit.headers.entries()],
            body: await hit.text(),
            expiresAt: storedExp
              ? Number(storedExp)
              : now + readTtlSeconds(hit.headers) * 1000,
          };
        }
      }
    } catch {
      // fall through to memory
    }
  }

  const mem = MEMORY.get(key);
  if (!mem) return null;
  if (mem.expiresAt <= now) {
    MEMORY.delete(key);
    return null;
  }
  return mem;
}

export async function putCachedHtml(url: URL, response: Response) {
  const key = cacheKey(url);
  const body = await response.text();
  const ttl = readTtlSeconds(response.headers);
  const expiresAt = Date.now() + ttl * 1000;
  const headers = [...response.headers.entries()].filter(([name]) => {
    const n = name.toLowerCase();
    return n !== 'set-cookie' && n !== 'transfer-encoding';
  });
  headers.push(['x-html-cache-expires', String(expiresAt)]);
  // 确保存储条目带长 max-age，供 Cache API 与兜底读取
  const hasCc = headers.some(([n]) => n.toLowerCase() === 'cache-control');
  if (!hasCc) {
    headers.push(['Cache-Control', `public, max-age=${ttl}`]);
  }

  const entry: HtmlCacheEntry = { status: response.status, headers, body, expiresAt };
  MEMORY.set(key, entry);

  const cachesApi = getGlobalCaches();
  if (cachesApi?.default) {
    try {
      await cachesApi.default.put(
        cacheApiRequest(url),
        new Response(body, { status: entry.status, headers: entry.headers })
      );
    } catch (err) {
      console.warn('[html-cache] Cache API put failed', key, err);
    }
  }
}

function expandPaths(paths: string[], locales: string[]) {
  const out = new Set<string>();
  for (const raw of paths) {
    const path = String(raw || '').trim();
    if (!path) continue;
    if (path === '/*' || path === '*') {
      out.add('/*');
      continue;
    }
    out.add(path.startsWith('/') ? path : `/${path}`);
    if (!locales.some((locale) => path === `/${locale}` || path.startsWith(`/${locale}/`))) {
      for (const locale of locales) {
        out.add(`/${locale}${path === '/' ? '' : path}`);
      }
    }
  }
  return [...out];
}

function matchesPath(key: string, patterns: string[]) {
  if (patterns.includes('/*')) return true;
  const pathname = key.split('?')[0] || '/';
  return patterns.some((pattern) => {
    if (pattern.endsWith('/*')) {
      const prefix = pattern.slice(0, -1);
      return pathname.startsWith(prefix);
    }
    return pathname === pattern || pathname.startsWith(`${pattern}/`);
  });
}

async function purgeCloudflareFiles(files: string[]) {
  const { envAsync } = await import('../runtime/env');
  const zoneId = (await envAsync('CF_ZONE_ID')).trim();
  const token = (await envAsync('CF_API_TOKEN')).trim();
  if (!zoneId || !token) {
    return {
      ok: false,
      skipped: true,
      detail: 'CF_ZONE_ID/CF_API_TOKEN 未配置（Pages 需写入 secret 才能 Zone Purge）',
    };
  }
  const purgeEverything = files.includes('/*');
  const payload = purgeEverything
    ? { purge_everything: true }
    : { files: files.filter((item) => item.startsWith('http')) };

  if (!purgeEverything && !(payload as { files: string[] }).files.length) {
    return { ok: false, skipped: true, detail: '无绝对 URL 可供 CF purge' };
  }

  const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const body = (await res.json().catch(() => null)) as
    | { success?: boolean; errors?: Array<{ message?: string }> }
    | null;
  if (!res.ok || !body?.success) {
    return {
      ok: false,
      skipped: false,
      detail: body?.errors?.[0]?.message || `CF purge HTTP ${res.status}`,
    };
  }
  return { ok: true, skipped: false, detail: 'purged' };
}

export async function purgeHtmlPaths(options: {
  paths: string[];
  locales: string[];
  siteOrigin?: string;
}): Promise<PurgeResult> {
  const patterns = expandPaths(options.paths, options.locales);
  let deleted = 0;
  let usedCacheApi = false;
  let usedMemory = false;
  const origin = String(options.siteOrigin || '').replace(/\/$/, '');

  if (patterns.includes('/*')) {
    deleted += MEMORY.size;
    MEMORY.clear();
    usedMemory = true;
  } else {
    for (const key of [...MEMORY.keys()]) {
      if (matchesPath(key, patterns)) {
        MEMORY.delete(key);
        deleted += 1;
        usedMemory = true;
      }
    }
  }

  const cachesApi = getGlobalCaches();
  if (cachesApi?.default) {
    usedCacheApi = true;
    for (const pattern of patterns) {
      if (pattern === '/*') continue;
      const pathOnly = pattern.split('?')[0] || pattern;
      try {
        const reqUrl = origin
          ? new URL(pathOnly, origin)
          : new URL(pathOnly, 'https://html-cache.local');
        const ok = await cachesApi.default.delete(cacheApiRequest(reqUrl));
        if (ok) deleted += 1;
      } catch {
        // ignore
      }
    }
  }

  const cfFiles = patterns.includes('/*')
    ? ['/*']
    : patterns
        .filter((item) => item !== '/*')
        .map((item) => (origin ? `${origin}${item}` : item));

  const cloudflare = await purgeCloudflareFiles(cfFiles);

  const mode: PurgeResult['mode'] =
    cloudflare.ok && (usedMemory || usedCacheApi)
      ? 'mixed'
      : cloudflare.ok
        ? 'cloudflare-api'
        : usedCacheApi
          ? 'cache-api'
          : 'memory';

  lastPurge = {
    paths: patterns,
    deleted,
    mode,
    cloudflare,
    at: Date.now(),
  };
  return lastPurge;
}
