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

export type ArticleCard = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  author: string;
  coverUrl: string;
  href: string;
};

export type ArticleDetail = ArticleCard & {
  content: string;
  seoTitle: string;
  seoDescription: string;
  seo: PageSeo;
};

function toCard(row: CmsEntity, locale?: string): ArticleCard {
  const data = entityData(row);
  const slug = String(data.slug || row.id).trim();
  return {
    id: String(row.id),
    title: String(data.title || 'Untitled'),
    slug,
    summary: String(data.summary || data.excerpt || ''),
    author: String(data.author || ''),
    coverUrl: resolveMediaUrl(data.cover),
    href: localePath(locale, `/articles/${encodeURIComponent(slug || row.id)}`),
  };
}

export async function listArticles(query?: CmsQuery): Promise<{ items: ArticleCard[]; pages: PublicPages }> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const result = await listEntities('article', {
    ...query,
    status: query?.status ?? 'published',
  });
  return {
    items: result.list.filter(isPublishedEntity).map((row) => toCard(row, locale)),
    pages: result.pages,
  };
}

export async function getArticle(idOrSlug: string, query?: CmsQuery): Promise<ArticleDetail | null> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const row = await getEntityByIdOrSlug('article', idOrSlug, query);
  if (!row || !isPublishedEntity(row)) return null;
  const card = toCard(row, locale);
  const data = entityData(row);
  const fields = readSeoFields(data, card.title, card.summary);
  const seo = toPageSeo(fields, {
    pathname: card.href,
    ogImageFallback: card.coverUrl,
    schemaTypeDefault: 'Article',
    ogType: 'article',
  });
  return {
    ...card,
    content: String(data.content || ''),
    seoTitle: seo.title || card.title,
    seoDescription: seo.description || card.summary,
    seo,
  };
}
