import { fetchCollectionById, fetchCollectionList, type CmsQuery } from './client';
import type { CatalogKey } from './catalog';
import type { PublicPages } from './envelope';
import { CmsError, isCmsError } from './errors';

export type CmsEntity = {
  id: string;
  locale?: string | null;
  language_group_key?: string | null;
  data?: Record<string, unknown>;
  [key: string]: unknown;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isEntityUuid(value: string) {
  return UUID_RE.test(String(value || '').trim());
}

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

  if (isEntityUuid(value)) {
    try {
      return await fetchCollectionById<T>(key, value, query);
    } catch (error) {
      if (isCmsError(error) && error.status === 404) return null;
      throw error;
    }
  }

  try {
    const listed = await fetchCollectionList<T>(key, {
      ...query,
      [slugField]: value,
      pageSize: 5,
    });
    const hit = (listed.list || []).find((row) => {
      const data = entityData(row);
      return String(data[slugField] || '').trim() === value || String(row.id) === value;
    });
    return hit || listed.list?.[0] || null;
  } catch (error) {
    if (isCmsError(error) && error.status === 404) return null;
    throw error;
  }
}

export { CmsError, isCmsError };
