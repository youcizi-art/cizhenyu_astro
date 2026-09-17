export function siteOrigin() {
  return String(import.meta.env.PUBLIC_SITE_URL || '').replace(/\/$/, '') || '';
}

/** Resolve absolute URL; optional request origin when PUBLIC_SITE_URL is unset. */
export function toAbsoluteUrl(path: string, originOverride?: string) {
  const origin = String(originOverride || siteOrigin() || '')
    .trim()
    .replace(/\/$/, '');
  if (!origin) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}

/** BCP47 / site locale → Open Graph locale (underscore) */
export function toOgLocale(locale: string) {
  const raw = String(locale || '').trim();
  if (!raw) return 'en_US';
  const normalized = raw.replace(/-/g, '_');
  if (normalized.includes('_')) return normalized;
  if (normalized.toLowerCase() === 'en') return 'en_US';
  if (normalized.toLowerCase() === 'ja') return 'ja_JP';
  if (normalized.toLowerCase() === 'zh') return 'zh_CN';
  return normalized;
}

export function buildAlternateLinks(
  localeOptions: Array<{ code: string; href: string }>,
  options?: { defaultLocale?: string; origin?: string }
) {
  const links = localeOptions.map((item) => ({
    hreflang: item.code,
    href: toAbsoluteUrl(item.href, options?.origin),
  }));
  const defaultLocale = String(options?.defaultLocale || '').trim();
  if (defaultLocale) {
    const hit = localeOptions.find((item) => item.code === defaultLocale);
    if (hit) {
      links.push({ hreflang: 'x-default', href: toAbsoluteUrl(hit.href, options?.origin) });
    }
  }
  return links;
}
