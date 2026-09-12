import { fetchCollectionById, fetchCollectionList, type CmsQuery } from './client';
import type { CatalogKey } from './catalog';
import type { PublicPages } from './envelope';

export type CmsEntity = {
  id: string;
  locale?: string | null;
  data?: Record<string, unknown>;
  [key: string]: unknown;
};

export function entityData(row: CmsEntity | null | undefined) {
  return (row?.data || {}) as Record<string, unknown>;
}

export function localePath(locale: string | undefined, path: string) {
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  if (!locale) return normalized || '/';
  return `/${locale}${normalized}`;
}

export async function listEntities<T extends CmsEntity = CmsEntity>(
  key: CatalogKey,
  query?: CmsQuery
): Promise<{ list: T[]; pages: PublicPages }> {
  const result = await fetchCollectionList<T>(key, query);
  return {
    list: result.list || [],
    pages: result.pages || { total: 0, page: 1, pageSize: 20, totalPages: 0 },
  };
}

export async function getEntityByIdOrSlug<T extends CmsEntity = CmsEntity>(
  key: CatalogKey,
  idOrSlug: string,
  query?: CmsQuery,
  slugField = 'slug'
): Promise<T | null> {
  const value = String(idOrSlug || '').trim();
  if (!value) return null;
  try {
    return await fetchCollectionById<T>(key, value, query);
  } catch {
    const listed = await fetchCollectionList<T>(key, {
      ...query,
      [slugField]: value,
      pageSize: 1,
    });
    return listed.list?.[0] || null;
  }
}
