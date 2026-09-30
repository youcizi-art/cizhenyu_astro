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

/**
 * 默认语种无前缀：无前缀 → rewrite 到 /{default}/...；带默认前缀 → 302 去掉前缀。
 */
export async function applyLocaleRouting(requestUrl: URL): Promise<
  | { action: 'next' }
  | { action: 'redirect'; location: string }
  | { action: 'rewrite'; pathname: string }
> {
  const { languages, defaultLocale } = await resolveLocales();
  const codes = new Set(languages.map((l) => l.code));
  const segments = cleanSegments(requestUrl.pathname);
  const first = segments[0] || '';

  if (first && codes.has(first)) {
    if (first === defaultLocale) {
      const rest = segments.slice(1);
      const location = rest.length ? `/${rest.join('/')}` : '/';
      return { action: 'redirect', location };
    }
    return { action: 'next' };
  }

  // 无语种前缀 → 内部 rewrite 到默认语种路由（浏览器 URL 不变）
  const suffix = segments.length ? `/${segments.join('/')}` : '';
  return { action: 'rewrite', pathname: `/${defaultLocale}${suffix}` };
}
