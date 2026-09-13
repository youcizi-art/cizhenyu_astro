import {
  entityData,
  getEntityByIdOrSlug,
  isPublishedEntity,
  listEntities,
  localePath,
  readSeoFields,
  type CmsEntity,
  type CmsQuery,
  type PublicPages,
} from '../cms';
import { resolveMediaUrl } from '../media';

export type ResourceCard = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  resourceType: string;
  coverUrl: string;
  fileFormat: string;
  href: string;
};

export type ResourceDetail = ResourceCard & {
  content: string;
  downloadUrl: string;
  seoTitle: string;
  seoDescription: string;
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
    coverUrl: resolveMediaUrl(data.cover),
    fileFormat: String(data.file_format || ''),
    href: localePath(locale, `/resources/${encodeURIComponent(slug || row.id)}`),
  };
}

export async function listResources(query?: CmsQuery): Promise<{ items: ResourceCard[]; pages: PublicPages }> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const result = await listEntities('resource', {
    ...query,
    status: query?.status ?? 'published',
  });
  return {
    items: result.list.filter(isPublishedEntity).map((row) => toCard(row, locale)),
    pages: result.pages,
  };
}

export async function getResource(idOrSlug: string, query?: CmsQuery): Promise<ResourceDetail | null> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const row = await getEntityByIdOrSlug('resource', idOrSlug, query);
  if (!row || !isPublishedEntity(row)) return null;
  const card = toCard(row, locale);
  const data = entityData(row);
  const seo = readSeoFields(data, card.title, card.summary);
  return {
    ...card,
    content: String(data.content || data.description || ''),
    downloadUrl: resolveMediaUrl(data.download_file),
    seoTitle: seo.seoTitle || card.title,
    seoDescription: seo.seoDescription || card.summary,
  };
}
