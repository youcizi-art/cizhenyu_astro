import { localePath } from '../cms';

/** 集合 slug → 前台列表路径（不含 locale 前缀） */
const COLLECTION_LIST_PATH: Record<string, string> = {
  b2b_product: '/products',
  b2b_article: '/articles',
  b2b_case_study: '/case-studies',
  b2b_industry: '/solutions',
  b2b_resource: '/resources',
  b2b_faq: '/faq',
  b2b_page: '/',
  b2b_product_category: '/products',
  b2b_content_category: '/articles',
  b2b_company_info: '/about',
  b2b_entity: '/',
};

/** 集合 slug → 详情路径模板 */
const COLLECTION_DETAIL_PATH: Record<string, (idOrSlug: string) => string> = {
  b2b_product: (id) => `/products/${encodeURIComponent(id)}`,
  b2b_article: (id) => `/articles/${encodeURIComponent(id)}`,
  b2b_case_study: (id) => `/case-studies/${encodeURIComponent(id)}`,
  b2b_industry: (id) => `/solutions/${encodeURIComponent(id)}`,
  b2b_resource: (id) => `/resources/${encodeURIComponent(id)}`,
  b2b_faq: () => '/faq',
  b2b_page: (id) => {
    if (id === 'about' || id === 'contact') return `/${id}`;
    return `/${encodeURIComponent(id)}`;
  },
  b2b_product_category: () => '/products',
  b2b_content_category: () => '/articles',
};

export function collectionListHref(locale: string, collectionSlug: string) {
  const path = COLLECTION_LIST_PATH[collectionSlug] || '/';
  return localePath(locale, path);
}

export function collectionItemHref(
  locale: string,
  collectionSlug: string,
  idOrSlug: string,
  pageSlug?: string
) {
  if (collectionSlug === 'b2b_page' && pageSlug) {
    return localePath(locale, pageSlug === 'home' ? '/' : `/${pageSlug}`);
  }
  const build = COLLECTION_DETAIL_PATH[collectionSlug];
  if (!build) return collectionListHref(locale, collectionSlug);
  return localePath(locale, build(idOrSlug || pageSlug || ''));
}

export function catalogKeyForCollection(collectionSlug: string): string | null {
  const map: Record<string, string> = {
    b2b_product: 'product',
    b2b_article: 'article',
    b2b_case_study: 'caseStudy',
    b2b_industry: 'industry',
    b2b_resource: 'resource',
    b2b_faq: 'faq',
    b2b_page: 'page',
    b2b_product_category: 'productCategory',
    b2b_content_category: 'contentCategory',
    b2b_company_info: 'companyInfo',
    b2b_entity: 'entity',
    b2b_nav_menu: 'navMenu',
    b2b_nav_menu_item: 'navMenuItem',
  };
  return map[collectionSlug] || null;
}
