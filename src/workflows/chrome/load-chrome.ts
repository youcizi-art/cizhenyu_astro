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
  const paramLocale = String(options.locale || '').trim();

  // 路径已带语种时：i18n / company / nav 全并行（省掉「先等 languages」的串行）
  // 根路径无 param 时仍须先解析 CMS 默认语种，再拉 chrome。
  let i18n: Awaited<ReturnType<typeof bootstrapI18n>>;
  let companyResult: Awaited<ReturnType<typeof loadCompanyView>>;
  let nav: Awaited<ReturnType<typeof loadNavLinks>>;

  if (paramLocale) {
    [i18n, companyResult, nav] = await Promise.all([
      bootstrapI18n({ pathname, paramLocale, manifest: site }),
      loadCompanyView(paramLocale, site.displayName),
      loadNavLinks(site, paramLocale),
    ]);
    // 非法 locale 时 bootstrap 会回落默认语种，需按真实 currentLocale 重拉 chrome
    if (i18n.currentLocale !== paramLocale) {
      [companyResult, nav] = await Promise.all([
        loadCompanyView(i18n.currentLocale, site.displayName),
        loadNavLinks(site, i18n.currentLocale),
      ]);
    }
  } else {
    i18n = await bootstrapI18n({ pathname, paramLocale: undefined, manifest: site });
    [companyResult, nav] = await Promise.all([
      loadCompanyView(i18n.currentLocale, site.displayName),
      loadNavLinks(site, i18n.currentLocale),
    ]);
  }

  const currentLocale = i18n.currentLocale;
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
