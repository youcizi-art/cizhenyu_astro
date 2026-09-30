import { defineMiddleware } from 'astro:middleware';
import { getCachedHtml, putCachedHtml, shouldUseHtmlCache } from '@/modules/cache/html-cache';
import { warmRuntimeEnv } from '@/modules/runtime/env';
import { applyLocaleRouting } from '@/modules/i18n/locale-routing';

/** 运行时 env 预热 + 默认语种无前缀路由 + HTML 缓存 */
export const onRequest = defineMiddleware(async (context, next) => {
  await warmRuntimeEnv();

  const { request } = context;
  const url = new URL(request.url);

  if (request.method === 'GET' && !url.pathname.startsWith('/api/')) {
    const routed = await applyLocaleRouting(url);
    if (routed.action === 'redirect') {
      return context.redirect(routed.location, 302);
    }
    if (routed.action === 'rewrite') {
      const target = new URL(url.href);
      target.pathname = routed.pathname;
      // 继续走缓存逻辑时用「浏览器 URL」做 cache key，避免与 rewrite 路径混淆
      return runWithHtmlCache(context, url, () => context.rewrite(target));
    }
  }

  if (request.method !== 'GET') return next();
  if (url.pathname.startsWith('/api/')) return next();
  return runWithHtmlCache(context, url, next);
});

async function runWithHtmlCache(
  context: { request: Request },
  url: URL,
  next: () => Promise<Response> | Response
) {
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
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
