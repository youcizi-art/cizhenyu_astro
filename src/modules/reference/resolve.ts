import {
  entityData,
  getEntityByIdOrSlug,
  listEntities,
  type CatalogKey,
  type CmsEntity,
} from '../cms';
import { catalogKeyForCollection, collectionItemHref, collectionListHref } from './paths';
import { parseReferenceField } from './parse';
import type { NavChildLink, ReferenceItem, ResolvedReferenceCard } from './types';

function mediaUrl(value: unknown): string {
  if (!value) return '';
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'object' && value !== null && 'url' in value) {
    return String((value as { url?: unknown }).url || '').trim();
  }
  if (Array.isArray(value) && value[0]) return mediaUrl(value[0]);
  return '';
}

function entityTitle(data: Record<string, unknown>) {
  return String(data.title || data.name || data.question || data.company_name || '').trim();
}

function entitySubtitle(data: Record<string, unknown>) {
  return String(data.subtitle || data.sku || data.client_name || data.resource_type || '').trim();
}

function entityDescription(data: Record<string, unknown>) {
  return String(data.summary || data.description || data.answer || '').trim();
}

function entityCover(data: Record<string, unknown>) {
  return mediaUrl(data.cover || data.image || data.thumbnail || data.logo);
}

function entitySlug(data: Record<string, unknown>, fallbackId: string) {
  return String(data.slug || fallbackId).trim();
}

function overlayCard(
  item: ReferenceItem,
  locale: string,
  collectionSlug: string,
  entity?: CmsEntity | null
): ResolvedReferenceCard {
  const data = entity ? entityData(entity) : {};
  const id = entity ? String(entity.id) : String(item.refId || '');
  const slug = entity ? entitySlug(data, id) : '';
  const isCollectionRoot = Boolean(item.refType) && !String(item.refId || '').trim();
  const title =
    String(item.title || '').trim() ||
    (entity ? entityTitle(data) : '') ||
    (isCollectionRoot ? collectionSlug : 'Untitled');
  const subtitle = String(item.subtitle || '').trim() || (entity ? entitySubtitle(data) : '');
  const description =
    String(item.description || '').trim() || (entity ? entityDescription(data) : '');
  const coverUrl = mediaUrl(item.image) || (entity ? entityCover(data) : '');
  const href = isCollectionRoot
    ? collectionListHref(locale, collectionSlug)
    : collectionItemHref(locale, collectionSlug, slug || id, slug);

  return {
    key: `${collectionSlug}:${id || 'collection'}`,
    title,
    subtitle,
    description,
    coverUrl,
    href,
    collectionSlug,
    isCollectionRoot,
  };
}

async function loadEntity(collectionSlug: string, refId: string, locale: string) {
  const key = catalogKeyForCollection(collectionSlug) as CatalogKey | null;
  if (!key || !refId) return null;
  try {
    return await getEntityByIdOrSlug(key, refId, { locale });
  } catch {
    return null;
  }
}

async function listCollectionPreview(
  collectionSlug: string,
  locale: string,
  pageSize: number
): Promise<ResolvedReferenceCard[]> {
  const key = catalogKeyForCollection(collectionSlug) as CatalogKey | null;
  if (!key) return [];
  try {
    const result = await listEntities(key, { locale, pageSize, status: 'published' });
    return (result.list || []).map((row) => {
      const data = entityData(row);
      const id = String(row.id);
      const slug = entitySlug(data, id);
      return {
        key: `${collectionSlug}:${id}`,
        title: entityTitle(data) || slug,
        subtitle: entitySubtitle(data),
        description: entityDescription(data),
        coverUrl: entityCover(data),
        href: collectionItemHref(locale, collectionSlug, slug, slug),
        collectionSlug,
        isCollectionRoot: false,
      };
    });
  } catch {
    return [];
  }
}

/**
 * 将 target_reference（{} | []）解析为可展示卡片。
 * - 有 refId：拉具体实体，覆盖字段优先用引用上的 title/subtitle/description/image
 * - 仅有 refType：视为集合入口；expandCollection 时再展开列表预览
 */
export async function resolveReferenceCards(
  value: unknown,
  locale: string,
  options?: { expandCollection?: boolean; collectionPreviewSize?: number }
): Promise<ResolvedReferenceCard[]> {
  const { items } = parseReferenceField(value);
  const expandCollection = options?.expandCollection === true;
  const previewSize = options?.collectionPreviewSize ?? 8;
  const cards: ResolvedReferenceCard[] = [];

  for (const item of items) {
    const collectionSlug = String(item.refType || '').trim();
    if (!collectionSlug) continue;
    const refId = String(item.refId || '').trim();

    if (!refId) {
      cards.push(overlayCard(item, locale, collectionSlug, null));
      if (expandCollection) {
        const preview = await listCollectionPreview(collectionSlug, locale, previewSize);
        cards.push(...preview);
      }
      continue;
    }

    const entity = await loadEntity(collectionSlug, refId, locale);
    cards.push(overlayCard(item, locale, collectionSlug, entity));
  }

  return cards;
}

/** 导航下拉：把引用解析成子链接（含集合列表预览） */
export async function resolveReferenceNavChildren(
  value: unknown,
  locale: string,
  options?: { previewSize?: number }
): Promise<NavChildLink[]> {
  const cards = await resolveReferenceCards(value, locale, {
    expandCollection: true,
    collectionPreviewSize: options?.previewSize ?? 8,
  });

  // 去重：集合根 + 同一实体只保留一次
  const seen = new Set<string>();
  const children: NavChildLink[] = [];
  for (const card of cards) {
    if (seen.has(card.key)) continue;
    seen.add(card.key);
    children.push({
      label: card.title,
      href: card.href,
      summary: card.subtitle || card.description,
      coverUrl: card.coverUrl || undefined,
    });
  }
  return children;
}

export function referenceFieldRaw(data: Record<string, unknown>) {
  return data.target_reference;
}
