/**
 * HTML 页面缓存（阶段 D）：
 * - 优先 Cloudflare `caches.default`（Pages/Workers 运行时）
 * - 本地 Node / astro dev 回退到进程内 Map（可验收 HIT/MISS/purge）
 * - 可选 CF Zone Purge API（生产 CDN）
 */

export type HtmlCacheEntry = {
  status: number;
  headers: Array<[string, string]>;
  body: string;
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

function cacheKey(url: URL) {
  return `${url.pathname}${url.search}`;
}

type CfCacheStorage = CacheStorage & { default?: Cache };

function getGlobalCaches(): CfCacheStorage | undefined {
  const g = globalThis as typeof globalThis & { caches?: CfCacheStorage };
  return g.caches;
}

export function getLastPurge() {
  return lastPurge;
}

export async function getCachedHtml(url: URL): Promise<HtmlCacheEntry | null> {
  const key = cacheKey(url);
  const cachesApi = getGlobalCaches();
  if (cachesApi?.default) {
    try {
      const hit = await cachesApi.default.match(new Request(`https://html-cache.local${key}`));
      if (hit) {
        return {
          status: hit.status,
          headers: [...hit.headers.entries()],
          body: await hit.text(),
        };
      }
    } catch {
      // fall through to memory
    }
  }
  return MEMORY.get(key) || null;
}

export async function putCachedHtml(url: URL, response: Response) {
  const key = cacheKey(url);
  const body = await response.text();
  const headers = [...response.headers.entries()].filter(([name]) => {
    const n = name.toLowerCase();
    return n !== 'set-cookie' && n !== 'transfer-encoding';
  });
  const entry: HtmlCacheEntry = { status: response.status, headers, body };

  MEMORY.set(key, entry);

  const cachesApi = getGlobalCaches();
  if (cachesApi?.default) {
    try {
      await cachesApi.default.put(
        new Request(`https://html-cache.local${key}`),
        new Response(body, { status: entry.status, headers: entry.headers })
      );
    } catch {
      // ignore Cache API write failures in unsupported runtimes
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
    // 集合映射常给无 locale 前缀路径，展开到各 locale
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
  const zone = String(import.meta.env.CF_ZONE_ID || '').trim();
  const token = String(import.meta.env.CF_API_TOKEN || '').trim();
  if (!zone || !token) {
    return { ok: false, skipped: true, detail: 'CF_ZONE_ID/CF_API_TOKEN 未配置' };
  }
  const purgeEverything = files.includes('/*');
  const payload = purgeEverything
    ? { purge_everything: true }
    : { files: files.filter((item) => item.startsWith('http')) };

  if (!purgeEverything && !(payload as { files: string[] }).files.length) {
    return { ok: false, skipped: true, detail: '无绝对 URL 可供 CF purge' };
  }

  const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => null) as { success?: boolean; errors?: Array<{ message?: string }> } | null;
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
    // Cache API 无 list：对明确路径逐条 delete；/* 时只能依赖 TTL / CF API
    for (const pattern of patterns) {
      if (pattern === '/*') continue;
      const pathOnly = pattern.split('?')[0] || pattern;
      try {
        const ok = await cachesApi.default.delete(new Request(`https://html-cache.local${pathOnly}`));
        if (ok) deleted += 1;
      } catch {
        // ignore
      }
    }
  }

  const origin = String(options.siteOrigin || '').replace(/\/$/, '');
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
