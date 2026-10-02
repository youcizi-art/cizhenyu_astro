export function applyCacheHeaders(headers: Headers, revalidateSeconds: number) {
  // 常态长缓存；stale-while-revalidate 允许过期后短暂继续用旧页，同时后台重建
  const swr = Math.max(86_400, Math.floor(revalidateSeconds / 2));
  headers.set(
    'Cache-Control',
    `public, s-maxage=${revalidateSeconds}, stale-while-revalidate=${swr}`
  );
  // 供 CDN / 边缘观测；真实 Tag purge 需 CF_ZONE_ID + token
  headers.set('Cache-Tag', `site-${String(import.meta.env.SITE_KEY || 'demo')}`);
}
/** A5：统一使用 /{locale}/...；非法 locale → 回默认语种（调用方决定 302 或 404） */
export function resolveLocaleParam(locales: string[], defaultLocale: string, raw?: string) {
  const value = String(raw || '').trim();
  if (value && locales.includes(value)) return { locale: value, valid: true as const };
  if (!value) return { locale: defaultLocale, valid: true as const };
  return { locale: defaultLocale, valid: false as const };
}
