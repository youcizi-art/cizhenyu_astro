import type { ThemeId } from './load-theme';
import { resolveTheme } from './load-theme';
import { localePath } from '@/modules/cms';
import { t } from '@/modules/i18n';
import type { PageChrome } from '@/workflows/chrome/load-chrome';

/** 主题能力：default = 通用 chrome；page-shell = 主题自带 Header/Footer 页壳 */
export type ThemeShellKind = 'default' | 'page-shell';

export type ThemeMeta = {
  id: ThemeId;
  shell: ThemeShellKind;
  /** Google Fonts CSS2 family query；空则不加载品牌字体 */
  fontHref: string;
};

/**
 * 新主题在此登记即可，勿在 pages / workflows 里写死主题名。
 * CSS 仍按 data-theme 作用域引入（见 styles.ts）。
 */
export const THEME_META: Record<ThemeId, ThemeMeta> = {
  default: {
    id: 'default',
    shell: 'page-shell',
    fontHref: '',
  },
  turmill: {
    id: 'turmill',
    shell: 'page-shell',
    // 站内系统字体栈，避免外链 Google Fonts 拖慢首屏
    fontHref: '',
  },
};

export function getThemeMeta(theme?: string | null): ThemeMeta {
  const { themeId } = resolveTheme({ theme });
  return THEME_META[themeId];
}

export function hasPageShell(theme?: string | null): boolean {
  return getThemeMeta(theme).shell === 'page-shell';
}

/** 页壳公共 props（各 page-shell 主题共用同一形状） */
export function buildPageShellProps(chrome: PageChrome) {
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

export function shellThemeId(theme?: string | null): ThemeId {
  return resolveTheme({ theme }).themeId;
}
