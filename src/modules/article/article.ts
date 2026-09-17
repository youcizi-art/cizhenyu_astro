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

export const ARTICLE_CONTENT_TYPES = [
  'news',
  'buying_guide',
  'comparison',
  'technical',
  'application_guide',
] as const;

export type ArticleContentType = (typeof ARTICLE_CONTENT_TYPES)[number];

export type ArticleCard = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  author: string;
  coverUrl: string;
  href: string;
  contentType: ArticleContentType;
};

const CONTENT_TYPES = new Set<string>(ARTICLE_CONTENT_TYPES);

export function isArticleContentType(value: string): value is ArticleContentType {
  return CONTENT_TYPES.has(value);
}

function toContentType(raw: unknown): ArticleContentType {
  const value = String(raw || 'news').trim();
  return isArticleContentType(value) ? value : 'news';
}

/** Human-readable eyebrow for article content_type */
export function articleContentTypeLabel(type: ArticleContentType, locale?: string): string {
  const zh = Boolean(locale?.startsWith('zh'));
  const labels: Record<ArticleContentType, { en: string; zh: string }> = {
    news: { en: 'News', zh: '新闻' },
    buying_guide: { en: 'Buying Guide', zh: '采购指南' },
    comparison: { en: 'Comparison', zh: '对比' },
    technical: { en: 'Technical', zh: '技术' },
    application_guide: { en: 'Application Guide', zh: '应用指南' },
  };
  return zh ? labels[type].zh : labels[type].en;
}


export type ArticleLinkCard = {
  id: string;
  title: string;
  href: string;
  summary?: string;
};

export type ArticleDetail = ArticleCard & {
  content: string;
  shortAnswer: string;
  seoTitle: string;
  seoDescription: string;
  seo: PageSeo;
  languageGroupKey: string;
  relatedArticleIds: string[];
  relatedProductIds: string[];
  relatedIndustryIds: string[];
  relatedArticles: ArticleLinkCard[];
  relatedProducts: ArticleLinkCard[];
  relatedIndustries: ArticleLinkCard[];
};

function asRelationIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (typeof item === 'string' || typeof item === 'number') return String(item).trim();
      if (item && typeof item === 'object' && 'id' in item) return String((item as { id: unknown }).id || '').trim();
      return '';
    })
    .filter(Boolean);
}

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
    contentType: toContentType(data.content_type),
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
    shortAnswer: String(data.short_answer || '').trim(),
    seoTitle: seo.title || card.title,
    seoDescription: seo.description || card.summary,
    seo,
    languageGroupKey: String(row.language_group_key || '').trim(),
    relatedArticleIds: asRelationIds(data.related_article_ids),
    relatedProductIds: asRelationIds(data.related_product_ids),
    relatedIndustryIds: asRelationIds(data.related_industry_ids),
    relatedArticles: [],
    relatedProducts: [],
    relatedIndustries: [],
  };
}

export async function enrichArticleDetail(
  article: ArticleDetail,
  locale: string | undefined
): Promise<ArticleDetail> {
  const [articleRows, productRows, industryRows] = await Promise.all([
    Promise.all(
      [...new Set(article.relatedArticleIds)].map((id) =>
        getEntityByIdOrSlug('article', id, { locale, status: 'published' }).catch(() => null)
      )
    ),
    Promise.all(
      [...new Set(article.relatedProductIds)].map((id) =>
        getEntityByIdOrSlug('product', id, { locale, status: 'published' }).catch(() => null)
      )
    ),
    Promise.all(
      [...new Set(article.relatedIndustryIds)].map((id) =>
        getEntityByIdOrSlug('industry', id, { locale, status: 'published' }).catch(() => null)
      )
    ),
  ]);

  const relatedArticles = articleRows
    .filter((row): row is CmsEntity => Boolean(row && isPublishedEntity(row)))
    .map((row) => toCard(row, locale))
    .filter((item) => item.id !== article.id)
    .map((item) => ({
      id: item.id,
      title: item.title,
      href: item.href,
      summary: item.summary,
    }));

  const relatedProducts = productRows
    .filter((row): row is CmsEntity => Boolean(row && isPublishedEntity(row)))
    .map((row) => {
      const data = entityData(row);
      const slug = String(data.slug || row.id).trim();
      return {
        id: String(row.id),
        title: String(data.title || 'Untitled'),
        href: localePath(locale, `/products/${encodeURIComponent(slug)}`),
        summary: String(data.summary || ''),
      };
    });

  const relatedIndustries = industryRows
    .filter((row): row is CmsEntity => Boolean(row && isPublishedEntity(row)))
    .map((row) => {
      const data = entityData(row);
      const slug = String(data.slug || row.id).trim();
      return {
        id: String(row.id),
        title: String(data.name || data.title || 'Untitled'),
        href: localePath(locale, `/solutions/${encodeURIComponent(slug)}`),
        summary: String(data.summary || ''),
      };
    });

  return { ...article, relatedArticles, relatedProducts, relatedIndustries };
}
