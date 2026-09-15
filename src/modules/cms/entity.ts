import { fetchCollectionById, fetchCollectionList, type CmsQuery } from './client';
import type { CatalogKey } from './catalog';
import type { PublicPages } from './envelope';
import { CmsError, isCmsError } from './errors';

export type CmsEntity = {
  id: string;
  locale?: string | null;
  language_group_key?: string | null;
  data?: Record<string, unknown>;
  /** 公开 API 扩展区（payload 按 ui.group 嵌套输出） */
  _seo?: Record<string, unknown>;
  _schema?: Record<string, unknown>;
  _geo?: Record<string, unknown>;
  [key: string]: unknown;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** 公开 API 扩展区分区；合并进业务 data 便于字段读取 */
const EXTENSION_REGION_KEYS = ['_seo', '_schema', '_geo'] as const;

export function isEntityUuid(value: string) {
  return UUID_RE.test(String(value || '').trim());
}

/**
 * 读实体业务字段；若存在 `_seo` / `_schema` / `_geo` 分区则扁平合并
 *（兼容 Mock 把 seo_* 直接放在 data 内的形态）。
 */
export function entityData(row: CmsEntity | null | undefined) {
  if (!row) return {};
  const base =
    row.data && typeof row.data === 'object' && !Array.isArray(row.data)
      ? ({ ...row.data } as Record<string, unknown>)
      : {};
  for (const key of EXTENSION_REGION_KEYS) {
    const region = row[key];
    if (!region || typeof region !== 'object' || Array.isArray(region)) continue;
    Object.assign(base, region as Record<string, unknown>);
  }
  return base;
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
