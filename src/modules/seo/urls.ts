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
  localeOptions: Array<{ code: string; href: string }>,
  options?: { defaultLocale?: string }
) {
  const links = localeOptions.map((item) => ({
    hreflang: item.code,
    href: toAbsoluteUrl(item.href),
  }));
  const defaultLocale = String(options?.defaultLocale || '').trim();
  if (defaultLocale) {
    const hit = localeOptions.find((item) => item.code === defaultLocale);
    if (hit) {
      links.push({ hreflang: 'x-default', href: toAbsoluteUrl(hit.href) });
    }
  }
  return links;
}
