import { defineMiddleware } from 'astro:middleware';
import { getCachedHtml, putCachedHtml, shouldUseHtmlCache } from '@/modules/cache/html-cache';

/** 阶段 D：缓存公开 HTML GET，供 /api/revalidate 真实失效 */
export const onRequest = defineMiddleware(async (context, next) => {
  const { request } = context;
  if (request.method !== 'GET') return next();

  const url = new URL(request.url);
  if (url.pathname.startsWith('/api/')) return next();

  const useCache = shouldUseHtmlCache();
  if (useCache) {
    const cached = await getCachedHtml(url);
    if (cached) {
      const headers = new Headers(cached.headers);
      headers.set('X-HTML-Cache', 'HIT');
      return new Response(cached.body, { status: cached.status, headers });
    }
  }

  const response = await next();
  const contentType = response.headers.get('content-type') || '';
  if (!useCache || !response.ok || !contentType.includes('text/html')) {
    if (!useCache) {
      const headers = new Headers(response.headers);
      headers.set('X-HTML-Cache', 'BYPASS');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }
    return response;
  }

  const clone = response.clone();
  try {
    await putCachedHtml(url, clone);
  } catch {
    // 缓存写入失败不影响页面
  }

  const headers = new Headers(response.headers);
  headers.set('X-HTML-Cache', 'MISS');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
});
