import {

  entityData,

  getEntityByIdOrSlug,

  isPublishedEntity,

  listEntities,

  localePath,

  readSeoFields,

  type CmsEntity,

  type CmsQuery,

} from '../cms';

import { resolveReferenceCards, type ResolvedReferenceCard } from '../reference';

import { toPageSeo, type PageSeo } from '../seo';



export type SitePage = {

  id: string;

  title: string;

  slug: string;

  summary: string;

  content: string;

  seoTitle: string;

  seoDescription: string;

  seo: PageSeo;

  targetReference: unknown;

  references: ResolvedReferenceCard[];

};



async function toPage(row: CmsEntity, locale?: string): Promise<SitePage> {

  const data = entityData(row);

  const title = String(data.title || 'Untitled');

  const summary = String(data.summary || '');

  const slug = String(data.slug || row.id);

  const href = localePath(locale, slug === 'home' ? '/' : `/${slug}`);

  const fields = readSeoFields(data, title, summary);

  const seo = toPageSeo(fields, {

    pathname: href,

    schemaTypeDefault: 'WebPage',

    ogType: 'website',

  });

  const targetReference = data.target_reference ?? null;

  const references = locale

    ? await resolveReferenceCards(targetReference, locale)

    : [];

  return {

    id: String(row.id),

    title,

    slug,

    summary,

    content: String(data.content || ''),

    seoTitle: seo.title || title,

    seoDescription: seo.description || summary,

    seo,

    targetReference,

    references,

  };

}



export async function getPageBySlug(slug: string, query?: CmsQuery): Promise<SitePage | null> {

  const locale = query?.locale ? String(query.locale) : undefined;

  const row = await getEntityByIdOrSlug('page', slug, query, 'slug');

  if (!row || !isPublishedEntity(row)) return null;

  return toPage(row, locale);

}



export async function listPages(query?: CmsQuery): Promise<SitePage[]> {

  const locale = query?.locale ? String(query.locale) : undefined;

  const result = await listEntities('page', {

    ...query,

    status: query?.status ?? 'published',

  });

  return Promise.all(result.list.filter(isPublishedEntity).map((row) => toPage(row, locale)));

}


