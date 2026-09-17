import type { PageSeo } from './types';
import { buildJsonLd, type JsonLdInput } from './json-ld';

/** 把 PageSeo 转成 BaseLayout 可用的 SEO props */
export function layoutSeoProps(seo: PageSeo | undefined, pathname: string) {
  return {
    canonicalUrl: seo?.canonicalUrl || pathname,
    robots: seo?.robots || 'index,follow',
    ogImage: seo?.ogImage || '',
    ogType: seo?.ogType || 'website',
    ogUrl: seo?.canonicalUrl || pathname,
  };
}

export function pageJsonLd(
  seo: PageSeo | undefined,
  pathname: string,
  rest: Omit<JsonLdInput, 'seo' | 'pageUrl'>
) {
  const fallback: PageSeo = {
    title: '',
    description: '',
    canonicalUrl: pathname,
    robots: 'index,follow',
    ogImage: '',
    ogType: 'website',
    schemaType: 'WebPage',
    schemaMapping: '',
    geoLat: '',
    geoLng: '',
  };
  return buildJsonLd({
    seo: seo || fallback,
    pageUrl: pathname,
    ...rest,
  });
}

/** 列表页默认 WebPage JSON-LD */
export function listPageJsonLd(options: {
  title: string;
  description?: string;
  pathname: string;
  siteName?: string;
  company?: JsonLdInput['company'];
  breadcrumbs?: JsonLdInput['breadcrumbs'];
}) {
  const seo: PageSeo = {
    title: options.title,
    description: options.description || '',
    canonicalUrl: options.pathname,
    robots: 'index,follow',
    ogImage: '',
    ogType: 'website',
    schemaType: 'WebPage',
    schemaMapping: '',
    geoLat: '',
    geoLng: '',
  };
  return buildJsonLd({
    seo,
    pageUrl: options.pathname,
    siteName: options.siteName,
    company: options.company,
    breadcrumbs: options.breadcrumbs,
  });
}
