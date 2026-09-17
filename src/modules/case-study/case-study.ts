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
import { toPageSeo, type PageSeo } from '../seo';

export type CaseStudyLinkCard = {
  id: string;
  title: string;
  href: string;
  summary?: string;
};

export type CaseStudyCard = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  clientName: string;
  industry: string;
  coverUrl: string;
  href: string;
};

export type CaseStudyDetail = CaseStudyCard & {
  content: string;
  challenge: string;
  solution: string;
  results: string;
  seoTitle: string;
  seoDescription: string;
  seo: PageSeo;
  languageGroupKey: string;
  industryIds: string[];
  relatedProductIds: string[];
  industries: CaseStudyLinkCard[];
  relatedProducts: CaseStudyLinkCard[];
};

function asRelationIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (typeof item === 'string' || typeof item === 'number') return String(item).trim();
      if (item && typeof item === 'object' && 'id' in item) {
        return String((item as { id: unknown }).id || '').trim();
      }
      return '';
    })
    .filter(Boolean);
}

function toCard(row: CmsEntity, locale?: string): CaseStudyCard {
  const data = entityData(row);
  const slug = String(data.slug || row.id).trim();
  return {
    id: String(row.id),
    title: String(data.title || 'Untitled'),
    slug,
    summary: String(data.summary || ''),
    clientName: String(data.client_name || ''),
    industry: String(data.industry || ''),
    coverUrl: resolveMediaUrl(data.cover),
    href: localePath(locale, `/case-studies/${encodeURIComponent(slug || row.id)}`),
  };
}

export async function listCaseStudies(query?: CmsQuery): Promise<{ items: CaseStudyCard[]; pages: PublicPages }> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const result = await listEntities('caseStudy', {
    ...query,
    status: query?.status ?? 'published',
  });
  return {
    items: result.list.filter(isPublishedEntity).map((row) => toCard(row, locale)),
    pages: result.pages,
  };
}

export async function getCaseStudy(idOrSlug: string, query?: CmsQuery): Promise<CaseStudyDetail | null> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const row = await getEntityByIdOrSlug('caseStudy', idOrSlug, query);
  if (!row || !isPublishedEntity(row)) return null;
  const card = toCard(row, locale);
  const data = entityData(row);
  const fields = readSeoFields(data, card.title, card.summary);
  const seo = toPageSeo(fields, {
    pathname: card.href,
    ogImageFallback: card.coverUrl,
    schemaTypeDefault: 'Article',
    ogType: 'article',
  });
  return {
    ...card,
    content: String(data.content || ''),
    challenge: String(data.challenge || ''),
    solution: String(data.solution || ''),
    results: String(data.results || ''),
    seoTitle: seo.title || card.title,
    seoDescription: seo.description || card.summary,
    seo,
    languageGroupKey: String(row.language_group_key || '').trim(),
    industryIds: asRelationIds(data.industry_ids),
    relatedProductIds: asRelationIds(data.related_product_ids),
    industries: [],
    relatedProducts: [],
  };
}

export async function enrichCaseStudyDetail(
  item: CaseStudyDetail,
  locale: string | undefined
): Promise<CaseStudyDetail> {
  const [industryRows, productRows] = await Promise.all([
    Promise.all(
      [...new Set(item.industryIds)].map((id) =>
        getEntityByIdOrSlug('industry', id, { locale, status: 'published' }).catch(() => null)
      )
    ),
    Promise.all(
      [...new Set(item.relatedProductIds)].map((id) =>
        getEntityByIdOrSlug('product', id, { locale, status: 'published' }).catch(() => null)
      )
    ),
  ]);

  const industries = industryRows
    .filter((row): row is CmsEntity => Boolean(row && isPublishedEntity(row)))
    .map((row) => {
      const data = entityData(row);
      const slug = String(data.slug || row.id).trim();
      return {
        id: String(row.id),
        title: String(data.name || data.title || 'Untitled'),
        href: localePath(locale, `/solutions/${encodeURIComponent(slug)}`),
        summary: String(data.summary || ''),
      };
    });

  const relatedProducts = productRows
    .filter((row): row is CmsEntity => Boolean(row && isPublishedEntity(row)))
    .map((row) => {
      const data = entityData(row);
      const slug = String(data.slug || row.id).trim();
      return {
        id: String(row.id),
        title: String(data.title || 'Untitled'),
        href: localePath(locale, `/products/${encodeURIComponent(slug)}`),
        summary: String(data.summary || ''),
      };
    });

  return { ...item, industries, relatedProducts };
}
