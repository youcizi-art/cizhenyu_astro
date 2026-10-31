import type { ThemeId } from './load-theme';
import { resolveTheme } from './load-theme';
import { localePath } from '@/modules/cms';
import { t } from '@/modules/i18n';
import type { PageChrome } from '@/workflows/chrome/load-chrome';

/** 主题能力：default = 通用 chrome；page-shell = 主题自带 Header/Footer 页壳 */
export type ThemeShellKind = 'default' | 'page-shell';

/** 首页数据契约：按需声明，避免首屏拉取无关模块拖慢 TTFB */
export type ThemeHomeRequirements = {
  /** 首页需要拉取的 placement 区块列表，未指定时默认全量拉取 */
  placements?: string[];
  /** 需要解析引用的 placement 列表 */
  resolveReferencesFor?: string[];
  /** 是否需要文章列表（需同时站点开启） */
  articles?: boolean;
  /** 是否需要案例列表（需同时站点开启） */
  caseStudies?: boolean;
  /** 是否需要行业方案列表（需同时站点开启） */
  solutions?: boolean;
  /** 是否需要常见问题（需同时站点开启） */
  faq?: boolean;
};

export type ThemeMeta = {
  id: ThemeId;
  shell: ThemeShellKind;
  /** Google Fonts CSS2 family query；空则不加载品牌字体 */
  fontHref: string;
  /**
   * 主题自包含 favicon（Vite 产物 URL）。
   * 约定路径：`src/ui/themes/{themeId}/assets/favicon.ico`
   * 勿写入全局 `public/favicon.ico`，否则多主题会互相污染。
   */
  faviconHref: string;
  /** 首页数据需求：未配置时按全量模块回退 */
  homeRequirements?: ThemeHomeRequirements;
};

/** theme.manifest.json 中与运行时相关的字段（其余字段仅供工具链使用） */
type ThemeManifest = {
  id?: string;
  fontHref?: string;
  homeRequirements?: ThemeHomeRequirements;
};

/**
 * NOTE: 新主题只需在自己的 theme.manifest.json 声明 fontHref / homeRequirements，
 * 严禁回到此文件登记主题名。CSS 仍按 data-theme 作用域引入（见 styles.ts）。
 * Favicon 按约定放在各主题 `assets/favicon.ico`，由 glob 自动发现。
 */
const manifests = import.meta.glob<ThemeManifest>('./*/theme.manifest.json', {
  eager: true,
  import: 'default',
});

/** 主题级 favicon：`./{themeId}/assets/favicon.ico` → 构建期 URL */
const faviconUrls = import.meta.glob('./*/assets/favicon.ico', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const DEFAULT_FULL_HOME_REQUIREMENTS: ThemeHomeRequirements = {
  placements: [
    'home_hero',
    'home_featured',
    'footer_cta',
    'home_advantage',
    'home_testimonial',
    'home_factory',
    'home_comparison',
    'home_step',
  ],
  resolveReferencesFor: ['home_hero', 'home_featured'],
  articles: true,
  caseStudies: true,
  solutions: true,
  faq: true,
};

export function getThemeHomeRequirements(theme?: string | null): ThemeHomeRequirements {
  const meta = getThemeMeta(theme);
  return meta.homeRequirements || DEFAULT_FULL_HOME_REQUIREMENTS;
}

export function getThemeMeta(theme?: string | null): ThemeMeta {
  const { themeId } = resolveTheme({ theme });
  const manifest = manifests[`./${themeId}/theme.manifest.json`];
  const faviconHref = faviconUrls[`./${themeId}/assets/favicon.ico`] || '';
  return {
    id: themeId,
    shell: 'page-shell',
    fontHref: manifest?.fontHref || '',
    faviconHref,
    homeRequirements: manifest?.homeRequirements || DEFAULT_FULL_HOME_REQUIREMENTS,
  };
}

export function hasPageShell(theme?: string | null): boolean {
  return getThemeMeta(theme).shell === 'page-shell';
}

/** 页壳公共 props（各 page-shell 主题共用同一形状） */
export function buildPageShellProps(chrome: PageChrome) {
  const { locale, navLinks, company, localeOptions, siteName, site } = chrome;
  const defaultLocale = site?.defaultLocale;
  const zh = locale.startsWith('zh');
  return {
    siteName,
    links: navLinks,
    localeOptions,
    company,
    locale,
    homeHref: localePath(locale, '/', defaultLocale),
    contactHref: localePath(locale, '/contact', defaultLocale),
    contactLabel: zh ? '提交询盘' : t(locale, 'contact'),
    quickLinksLabel: zh ? '快速链接' : 'Quick Links',
  };
}

export function shellThemeId(theme?: string | null): ThemeId {
  return resolveTheme({ theme }).themeId;
}
