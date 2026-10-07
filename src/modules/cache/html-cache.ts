/**
 * HTML 页面缓存：
 * - 优先 Cloudflare `caches.default`（按站点真实 origin + 世代键）
 * - 本地 Node / astro dev 回退到进程内 Map
 * - 常态 TTL 默认 48h；内容新鲜度靠 CMS webhook / 部署后 revalidate
 * - Zone Purge 清不掉 Worker Cache API，必须在本模块 delete 或换世代
 */

import {
  DEFAULT_HTML_CACHE_TTL_SECONDS,
  MIN_HTML_CACHE_TTL_SECONDS,
} from '../site/manifest';
import { COLLECTION_PATH_PREFIXES } from './revalidate-map';

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
/** 进程内世代：hosts/全站 purge 后使本 isolate 全部 HTML 条目失效 */
let memoryPurgeGeneration = 0;
const DEFAULT_TTL_SECONDS = DEFAULT_HTML_CACHE_TTL_SECONDS;
const PURGE_GEN_REQ = 'https://html-cache.internal/meta/purge-generation';

function cacheKey(url: URL) {
  return `${url.pathname}${url.search}`;
}

/** 部署工具写入的世代；变更后旧 Cache API 条目全部失效（Zone Purge 清不掉 Worker Cache） */
async function cacheEpoch(): Promise<string> {
  try {
    const { envAsync } = await import('../runtime/env');
    const epoch = (await envAsync('HTML_CACHE_EPOCH')).trim();
    if (epoch) return epoch;
  } catch {
    // ignore
  }
  return '0';
}

