import { getPageBySlug } from '../page';
import type { PageSeo } from './types';
import { layoutSeoProps, listPageJsonLd } from './layout';
import type { JsonLdInput } from './json-ld';

export type ListPageSeoResult = {
  title: string;
  description: string;
  seoProps: ReturnType<typeof layoutSeoProps>;
  jsonLd: ReturnType<typeof listPageJsonLd>;
};

/**
 * List pages: prefer CMS `page` SEO by slug; fall back to title + company summary.
 */
export async function resolveListPageSeo(options: {
  slug: string;
  locale?: string;
  pathname: string;
  fallbackTitle: string;
  fallbackDescription?: string;
  siteName?: string;
  company?: JsonLdInput['company'];
  breadcrumbs?: JsonLdInput['breadcrumbs'];
}): Promise<ListPageSeoResult> {
  const page = await getPageBySlug(options.slug, {
    locale: options.locale,
  }).catch(() => null);

  const title = page?.seoTitle || page?.title || options.fallbackTitle;
  const description =
    page?.seoDescription || page?.summary || options.fallbackDescription || '';
  const seo: PageSeo | undefined = page?.seo;

  return {
    title,
    description,
    seoProps: layoutSeoProps(seo, options.pathname),
    jsonLd: listPageJsonLd({
      title,
      description,
      pathname: options.pathname,
      siteName: options.siteName,
      company: options.company,
      breadcrumbs: options.breadcrumbs,
    }),
  };
}
