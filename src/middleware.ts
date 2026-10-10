import { defineMiddleware } from 'astro:middleware';
import { getCachedHtml, putCachedHtml, shouldUseHtmlCache } from '@/modules/cache/html-cache';
import { warmRuntimeEnv, envAsync } from '@/modules/runtime/env';
import { applyLocaleRouting } from '@/modules/i18n/locale-routing';

/**
 * 运行时 env 预热 + 域名 301 重定向 + 默认语种 rewrite + HTML 回落缓存。
 *
 * 主缓存目标：边缘 CDN（CDN-Cache-Control / s-maxage）HIT 时本 middleware 不执行。
 * 当请求仍进入 Function 时，Worker Cache API 仅作同 colo 回落，避免重复打 CMS。
 * rewrite 会再次进入本 middleware，必须用 locals 跳过第二次语种处理。
 */
export const onRequest = defineMiddleware(async (context, next) => {
  await warmRuntimeEnv();

  const { request } = context;
  const url = new URL(request.url);

  // 域名 301/302 重定向（方案 B 原生支持，保留原始路径与查询参数，优先于任何路由与 API 处理）
  const redirectConfigRaw = await envAsync('REDIRECT_CONFIG');
  if (redirectConfigRaw) {
    try {
      const cfg = JSON.parse(redirectConfigRaw);
      const host = url.hostname.toLowerCase();
      const fromList = ((cfg.from_domains || cfg.fromDomains || []) as string[]).map((d) => d.toLowerCase());
      const target = String(cfg.target_domain || cfg.targetDomain || '').toLowerCase();
      if (target && fromList.includes(host) && host !== target) {
        const targetUrl = new URL(url.pathname + url.search, `https://${target}`);
        return context.redirect(targetUrl.href, cfg.status_code || cfg.statusCode || 301);
      }
    } catch {}
  }

  if (request.method !== 'GET') return next();
  if (url.pathname.startsWith('/api/')) return next();

  if (!context.locals.localeRoutingDone) {
    context.locals.localeRoutingDone = true;
    const routed = await applyLocaleRouting(url);
    if (routed.action === 'redirect') {
      const target = new URL(url.href);
      target.pathname = routed.location;
      return context.redirect(target.pathname + target.search, routed.status);
    }
    if (routed.action === 'rewrite') {
      const target = new URL(url.href);
      target.pathname = routed.pathname;
      return runWithHtmlCache(context, url, () => context.rewrite(target));
    }
  }

  return runWithHtmlCache(context, url, next);
});

type MwContext = {
  request: Request;
  locals: App.Locals & {
    runtime?: { ctx?: { waitUntil?: (p: Promise<unknown>) => void } };
  };
};

function scheduleBackground(context: MwContext, task: Promise<unknown>) {
  const waitUntil = context.locals?.runtime?.ctx?.waitUntil;
  if (typeof waitUntil === 'function') {
    waitUntil(task);
    return;
  }
  // 非 CF 运行时：不阻塞首字节（本地 dev）
  void task;
}

async function runWithHtmlCache(
  context: MwContext,
  url: URL,
  next: () => Promise<Response> | Response
) {
  const useCache = shouldUseHtmlCache();
  if (useCache) {
    const cached = await getCachedHtml(url);
    if (cached) {
      const headers = new Headers(cached.headers);
      // 回落层命中：仍进了 Function；边缘 HIT 时看不到此头
      headers.set('X-HTML-Cache', 'HIT');
      headers.set('X-HTML-Cache-Layer', 'worker-cache');
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

  // 不阻塞 TTFB：后台写入 Worker Cache API（边缘为主时此层仅为回落）
  const clone = response.clone();
  scheduleBackground(
    context,
    putCachedHtml(url, clone).catch(() => undefined)
  );

  const headers = new Headers(response.headers);
  headers.set('X-HTML-Cache', 'MISS');
  headers.set('X-HTML-Cache-Layer', 'ssr');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
