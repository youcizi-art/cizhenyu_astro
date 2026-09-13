import {
  getEntityByIdOrSlug,
  listEntities,
  type CmsQuery,
  type PublicPages,
} from '../cms';
import {
  isPublishedProduct,
  toProductCard,
  toProductDetail,
  type ProductCard,
  type ProductDetail,
} from './types';

export async function listProducts(query?: CmsQuery): Promise<{
  items: ProductCard[];
  pages: PublicPages;
}> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const result = await listEntities('product', {
    ...query,
    // 列表侧优先只要已发布；若后端未按 status 过滤，前端再筛
    status: query?.status ?? 'published',
  });
  const items = result.list
    .filter(isPublishedProduct)
    .map((row) => toProductCard(row, locale));
  return { items, pages: result.pages };
}

export async function getProduct(
  idOrSlug: string,
  query?: CmsQuery
): Promise<ProductDetail | null> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const row = await getEntityByIdOrSlug('product', idOrSlug, query);
  if (!row || !isPublishedProduct(row)) return null;
  return toProductDetail(row, locale);
}
