export function siteOrigin() {
  return String(import.meta.env.PUBLIC_SITE_URL || '').replace(/\/$/, '') || '';
}

export function toAbsoluteUrl(path: string) {
  const origin = siteOrigin();
  if (!origin) return path;
  if (/^https?:\/\//i.test(path)) return path;
  return `${origin}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildAlternateLinks(
  localeOptions: Array<{ code: string; href: string }>
) {
  return localeOptions.map((item) => ({
    hreflang: item.code,
    href: toAbsoluteUrl(item.href),
  }));
}
