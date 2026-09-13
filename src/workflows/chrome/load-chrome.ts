import { loadSiteManifest, resolveRevalidateSeconds, type SiteManifest } from '../../modules/site';
import { buildNavLinks, type NavLink } from '../../modules/nav';
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
  const companyResult = await loadCompanyView(currentLocale, site.displayName);
  const warnings = [
    ...(i18n.warning ? [i18n.warning] : []),
    ...(companyResult.ok ? [] : [companyResult.warning]),
  ];

  const localeOptions: LocaleOption[] = i18n.languages.map((lang) => ({
    code: lang.code,
    name: lang.name || lang.code,
    href: switchLocalePath(pathname, lang.code, i18n.languages),
    active: lang.code === currentLocale,
  }));

  return {
    site,
    locale: currentLocale,
    siteName: companyResult.company.name,
    revalidateSeconds: resolveRevalidateSeconds(site),
    navLinks: buildNavLinks(site, currentLocale),
    company: companyResult.company,
    languages: i18n.languages,
    localeOptions,
    languageLabel: t(currentLocale, 'language'),
    warnings,
    localeValid: i18n.isActive,
  };
}
