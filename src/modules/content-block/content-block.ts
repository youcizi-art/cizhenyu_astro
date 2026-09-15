import { entityData, listEntities, type CmsEntity, type CmsQuery } from '../cms';
import { resolveMediaUrl } from '../media';
import { resolveReferenceCards, type ResolvedReferenceCard } from '../reference';

export type ContentBlock = {
  id: string;
  name: string;
  slug: string;
  blockType: string;
  placement: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  summary: string;
  body: string;
  ctaLabel: string;
  ctaUrl: string;
  imageUrl: string;
  backgroundImageUrl: string;
  /** 原始 target_reference */
  targetReference: unknown;
  /** 解析后的引用卡片 */
  references: ResolvedReferenceCard[];
};

async function toBlock(row: CmsEntity, locale?: string): Promise<ContentBlock> {
  const data = entityData(row);
  const targetReference = data.target_reference ?? null;
  const references = locale
    ? await resolveReferenceCards(targetReference, locale)
    : [];
  return {
    id: String(row.id),
    name: String(data.name || ''),
    slug: String(data.slug || ''),
    blockType: String(data.block_type || ''),
    placement: String(data.placement || ''),
    eyebrow: String(data.eyebrow || ''),
    title: String(data.title || ''),
    subtitle: String(data.subtitle || ''),
    summary: String(data.summary || ''),
    body: String(data.content || data.body || ''),
    ctaLabel: String(data.link_label || data.cta_label || data.button_text || ''),
    ctaUrl: String(data.link_url || data.cta_url || data.button_url || data.link || ''),
    imageUrl: resolveMediaUrl(data.image || data.cover),
    backgroundImageUrl: resolveMediaUrl(data.background_image),
    targetReference,
    references,
  };
}

export async function listContentBlocks(query?: CmsQuery): Promise<ContentBlock[]> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const result = await listEntities('contentBlock', query);
  return Promise.all(result.list.map((row) => toBlock(row, locale)));
}

export async function listBlocksByPlacement(placement: string, query?: CmsQuery): Promise<ContentBlock[]> {
  const all = await listContentBlocks({
    ...query,
    placement,
    pageSize: 20,
  });
  return all.filter((item) => item.placement === placement);
}
