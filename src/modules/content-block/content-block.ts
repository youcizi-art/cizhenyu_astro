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

async function toBlock(
  row: CmsEntity,
  locale?: string,
  options?: { resolveReferences?: boolean }
): Promise<ContentBlock> {
  const data = entityData(row);
  const targetReference = data.target_reference ?? null;
  const shouldResolve = options?.resolveReferences !== false && Boolean(locale);
  const references = shouldResolve
    ? await resolveReferenceCards(targetReference, locale as string)
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

export async function listContentBlocks(
  query?: CmsQuery,
  options?: { resolveReferences?: boolean }
): Promise<ContentBlock[]> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const result = await listEntities('contentBlock', query);
  return Promise.all(result.list.map((row) => toBlock(row, locale, options)));
}

export async function listBlocksByPlacement(placement: string, query?: CmsQuery): Promise<ContentBlock[]> {
  const all = await listContentBlocks({
    ...query,
    placement,
    pageSize: 20,
  });
  return all.filter((item) => item.placement === placement);
}

/** 一次拉取后按 placement 分组，避免首页多次打 CMS */
export async function listBlocksGroupedByPlacements(
  placements: string[],
  query?: CmsQuery,
  options?: { resolveReferencesFor?: string[] }
): Promise<Record<string, ContentBlock[]>> {
  const wanted = [...new Set(placements.map((p) => String(p || '').trim()).filter(Boolean))];
  const grouped: Record<string, ContentBlock[]> = {};
  for (const p of wanted) grouped[p] = [];
  if (!wanted.length) return grouped;

  const resolveFor = new Set(
    (options?.resolveReferencesFor || wanted).map((p) => String(p || '').trim()).filter(Boolean)
  );

  const all = await listContentBlocks(
    {
      ...query,
      pageSize: Math.max(40, wanted.length * 8),
    },
    { resolveReferences: false }
  );
  const allow = new Set(wanted);
  const needResolve = all.filter((item) => allow.has(item.placement) && resolveFor.has(item.placement));
  const resolved = await Promise.all(
    needResolve.map(async (item) => {
      const locale = query?.locale ? String(query.locale) : undefined;
      if (!locale) return item;
      const references = await resolveReferenceCards(item.targetReference, locale);
      return { ...item, references };
    })
  );
  const byId = new Map(resolved.map((item) => [item.id, item]));

  for (const item of all) {
    if (!allow.has(item.placement)) continue;
    grouped[item.placement].push(byId.get(item.id) || item);
  }
  return grouped;
}
