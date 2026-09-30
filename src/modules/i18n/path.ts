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

function defaultLocaleCode(languages: SiteLanguage[]) {
  return languages.find((item) => item.isDefault)?.code || languages[0]?.code || '';
}

/**
 * 切换语种路径：默认语种无前缀；非默认为 /{locale}/...
 */
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
  const def = defaultLocaleCode(languages);
  if (def && targetLocale === def) {
    return rest || '/';
  }
  return `/${targetLocale}${rest}`;
}

/** 非法 locale 时回到默认语种对应「公开」路径（默认无前缀） */
export function pathForDefaultLocale(path: string, defaultLocale: string, languages?: SiteLanguage[]) {
  const normalized = path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`;
  const def =
    defaultLocale
    || (languages ? defaultLocaleCode(languages) : '')
    || '';
  if (!def) return normalized;
  // 调用方传入的 path 已是业务路径（无语种前缀）
  return normalized;
}

export function isKnownLocale(code: string, languages: SiteLanguage[]) {
  return languages.some((item) => item.code === code);
}

export function stripLocalePrefix(pathname: string, languages: SiteLanguage[]) {
  const codes = new Set(languages.map((item) => item.code));
  const segments = cleanSegments(pathname);
  if (segments.length && codes.has(segments[0])) {
    segments.shift();
  }
  return segments.length ? `/${segments.join('/')}` : '/';
}

/** 默认语种公开 URL（永远无 /语种/ 前缀） */
export function defaultLocaleHref(path = '/') {
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return normalized || '/';
}
