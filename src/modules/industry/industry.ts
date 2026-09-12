import {
  entityData,
  getEntityByIdOrSlug,
  listEntities,
  localePath,
  type CmsEntity,
  type CmsQuery,
  type PublicPages,
} from '../cms';

export type SolutionCard = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  href: string;
};

export type SolutionDetail = SolutionCard & {
  content: string;
  painPoints: string;
  solutions: string;
};

function toCard(row: CmsEntity, locale?: string): SolutionCard {
  const data = entityData(row);
  const slug = String(data.slug || row.id).trim();
  return {
    id: String(row.id),
    title: String(data.name || data.title || 'Untitled'),
    slug,
    summary: String(data.summary || ''),
    href: localePath(locale, `/solutions/${encodeURIComponent(slug || row.id)}`),
  };
}

export async function listSolutions(query?: CmsQuery): Promise<{ items: SolutionCard[]; pages: PublicPages }> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const result = await listEntities('industry', query);
  return { items: result.list.map((row) => toCard(row, locale)), pages: result.pages };
}

export async function getSolution(idOrSlug: string, query?: CmsQuery): Promise<SolutionDetail | null> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const row = await getEntityByIdOrSlug('industry', idOrSlug, query);
  if (!row) return null;
  const card = toCard(row, locale);
  const data = entityData(row);
  return {
    ...card,
    content: String(data.content || ''),
    painPoints: String(data.pain_points || ''),
    solutions: String(data.solutions || ''),
  };
}
