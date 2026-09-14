import type { SiteManifest, SiteModules } from '../site';
import { localePath } from '../cms';
import { t } from '../i18n';
import type { NavChildLink } from '../reference';

export type NavLink = {
  label: string;
  href: string;
  openInNewTab?: boolean;
  children?: NavChildLink[];
};

const MODULE_LINKS: Array<{ module: keyof SiteModules; labelKey: Parameters<typeof t>[1]; path: string }> = [
  { module: 'products', labelKey: 'products', path: '/products' },
  { module: 'solutions', labelKey: 'solutions', path: '/solutions' },
  { module: 'caseStudies', labelKey: 'caseStudies', path: '/case-studies' },
  { module: 'articles', labelKey: 'articles', path: '/articles' },
  { module: 'resources', labelKey: 'resources', path: '/resources' },
  { module: 'faq', labelKey: 'faq', path: '/faq' },
  { module: 'about', labelKey: 'about', path: '/about' },
  { module: 'contact', labelKey: 'contact', path: '/contact' },
];

export function buildNavLinks(site: SiteManifest, locale: string): NavLink[] {
  const links: NavLink[] = [
    { label: t(locale, 'home'), href: localePath(locale, '/') },
  ];
  for (const item of MODULE_LINKS) {
    if (!site.modules[item.module]) continue;
    links.push({
      label: t(locale, item.labelKey),
      href: localePath(locale, item.path),
    });
  }
  return links;
}
