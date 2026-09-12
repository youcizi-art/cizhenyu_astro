import { loadSiteManifest, resolveRevalidateSeconds, type SiteManifest } from '../../modules/site';
import { buildNavLinks, type NavLink } from '../../modules/nav';
import { getCompanyInfo, toCompanyView, type CompanyView } from '../../modules/company';

export type PageChrome = {
  site: SiteManifest;
  locale: string;
  siteName: string;
  revalidateSeconds: number;
  navLinks: NavLink[];
  company: CompanyView;
};

export async function loadPageChrome(locale?: string): Promise<PageChrome> {
  const site = loadSiteManifest();
  const currentLocale = locale && site.locales.includes(locale) ? locale : site.defaultLocale;
  const companyInfo = await getCompanyInfo(currentLocale);
  const company = toCompanyView(companyInfo, site.displayName);
  return {
    site,
    locale: currentLocale,
    siteName: company.name,
    revalidateSeconds: resolveRevalidateSeconds(site),
    navLinks: buildNavLinks(site, currentLocale),
    company,
  };
}