/** Cache API 请求键：origin + epoch + path，避免跨部署串缓存 */
async function cacheApiRequest(url: URL) {
  const path = `${url.pathname}${url.search}` || '/';
  const origin = url.origin && url.origin !== 'null' ? url.origin : 'https://html-cache.local';
  const epoch = await cacheEpoch();
  return new Request(new URL(`/.html-cache/${epoch}${path}`, origin).href, {
    method: 'GET',
  });
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

async function readCacheApiPurgeGeneration(cache: Cache): Promise<number> {
  try {
    const hit = await cache.match(PURGE_GEN_REQ);
    if (!hit) return 0;
    const n = Number(await hit.text());
    return Number.isFinite(n) ? n : 0;
  } catch {
    return 0;
  }
}

async function bumpCacheApiPurgeGeneration(cache: Cache) {
  const next = Date.now();
  memoryPurgeGeneration = next;
  try {
    await cache.put(PURGE_GEN_REQ, new Response(String(next)));
  } catch {
    // ignore
  }
}

export async function getCachedHtml(url: URL): Promise<HtmlCacheEntry | null> {
  const key = cacheKey(url);
  const now = Date.now();

  const cachesApi = getGlobalCaches();
  if (cachesApi?.default) {
    try {
      const gen = await readCacheApiPurgeGeneration(cachesApi.default);
      const req = await cacheApiRequest(url);
      const hit = await cachesApi.default.match(req);
      if (hit) {
        const storedAt = Number(hit.headers.get('x-html-cache-stored') || 0);
        const storedExp = hit.headers.get('x-html-cache-expires');
        // 无 stored 时间戳的旧条目：有 purge 世代时一律作废
        if ((gen && (!storedAt || storedAt < gen)) || (storedExp && Number(storedExp) <= now)) {
          await cachesApi.default.delete(req).catch(() => undefined);
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
  const storedHeader = mem.headers.find(([k]) => k.toLowerCase() === 'x-html-cache-stored');
  const storedAt = Number(storedHeader?.[1] || 0);
  if (storedAt && memoryPurgeGeneration && storedAt < memoryPurgeGeneration) {
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
  const storedAt = Date.now();
  const headers = [...response.headers.entries()].filter(([name]) => {
    const n = name.toLowerCase();
    return n !== 'set-cookie' && n !== 'transfer-encoding';
  });
  headers.push(['x-html-cache-expires', String(expiresAt)]);
  headers.push(['x-html-cache-stored', String(storedAt)]);
  const hasCc = headers.some(([n]) => n.toLowerCase() === 'cache-control');
  if (!hasCc) {
    headers.push(['Cache-Control', `public, max-age=${ttl}`]);
  }

  const entry: HtmlCacheEntry = { status: response.status, headers, body, expiresAt };
  MEMORY.set(key, entry);

  const cachesApi = getGlobalCaches();
  if (cachesApi?.default) {
    try {
      const req = await cacheApiRequest(url);
      await cachesApi.default.put(
        req,
        new Response(body, { status: entry.status, headers: entry.headers })
      );
    } catch (err) {
      console.warn('[html-cache] Cache API put failed', key, err);
    }
  }
}

/** purge=all 时 Cache API 无法列举键：展开站点已知路径逐条 delete */
function siteDocumentPaths(locales: string[]) {
  const prefixes = new Set<string>(['/']);
  for (const list of Object.values(COLLECTION_PATH_PREFIXES)) {
    for (const p of list) prefixes.add(p);
  }
  const out = new Set<string>();
  for (const prefix of prefixes) {
    out.add(prefix);
    for (const locale of locales) {
      if (!locale) continue;
      if (prefix === '/') out.add(`/${locale}`);
      else out.add(`/${locale}${prefix}`);
    }
  }
  return [...out];
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

async function purgeCloudflareZone(options: {
  files: string[];
  /** 集合前缀失效时用 hosts：files 无法覆盖 /products/{id} 等详情 URL */
  hosts?: string[];
}) {
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
  const purgeEverything = options.files.includes('/*');
  const hosts = (options.hosts || []).map((h) => h.trim().toLowerCase()).filter(Boolean);
  let payload: Record<string, unknown>;
  if (purgeEverything) {
    payload = { purge_everything: true };
  } else if (hosts.length) {
    // 内容变更：清该主机全部边缘缓存（含详情页）；比只 purge 列表 URL 可靠
    payload = { hosts };
  } else {
    const files = options.files.filter((item) => item.startsWith('http'));
    if (!files.length) {
      return { ok: false, skipped: true, detail: '无绝对 URL / hosts 可供 CF purge' };
    }
    payload = { files };
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

  const singleExact =
    !patterns.includes('/*')
    && patterns.length === 1
    && !patterns[0]!.endsWith('/*');
  const broadPurge = patterns.includes('/*') || !singleExact;

  if (broadPurge) {
    deleted += MEMORY.size;
    MEMORY.clear();
    usedMemory = true;
    memoryPurgeGeneration = Date.now();
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
    if (broadPurge) {
      await bumpCacheApiPurgeGeneration(cachesApi.default);
    }
    const toDelete = patterns.includes('/*')
      ? siteDocumentPaths(options.locales)
      : [
          ...patterns.filter((p) => p !== '/*'),
          ...siteDocumentPaths(options.locales).filter((p) => matchesPath(p, patterns)),
        ];
    for (const pathOnly of [...new Set(toDelete)]) {
      const pathname = pathOnly.split('?')[0] || pathOnly;
      try {
        const reqUrl = origin
          ? new URL(pathname, origin)
          : new URL(pathname, 'https://html-cache.local');
        const ok = await cachesApi.default.delete(await cacheApiRequest(reqUrl));
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

  let hosts: string[] | undefined;
  if (!patterns.includes('/*') && origin && !singleExact) {
    try {
      hosts = [new URL(origin).host];
    } catch {
      hosts = undefined;
    }
  }
  const cloudflare = await purgeCloudflareZone({
    files: cfFiles,
    hosts,
  });

  const mode: PurgeResult['mode'] =
    cloudflare.ok && (usedMemory || usedCacheApi)
      ? 'mixed'
      : cloudflare.ok
        ? 'cloudflare-api'
        : usedCacheApi
          ? 'cache-api'
          : 'memory';

  lastPurge = {
    paths: patterns.includes('/*') ? ['/*', ...siteDocumentPaths(options.locales)] : patterns,
    deleted,
    mode,
    cloudflare,
    at: Date.now(),
  };
  return lastPurge;
}
