import {

  entityData,

  getEntityByIdOrSlug,

  isPublishedEntity,

  listEntities,

  localePath,

  readSeoFields,

  type CmsEntity,

  type CmsQuery,

  type PublicPages,

} from '../cms';

import { resolveMediaUrl } from '../media';

import { toPageSeo, type PageSeo } from '../seo';



export type SolutionCard = {

  id: string;

  title: string;

  slug: string;

  summary: string;

  coverUrl: string;

  href: string;

};



export type SolutionDetail = SolutionCard & {

  content: string;

  painPoints: string;

  solutions: string;

  seoTitle: string;

  seoDescription: string;

  seo: PageSeo;

  languageGroupKey: string;

};



function toCard(row: CmsEntity, locale?: string): SolutionCard {

  const data = entityData(row);

  const slug = String(data.slug || row.id).trim();

  return {

    id: String(row.id),

    title: String(data.name || data.title || 'Untitled'),

    slug,

    summary: String(data.summary || ''),

    coverUrl: resolveMediaUrl(data.cover),

    href: localePath(locale, `/solutions/${encodeURIComponent(slug || row.id)}`),

  };

}



export async function listSolutions(query?: CmsQuery): Promise<{ items: SolutionCard[]; pages: PublicPages }> {

  const locale = query?.locale ? String(query.locale) : undefined;

  const result = await listEntities('industry', { ...query, status: query?.status ?? 'published' });

  return { items: result.list.filter(isPublishedEntity).map((row) => toCard(row, locale)), pages: result.pages };

}



export async function getSolution(idOrSlug: string, query?: CmsQuery): Promise<SolutionDetail | null> {

  const locale = query?.locale ? String(query.locale) : undefined;

  const row = await getEntityByIdOrSlug('industry', idOrSlug, query);

  if (!row || !isPublishedEntity(row)) return null;

  const card = toCard(row, locale);

  const data = entityData(row);

  const fields = readSeoFields(data, card.title, card.summary);

  const seo = toPageSeo(fields, {

    pathname: card.href,

    ogImageFallback: card.coverUrl,

    schemaTypeDefault: 'WebPage',

    ogType: 'website',

  });

  return {

    ...card,

    content: String(data.content || ''),

    painPoints: String(data.pain_points || ''),

    solutions: String(data.solutions || ''),

    seoTitle: seo.title || card.title,

    seoDescription: seo.description || card.summary,

    seo,

    languageGroupKey: String(row.language_group_key || '').trim(),

  };

}


