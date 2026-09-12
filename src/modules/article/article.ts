import {
  entityData,
  getEntityByIdOrSlug,
  listEntities,
  localePath,
  type CmsEntity,
  type CmsQuery,
  type PublicPages,
} from '../cms';

export type ArticleCard = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  author: string;
  href: string;
};

export type ArticleDetail = ArticleCard & {
  content: string;
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
    href: localePath(locale, `/articles/${encodeURIComponent(slug || row.id)}`),
  };
}

export async function listArticles(query?: CmsQuery): Promise<{ items: ArticleCard[]; pages: PublicPages }> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const result = await listEntities('article', query);
  return { items: result.list.map((row) => toCard(row, locale)), pages: result.pages };
}

export async function getArticle(idOrSlug: string, query?: CmsQuery): Promise<ArticleDetail | null> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const row = await getEntityByIdOrSlug('article', idOrSlug, query);
  if (!row) return null;
  const card = toCard(row, locale);
  const data = entityData(row);
  return { ...card, content: String(data.content || '') };
}
