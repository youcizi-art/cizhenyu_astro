import type { SiteManifest, SiteModules } from '../site';
import { localePath } from '../cms';

export type NavLink = {
  label: string;
  href: string;
};

const MODULE_LINKS: Array<{ module: keyof SiteModules; label: string; path: string }> = [
  { module: 'products', label: 'Products', path: '/products' },
  { module: 'solutions', label: 'Solutions', path: '/solutions' },
  { module: 'caseStudies', label: 'Case Studies', path: '/case-studies' },
  { module: 'articles', label: 'Articles', path: '/articles' },
  { module: 'resources', label: 'Resources', path: '/resources' },
  { module: 'faq', label: 'FAQ', path: '/faq' },
  { module: 'about', label: 'About', path: '/about' },
  { module: 'contact', label: 'Contact', path: '/contact' },
];

export function buildNavLinks(site: SiteManifest, locale: string): NavLink[] {
  const links: NavLink[] = [
    { label: 'Home', href: localePath(locale, '/') },
  ];
  for (const item of MODULE_LINKS) {
    if (!site.modules[item.module]) continue;
    links.push({
      label: item.label,
      href: localePath(locale, item.path),
    });
  }
  return links;
}
