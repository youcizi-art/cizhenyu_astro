/**
 * 单次 SSR 请求内的 GET 去重（同 URL 并发合并）。
 * 成功结果不跨请求保留，避免 Workers isolate 脏读。
 */

const inflight = new Map<string, Promise<unknown>>();

export function buildRequestCacheKey(url: string, method = 'GET') {
  return `${method.toUpperCase()}:${url}`;
}

export async function withRequestCache<T>(key: string, loader: () => Promise<T>): Promise<T> {
  const pending = inflight.get(key);
  if (pending) return pending as Promise<T>;

  const promise = (async () => {
    try {
      return await loader();
    } finally {
      inflight.delete(key);
    }
  })();

  inflight.set(key, promise);
  return promise;
}
