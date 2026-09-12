import { fetchCollectionById, fetchCollectionList, type CmsQuery } from '../cms';
import { toProductCard, type ProductCard, type ProductRecord } from './types';

export async function listProducts(query?: CmsQuery): Promise<{
  items: ProductCard[];
  pages: { total: number; page: number; pageSize: number; totalPages: number };
}> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const result = await fetchCollectionList<ProductRecord>('product', query);
  return {
    items: (result.list || []).map((row) => toProductCard(row, locale)),
    pages: result.pages || { total: 0, page: 1, pageSize: 20, totalPages: 0 },
  };
}

export async function getProduct(idOrSlug: string, query?: CmsQuery): Promise<ProductCard | null> {
  const locale = query?.locale ? String(query.locale) : undefined;
  try {
    const row = await fetchCollectionById<ProductRecord>('product', idOrSlug, query);
    return toProductCard(row, locale);
  } catch {
    const listed = await fetchCollectionList<ProductRecord>('product', {
      ...query,
      slug: idOrSlug,
      pageSize: 1,
    });
    const first = listed.list?.[0];
    return first ? toProductCard(first, locale) : null;
  }
}
