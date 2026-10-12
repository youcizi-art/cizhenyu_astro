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
 *
 * 重要：不可对 SSR Response 做 clone 后再 `new Response(response.body)`。
 * 在 Cloudflare Pages 上会把可读流掏空，表现为 HTTP 200 + 空白页
 * （sitemap/robots 因非 text/html 未走包装分支，所以仍正常）。
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
      const fromList = ((cfg.from_domains || cfg.fromDomains || []) as string[]).map((d) =>
        d.toLowerCase()
      );
      const target = String(cfg.target_domain || cfg.targetDomain || '').toLowerCase();
      if (target && fromList.includes(host) && host !== target) {
        const targetUrl = new URL(url.pathname + url.search, `https://${target}`);
        return context.redirect(targetUrl.href, cfg.status_code || cfg.statusCode || 301);
      }
    } catch {
      // ignore bad REDIRECT_CONFIG
    }
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
      // 外层负责 HTML 缓存；内层 rewrite 再进 middleware 时跳过二次 wrap
      context.locals.htmlCacheOwned = true;
      return runWithHtmlCache(context, url, () => context.rewrite(target));
    }
  }

  // rewrite 二次进入：外层已套 cache，直接渲染，避免双重包装
  if (context.locals.htmlCacheOwned) {
    return next();
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

/** 读完整 body 再回写，避免 CF 上流式 body 被 clone/再包装后变空 */
async function respondWithHeaders(
  response: Response,
  mutate: (headers: Headers) => void
): Promise<Response> {
  const buf = await response.arrayBuffer();
  const headers = new Headers(response.headers);
  mutate(headers);
  return new Response(buf, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function runWithHtmlCache(
  context: MwContext,
  url: URL,
  next: () => Promise<Response> | Response
) {
  const useCache = shouldUseHtmlCache();
  if (useCache) {
    const cached = await getCachedHtml(url);
    if (cached && cached.body.trim().length > 0) {
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
      return respondWithHeaders(response, (headers) => {
        headers.set('X-HTML-Cache', 'BYPASS');
      });
    }
    return response;
  }

  // 先缓冲正文，再决定是否后台写入 Cache API（禁止缓存空 HTML，否则边缘会锁死空白页）
  const buf = await response.arrayBuffer();
  const empty = buf.byteLength === 0;
  const headers = new Headers(response.headers);
  if (empty) {
    headers.set('Cache-Control', 'private, no-store');
    headers.set('CDN-Cache-Control', 'no-store');
    headers.set('X-HTML-Cache', 'BYPASS');
    headers.set('X-HTML-Cache-Layer', 'ssr-empty');
    return new Response(buf, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  headers.set('X-HTML-Cache', 'MISS');
  headers.set('X-HTML-Cache-Layer', 'ssr');
  const out = new Response(buf, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
  scheduleBackground(
    context,
    putCachedHtml(url, out.clone()).catch(() => undefined)
  );
  return out;
}
