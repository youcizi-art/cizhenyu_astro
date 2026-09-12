import {
  entityData,
  getEntityByIdOrSlug,
  listEntities,
  type CmsEntity,
  type CmsQuery,
} from '../cms';

export type SitePage = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
};

function toPage(row: CmsEntity): SitePage {
  const data = entityData(row);
  return {
    id: String(row.id),
    title: String(data.title || 'Untitled'),
    slug: String(data.slug || row.id),
    summary: String(data.summary || ''),
    content: String(data.content || ''),
  };
}

export async function getPageBySlug(slug: string, query?: CmsQuery): Promise<SitePage | null> {
  const row = await getEntityByIdOrSlug('page', slug, query, 'slug');
  return row ? toPage(row) : null;
}

export async function listPages(query?: CmsQuery): Promise<SitePage[]> {
  const result = await listEntities('page', query);
  return result.list.map(toPage);
}
