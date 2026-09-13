export function applyCacheHeaders(headers: Headers, revalidateSeconds: number) {
  headers.set(
    'Cache-Control',
    `public, s-maxage=${revalidateSeconds}, stale-while-revalidate=60`
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
