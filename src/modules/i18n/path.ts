import type { SiteLanguage } from './types';

function cleanSegments(pathname: string) {
  return String(pathname || '/')
    .split('/')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function resolveLocaleFromPath(
  pathname: string,
  languages: SiteLanguage[],
  fallbackLocale: string
): { locale: string; isDefault: boolean; isActive: boolean; hasPrefix: boolean } {
  const segments = cleanSegments(pathname);
  const first = segments[0] || '';
  const matched = languages.find((item) => item.code === first);
  const defaultLang = languages.find((item) => item.isDefault) || languages[0];
  const defaultCode = defaultLang?.code || fallbackLocale;

  if (matched) {
    return {
      locale: matched.code,
      isDefault: Boolean(matched.isDefault) || matched.code === defaultCode,
      isActive: matched.status === 'active',
      hasPrefix: true,
    };
  }

  return {
    locale: defaultCode,
    isDefault: true,
    isActive: true,
    hasPrefix: false,
  };
}

/** 本模板路由约定：始终使用 /{locale}/... 前缀 */
export function switchLocalePath(
  currentPath: string,
  targetLocale: string,
  languages: SiteLanguage[]
): string {
  const codes = new Set(languages.map((item) => item.code));
  const segments = cleanSegments(currentPath);
  if (segments.length && codes.has(segments[0])) {
    segments.shift();
  }
  const rest = segments.length ? `/${segments.join('/')}` : '';
  return `/${targetLocale}${rest}`;
}

export function isKnownLocale(code: string, languages: SiteLanguage[]) {
  return languages.some((item) => item.code === code);
}
