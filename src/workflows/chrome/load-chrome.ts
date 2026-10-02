import { loadSiteManifest, resolveRevalidateSeconds, type SiteManifest } from '../../modules/site';
import { loadNavLinks, type NavLink } from '../../modules/nav';
import { loadCompanyView, type CompanyView } from '../../modules/company';
import {
  bootstrapI18n,
  switchLocalePath,
  t,
  type SiteLanguage,
} from '../../modules/i18n';

export type LocaleOption = {
  code: string;
  name: string;
  href: string;
  active: boolean;
};

export type PageChrome = {
  site: SiteManifest;
  locale: string;
  siteName: string;
  revalidateSeconds: number;
  navLinks: NavLink[];
  company: CompanyView;
  languages: SiteLanguage[];
  localeOptions: LocaleOption[];
  languageLabel: string;
  warnings: string[];
  /** 路径上的 locale 是否有效；无效时页面应 302 */
  localeValid: boolean;
};

export async function loadPageChrome(options: {
  locale?: string;
  pathname?: string;
}): Promise<PageChrome> {
  const site = loadSiteManifest();
  const pathname = options.pathname || '/';
  const i18n = await bootstrapI18n({
    pathname,
    paramLocale: options.locale,
    manifest: site,
  });

  const currentLocale = i18n.currentLocale;

  // company / nav 无相互依赖：并行，避免串行叠延迟
  const [companyResult, nav] = await Promise.all([
    loadCompanyView(currentLocale, site.displayName),
    loadNavLinks(site, currentLocale),
  ]);

  const warnings = [
    ...(i18n.warning ? [i18n.warning] : []),
    ...(companyResult.ok ? [] : [companyResult.warning]),
    ...(nav.warning ? [nav.warning] : []),
  ];

  const localeOptions: LocaleOption[] = i18n.languages.map((lang) => ({
    code: lang.code,
    name: lang.name || lang.code,
    href: switchLocalePath(pathname, lang.code, i18n.languages),
    active: lang.code === currentLocale,
  }));

  const defaultLocale =
    i18n.languages.find((item) => item.isDefault)?.code || site.defaultLocale;

  return {
    site: {
      ...site,
      // 页面重定向与 hreflang 跟 CMS 默认语种对齐
      defaultLocale,
    },
    locale: currentLocale,
    siteName: companyResult.company.name,
    revalidateSeconds: resolveRevalidateSeconds(site),
    navLinks: nav.links,
    company: companyResult.company,
    languages: i18n.languages,
    localeOptions,
    languageLabel: t(currentLocale, 'language'),
    warnings,
    localeValid: i18n.isActive,
  };
}
