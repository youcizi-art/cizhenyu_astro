import {
  entityData,
  getEntityByIdOrSlug,
  listEntities,
  localePath,
  type CmsEntity,
  type CmsQuery,
  type PublicPages,
} from '../cms';

export type ResourceCard = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  resourceType: string;
  href: string;
};

export type ResourceDetail = ResourceCard & {
  content: string;
};

function toCard(row: CmsEntity, locale?: string): ResourceCard {
  const data = entityData(row);
  const slug = String(data.slug || row.id).trim();
  return {
    id: String(row.id),
    title: String(data.title || 'Untitled'),
    slug,
    summary: String(data.summary || data.description || ''),
    resourceType: String(data.resource_type || ''),
    href: localePath(locale, `/resources/${encodeURIComponent(slug || row.id)}`),
  };
}

export async function listResources(query?: CmsQuery): Promise<{ items: ResourceCard[]; pages: PublicPages }> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const result = await listEntities('resource', query);
  return { items: result.list.map((row) => toCard(row, locale)), pages: result.pages };
}

export async function getResource(idOrSlug: string, query?: CmsQuery): Promise<ResourceDetail | null> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const row = await getEntityByIdOrSlug('resource', idOrSlug, query);
  if (!row) return null;
  const card = toCard(row, locale);
  const data = entityData(row);
  return { ...card, content: String(data.content || data.description || '') };
}
