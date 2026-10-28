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
  /** 首页数据需求：未配置时按全量模块回退 */
  homeRequirements?: ThemeHomeRequirements;
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
    homeRequirements: {
      placements: [
        'home_hero',
        'home_pain',
        'home_architecture',
        'home_compare',
        'home_seo_geo',
        'home_paths',
        'home_testimonial',
        'footer_cta',
      ],
      resolveReferencesFor: [],
      articles: true,
      caseStudies: false,
      solutions: false,
      faq: true,
    },
  },
  turmill: {
    id: 'turmill',
    shell: 'page-shell',
    // 站内系统字体栈，避免外链 Google Fonts 拖慢首屏
    fontHref: '',
    homeRequirements: {
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
    },
  },
};

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
  return (
    THEME_META[themeId] || {
      id: themeId,
      shell: 'page-shell',
      fontHref: '',
      homeRequirements: DEFAULT_FULL_HOME_REQUIREMENTS,
    }
  );
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
