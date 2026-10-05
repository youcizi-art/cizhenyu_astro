import {
  entityData,
  getEntityByIdOrSlug,
  listEntities,
  localePath,
  type CmsEntity,
  type CmsQuery,
} from '../cms';
import {
  asRelationIds,
  isPublishedProduct,
  toProductCard,
  toProductDetail,
  type ProductDetail,
  type ProductLinkCard,
} from './types';

export async function listProducts(query?: CmsQuery) {
  const locale = query?.locale ? String(query.locale) : undefined;
  const result = await listEntities('product', {
    ...query,
    status: query?.status ?? 'published',
  });
  const items = result.list.filter(isPublishedProduct).map((row) => toProductCard(row, locale));
  return { items, pages: result.pages };
}

export async function getProduct(idOrSlug: string, query?: CmsQuery): Promise<ProductDetail | null> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const row = await getEntityByIdOrSlug('product', idOrSlug, query);
  if (!row || !isPublishedProduct(row)) return null;
  return toProductDetail(row, locale);
}

async function resolveLinkCards(
  key: 'product' | 'industry' | 'caseStudy' | 'article',
  ids: string[],
  locale: string | undefined,
  mapRow: (row: CmsEntity) => ProductLinkCard | null
): Promise<ProductLinkCard[]> {
  if (!ids.length) return [];
  const unique = [...new Set(ids)];
  const rows = await Promise.all(
    unique.map((id) => getEntityByIdOrSlug(key, id, { locale }).catch(() => null))
  );
  return rows
    .filter(Boolean)
    .map((row) => mapRow(row as CmsEntity))
    .filter(Boolean) as ProductLinkCard[];
}

function industryCard(row: CmsEntity, locale?: string): ProductLinkCard | null {
  const data = entityData(row);
  const slug = String(data.slug || row.id).trim();
  if (!slug) return null;
  return {
    id: String(row.id),
    title: String(data.name || data.title || 'Untitled'),
    href: localePath(locale, `/solutions/${encodeURIComponent(slug)}`),
    summary: String(data.summary || ''),
    coverUrl: String((data.cover as { url?: string } | undefined)?.url || ''),
  };
}

function caseCard(row: CmsEntity, locale?: string): ProductLinkCard | null {
  const data = entityData(row);
  const slug = String(data.slug || row.id).trim();
  if (!slug) return null;
  return {
    id: String(row.id),
    title: String(data.title || 'Untitled'),
    href: localePath(locale, `/case-studies/${encodeURIComponent(slug)}`),
    summary: String(data.summary || ''),
  };
}

function articleCard(row: CmsEntity, locale?: string): ProductLinkCard | null {
  const data = entityData(row);
  const slug = String(data.slug || row.id).trim();
  if (!slug) return null;
  return {
    id: String(row.id),
    title: String(data.title || 'Untitled'),
    href: localePath(locale, `/articles/${encodeURIComponent(slug)}`),
    summary: String(data.summary || data.excerpt || ''),
  };
}

export async function listProductsByCategoryId(
  categoryId: string,
  query?: CmsQuery
): Promise<{ items: ReturnType<typeof toProductCard>[]; pages: { total: number; page: number; pageSize: number; totalPages: number } }> {
  const locale = query?.locale ? String(query.locale) : undefined;
  const page = Math.max(1, Number(query?.page || 1) || 1);
  const pageSize = Math.max(1, Number(query?.pageSize || 12) || 12);
  const all: ReturnType<typeof toProductCard>[] = [];
  let cmsPage = 1;
  for (;;) {
    const result = await listEntities('product', {
      locale,
      page: cmsPage,
      pageSize: 100,
      status: 'published',
    });
    for (const row of result.list.filter(isPublishedProduct)) {
      const ids = asRelationIds(entityData(row).taxonomy_ids);
      if (!ids.includes(categoryId)) continue;
      all.push(toProductCard(row, locale));
    }
    const totalPages = Number(result.pages?.totalPages || 1) || 1;
    if (cmsPage >= totalPages || !result.list.length) break;
    cmsPage += 1;
    if (cmsPage > 50) break;
  }
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);
  const start = (page - 1) * pageSize;
  return {
    items: all.slice(start, start + pageSize),
    pages: { total, page, pageSize, totalPages },
  };
}

/** 解析产品关联（行业/相关产品/案例/FAQ），失败时返回空数组 */
export async function enrichProductDetail(
  product: ProductDetail,
  locale: string | undefined
): Promise<ProductDetail> {
  const [industries, relatedProducts, relatedCases, relatedArticles, faqByIds] = await Promise.all([
    resolveLinkCards('industry', product.industryIds, locale, (row) => industryCard(row, locale)),
    resolveLinkCards('product', product.relatedProductIds, locale, (row) => {
      if (!isPublishedProduct(row)) return null;
      const card = toProductCard(row, locale);
      if (card.id === product.id) return null;
      return {
        id: card.id,
        title: card.title,
        href: card.href,
        summary: card.summary,
        coverUrl: card.coverUrl,
      };
    }),
    resolveLinkCards('caseStudy', product.relatedCaseIds, locale, (row) => caseCard(row, locale)),
    resolveLinkCards('article', product.relatedArticleIds, locale, (row) => articleCard(row, locale)),
    product.faqIds.length
      ? Promise.all(
          product.faqIds.map((id) => getEntityByIdOrSlug('faq', id, { locale }).catch(() => null))
        )
      : Promise.resolve([] as Array<CmsEntity | null>),
  ]);

  const faqsFromIds = (faqByIds || [])
    .filter(Boolean)
    .map((row) => {
      const data = entityData(row as CmsEntity);
      return {
        id: String((row as CmsEntity).id),
        question: String(data.question || ''),
        answer: String(data.answer || ''),
      };
    })
    .filter((item) => item.question);

  let faqs = faqsFromIds;
  // 无 faqIds 时不再全表 pageSize=100 兜底（MISS 路径成本过高）
  if (!faqs.length) {
    faqs = [];
  }

  return {
    ...product,
    industries,
    relatedProducts,
    relatedCases,
    relatedArticles,
    faqs,
  };
}
