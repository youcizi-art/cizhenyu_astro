import type { ThemeId } from './load-theme';
import { localePath } from '@/modules/cms';
import { t } from '@/modules/i18n';
import type { PageChrome } from '@/workflows/chrome/load-chrome';

/** Turmill 使用完整营销页壳（非仅 token 换色） */
export function useTurmillShell(themeId: string): themeId is 'turmill' {
  return themeId === 'turmill';
}

export function shellThemeId(theme?: string | null): ThemeId {
  const raw = String(theme || 'default').trim().toLowerCase();
  return raw === 'turmill' ? 'turmill' : 'default';
}

export function buildTurmillShellProps(chrome: PageChrome) {
  const { locale, navLinks, company, localeOptions, siteName } = chrome;
  return {
    siteName,
    links: navLinks,
    localeOptions,
    company,
    locale,
    homeHref: localePath(locale, '/'),
    contactHref: localePath(locale, '/contact'),
    contactLabel: t(locale, 'contact'),
    quickLinksLabel: locale.startsWith('zh') ? '快速链接' : 'Quick Links',
  };
}
