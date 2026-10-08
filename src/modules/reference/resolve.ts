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

const COLLECTION_ROOT_LABEL: Record<string, Record<string, string>> = {
  b2b_product: {
    'zh-CN': '全部产品',
    'zh-TW': '全部產品',
    ja: 'すべての製品',
    'en-US': 'All products',
  },
  b2b_article: {
    'zh-CN': '全部文章',
    'zh-TW': '全部文章',
    ja: 'すべての記事',
    'en-US': 'All articles',
  },
  b2b_case_study: {
    'zh-CN': '全部案例',
    'zh-TW': '全部案例',
    ja: 'すべての事例',
    'en-US': 'All case studies',
  },
  b2b_industry: {
    'zh-CN': '全部方案',
    'zh-TW': '全部方案',
    ja: 'すべてのソリューション',
    'en-US': 'All solutions',
  },
  b2b_resource: {
    'zh-CN': '全部资源',
    'zh-TW': '全部資源',
    ja: 'すべてのリソース',
    'en-US': 'All resources',
  },
  b2b_faq: {
    'zh-CN': '常见问题',
    'zh-TW': '常見問題',
    ja: 'よくある質問',
    'en-US': 'All FAQs',
  },
  b2b_page: {
    'zh-CN': '全部单页',
    'zh-TW': '全部單頁',
    ja: 'すべてのページ',
    'en-US': 'All pages',
  },
};

function getCollectionRootLabel(collectionSlug: string, locale: string) {
  const map = COLLECTION_ROOT_LABEL[collectionSlug];
  if (!map) return locale.startsWith('zh') ? '查看全部' : 'View all';
  return map[locale] || map['en-US'] || (locale.startsWith('zh') ? map['zh-CN'] : 'View all');
}

function collectionRootTitle(item: ReferenceItem, collectionSlug: string, locale: string, fallback?: string) {
  return (
    String(item.title || '').trim()
    || String(fallback || '').trim()
    || getCollectionRootLabel(collectionSlug, locale)
  );
}

function overlayCard(
  item: ReferenceItem,
  locale: string,
  collectionSlug: string,
  entity?: CmsEntity | null,
  options?: { collectionRootFallback?: string }
): ResolvedReferenceCard {
  const data = entity ? entityData(entity) : {};
  const id = entity ? String(entity.id) : String(item.refId || '');
  const slug = entity ? entitySlug(data, id) : '';
  const isCollectionRoot = Boolean(item.refType) && !String(item.refId || '').trim();
  const title = isCollectionRoot
    ? collectionRootTitle(item, collectionSlug, locale, options?.collectionRootFallback)
    : String(item.title || '').trim() || (entity ? entityTitle(data) : '') || 'Untitled';
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
  options?: {
    expandCollection?: boolean;
    collectionPreviewSize?: number;
    collectionRootFallback?: string;
  }
): Promise<ResolvedReferenceCard[]> {
  const { items } = parseReferenceField(value);
  const expandCollection = options?.expandCollection === true;
  const previewSize = options?.collectionPreviewSize ?? 8;

  // 并行解析，避免首页/导航串行打 CMS（原先 N 条引用 = N 次往返）
  const batches = await Promise.all(
    items.map(async (item) => {
      const collectionSlug = String(item.refType || '').trim();
      if (!collectionSlug) return [] as ResolvedReferenceCard[];
      const refId = String(item.refId || '').trim();

      if (!refId) {
        const root = overlayCard(item, locale, collectionSlug, null, {
          collectionRootFallback: options?.collectionRootFallback,
        });
        if (!expandCollection) return [root];
        const preview = await listCollectionPreview(collectionSlug, locale, previewSize);
        return [root, ...preview];
      }

      const entity = await loadEntity(collectionSlug, refId, locale);
      return [overlayCard(item, locale, collectionSlug, entity)];
    })
  );

  return batches.flat();
}

/** 导航下拉：把引用解析成子链接（默认不展开集合预览，避免 N 次 list） */
export async function resolveReferenceNavChildren(
  value: unknown,
  locale: string,
  options?: {
    previewSize?: number;
    collectionRootFallback?: string;
    /** 默认 false：只保留集合入口/实体链接；true 时再拉列表预览 */
    expandCollection?: boolean;
  }
): Promise<NavChildLink[]> {
  const cards = await resolveReferenceCards(value, locale, {
    expandCollection: options?.expandCollection === true,
    collectionPreviewSize: options?.previewSize ?? 4,
    collectionRootFallback: options?.collectionRootFallback,
  });

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
