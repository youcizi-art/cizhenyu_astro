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

export type ProductCategoryCard = {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverUrl: string;
  href: string;
  sortOrder: number;
};

export type ProductCategoryDetail = ProductCategoryCard & {
  seoTitle: string;
  seoDescription: string;
  seo: PageSeo;
  languageGroupKey: string;
};

function toCard(row: CmsEntity, locale?: string): ProductCategoryCard {
  const data = entityData(row);
  const slug = String(data.slug || row.id).trim();
  return {
    id: String(row.id),
    name: String(data.name || data.title || 'Untitled'),
    slug,
    description: String(data.description || ''),
    coverUrl: resolveMediaUrl(data.cover),
    href: localePath(locale, `/products/category/${encodeURIComponent(slug || row.id)}`),
    sortOrder: Number(data.sort_order || 0) || 0,
  };
}

export async function listProductCategories(
  query?: CmsQuery
): Promise<{ items: ProductCategoryCard[]; pages: PublicPages }> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const result = await listEntities('productCategory', {
    ...query,
    status: query?.status ?? 'published',
  });
  const items = result.list
    .filter(isPublishedEntity)
    .map((row) => toCard(row, locale))
    .sort((a, b) => a.sortOrder - b.sortOrder);
  return { items, pages: result.pages };
}

export async function getProductCategory(
  idOrSlug: string,
  query?: CmsQuery
): Promise<ProductCategoryDetail | null> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const row = await getEntityByIdOrSlug('productCategory', idOrSlug, query);
  if (!row || !isPublishedEntity(row)) return null;
  const card = toCard(row, locale);
  const data = entityData(row);
  const fields = readSeoFields(data, card.name, card.description);
  const seo = toPageSeo(fields, {
    pathname: card.href,
    ogImageFallback: card.coverUrl,
    schemaTypeDefault: 'WebPage',
    ogType: 'website',
  });
  return {
    ...card,
    seoTitle: seo.title || card.name,
    seoDescription: seo.description || card.description,
    seo,
    languageGroupKey: String(row.language_group_key || '').trim(),
  };
}
