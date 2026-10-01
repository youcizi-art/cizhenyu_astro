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
 * - 已有语种前缀（含默认）→ 直接放行，不做 302 strip
 *   （若 strip + rewrite 叠加，Astro rewrite 会重进 middleware，形成死循环）
 */
export async function applyLocaleRouting(requestUrl: URL): Promise<
  | { action: 'next' }
  | { action: 'rewrite'; pathname: string }
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
    return { action: 'next' };
  }

  const suffix = segments.length ? `/${segments.join('/')}` : '';
  return { action: 'rewrite', pathname: `/${defaultLocale}${suffix}` };
}
