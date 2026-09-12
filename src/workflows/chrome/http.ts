export function applyCacheHeaders(headers: Headers, revalidateSeconds: number) {
  headers.set(
    'Cache-Control',
    `public, s-maxage=${revalidateSeconds}, stale-while-revalidate=60`
  );
}

export function resolveLocaleParam(locales: string[], defaultLocale: string, raw?: string) {
  const value = String(raw || '').trim();
  if (value && locales.includes(value)) return value;
  return defaultLocale;
}
