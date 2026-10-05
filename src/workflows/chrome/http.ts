/**
 * 公开 HTML：同时声明共享缓存（s-maxage）与边缘专用 TTL（CDN-Cache-Control），
 * 目标是 Pages/边缘 HIT 时可不进 Function；Worker 内 Cache API 仅作回落。
 */
export function applyCacheHeaders(headers: Headers, revalidateSeconds: number) {
  const ttl = Math.max(86_400, Math.floor(revalidateSeconds));
  const swr = Math.max(86_400, Math.floor(ttl / 2));
  headers.set(
    'Cache-Control',
    `public, s-maxage=${ttl}, stale-while-revalidate=${swr}`
  );
  // 边缘/CDN 明确可读；部分路径只认 CDN-Cache-Control
  headers.set('CDN-Cache-Control', `public, max-age=${ttl}`);
  headers.set('Cache-Tag', `site-${String(import.meta.env.SITE_KEY || 'demo')}`);
}

/** API / 私有响绝不进入公共 HTML 长缓存 */
export function applyApiNoStoreHeaders(headers: Headers) {
  headers.set('Cache-Control', 'private, no-store');
  headers.set('CDN-Cache-Control', 'no-store');
}

/** A5：统一使用 /{locale}/...；非法 locale → 回默认语种（调用方决定 302 或 404） */
export function resolveLocaleParam(locales: string[], defaultLocale: string, raw?: string) {
  const value = String(raw || '').trim();
  if (value && locales.includes(value)) return { locale: value, valid: true as const };
  if (!value) return { locale: defaultLocale, valid: true as const };
  return { locale: defaultLocale, valid: false as const };
}
