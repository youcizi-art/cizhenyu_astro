/**
 * SSR 请求 GET 去重（同 URL 并发合并）+ isolate 内存短期微缓存（60s）。
 * 既保证并发合并，又避免同容器频繁重复打 CMS。
 */

type MicroCacheEntry = {
  data: unknown;
  expiresAt: number;
};

const inflight = new Map<string, Promise<unknown>>();
const microCache = new Map<string, MicroCacheEntry>();
const DEFAULT_GET_TTL_MS = 60_000;

export function clearRequestDataCache() {
  microCache.clear();
}

export function buildRequestCacheKey(url: string, method = 'GET') {
  return `${method.toUpperCase()}:${url}`;
}

export async function withRequestCache<T>(
  key: string,
  loader: () => Promise<T>,
  options?: { ttlMs?: number; skipMicroCache?: boolean }
): Promise<T> {
  const isGet = key.startsWith('GET:');
  const now = Date.now();
  if (isGet && !options?.skipMicroCache) {
    const cached = microCache.get(key);
    if (cached && cached.expiresAt > now) {
      return cached.data as T;
    }
  }

  const pending = inflight.get(key);
  if (pending) return pending as Promise<T>;

  const promise = (async () => {
    try {
      const result = await loader();
      if (isGet && !options?.skipMicroCache) {
        const ttl = options?.ttlMs ?? DEFAULT_GET_TTL_MS;
        microCache.set(key, { data: result, expiresAt: Date.now() + ttl });
      }
      return result;
    } finally {
      inflight.delete(key);
    }
  })();

  inflight.set(key, promise);
  return promise;
}
