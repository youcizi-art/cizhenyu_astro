import { loadSiteManifest } from '@/modules/site';
import { loadLanguages } from '@/modules/i18n/languages';
import { rememberDefaultLocale } from '@/modules/i18n/remember-default';
import type { SiteLanguage } from '@/modules/i18n/types';

type LocaleCache = {
  at: number;
  languages: SiteLanguage[];
  defaultLocale: string;
};

let cache: LocaleCache | null = null;
const TTL_MS = 60_000;

/** 这些路径不做语种 rewrite */
const PASSTHROUGH_EXACT = new Set([
  '/sitemap.xml',
  '/robots.txt',
  '/favicon.ico',
  '/favicon.svg',
]);

async function resolveLocales(): Promise<LocaleCache> {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) return cache;
  const manifest = loadSiteManifest();
  const { languages } = await loadLanguages(manifest);
  const defaultLocale =
    languages.find((item) => item.isDefault)?.code
    || manifest.defaultLocale
    || 'zh-CN';
  rememberDefaultLocale(defaultLocale);
  cache = { at: now, languages, defaultLocale };
  return cache;
}

function cleanSegments(pathname: string) {
  return String(pathname || '/')
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean);
}

function shouldPassthrough(pathname: string) {
  if (PASSTHROUGH_EXACT.has(pathname)) return true;
  if (/\.[a-z0-9]{1,8}$/i.test(pathname)) return true;
  return false;
}

/**
 * 默认语种无前缀（公开 URL 由 localePath 生成）：
 * - 无前缀 → rewrite 到 /{default}/...（浏览器 URL 不变）
 * - 命中默认语种前缀 /{defaultLocale}/... → 301 重定向到无前缀规范路径
 * - 其他有效非默认语种前缀 → 直接放行 next
 */
export async function applyLocaleRouting(requestUrl: URL): Promise<
  | { action: 'next' }
  | { action: 'rewrite'; pathname: string }
  | { action: 'redirect'; status: 301; location: string }
> {
  const pathname = requestUrl.pathname || '/';
  if (shouldPassthrough(pathname)) {
    return { action: 'next' };
  }

  const { languages, defaultLocale } = await resolveLocales();
  const codes = new Set(languages.map((l) => l.code));
  const segments = cleanSegments(pathname);
  const first = segments[0] || '';

  if (first && codes.has(first)) {
    // 若用户或爬虫请求了 /{defaultLocale} 或 /{defaultLocale}/...，301 重定向至无前缀的规范路径
    if (first === defaultLocale) {
      const rest = segments.slice(1);
      const canonicalPath = rest.length ? `/${rest.join('/')}` : '/';
      return { action: 'redirect', status: 301, location: canonicalPath };
    }
    // 非默认有效语种正常放行
    return { action: 'next' };
  }

  const suffix = segments.length ? `/${segments.join('/')}` : '';
  return { action: 'rewrite', pathname: `/${defaultLocale}${suffix}` };
}
