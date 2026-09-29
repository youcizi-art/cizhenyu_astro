import { localePath } from '../cms';
import { loadSiteManifest } from '../site/load-site';

/** 逻辑集合名（去掉 ns 前缀后的后缀）→ 前台列表路径 */
const LOGICAL_LIST_PATH: Record<string, string> = {
  product: '/products',
  article: '/articles',
  case_study: '/case-studies',
  industry: '/solutions',
  resource: '/resources',
  faq: '/faq',
  page: '/',
  product_category: '/products',
  content_category: '/articles',
  company_info: '/about',
  entity: '/',
};

const LOGICAL_DETAIL_PATH: Record<string, (idOrSlug: string) => string> = {
  product: (id) => `/products/${encodeURIComponent(id)}`,
  article: (id) => `/articles/${encodeURIComponent(id)}`,
  case_study: (id) => `/case-studies/${encodeURIComponent(id)}`,
  industry: (id) => `/solutions/${encodeURIComponent(id)}`,
  resource: (id) => `/resources/${encodeURIComponent(id)}`,
  faq: () => '/faq',
  page: (id) => {
    if (id === 'about' || id === 'contact') return `/${id}`;
    return `/${encodeURIComponent(id)}`;
  },
  product_category: () => '/products',
  content_category: () => '/articles',
};

/** 逻辑后缀 → catalog key */
const LOGICAL_CATALOG_KEY: Record<string, string> = {
  product: 'product',
  article: 'article',
  case_study: 'caseStudy',
  industry: 'industry',
  resource: 'resource',
  faq: 'faq',
  page: 'page',
  product_category: 'productCategory',
  content_category: 'contentCategory',
  company_info: 'companyInfo',
  entity: 'entity',
  nav_menu: 'navMenu',
  nav_menu_item: 'navMenuItem',
  inquiry: 'inquiry',
  online_message: 'onlineMessage',
  content_block: 'contentBlock',
};

/**
 * 将任意 ns 下的集合 slug 归一为逻辑名。
 * 例：b2b_product / acme_product / pet_case_study → product / product / case_study
 */
export function logicalCollectionName(collectionSlug: string): string {
  const raw = String(collectionSlug || '').trim();
  if (!raw) return '';
  if (raw.startsWith('b2b_')) return raw.slice('b2b_'.length);

  try {
    const ns = String(loadSiteManifest().cms.collectionNamespace || '').trim();
    if (ns && raw.startsWith(`${ns}_`)) {
      return raw.slice(ns.length + 1);
    }
  } catch {
    // manifest 不可用时继续启发式
  }

  // 启发式：取最后一个已知逻辑后缀
  const known = Object.keys(LOGICAL_CATALOG_KEY).sort((a, b) => b.length - a.length);
  for (const suffix of known) {
    if (raw === suffix || raw.endsWith(`_${suffix}`)) return suffix;
  }
  const idx = raw.indexOf('_');
  return idx > 0 ? raw.slice(idx + 1) : raw;
}

export function collectionListHref(locale: string, collectionSlug: string) {
  const logical = logicalCollectionName(collectionSlug);
  const path = LOGICAL_LIST_PATH[logical] || '/';
  return localePath(locale, path);
}

export function collectionItemHref(
  locale: string,
  collectionSlug: string,
  idOrSlug: string,
  pageSlug?: string
) {
  const logical = logicalCollectionName(collectionSlug);
  if (logical === 'page' && pageSlug) {
    return localePath(locale, pageSlug === 'home' ? '/' : `/${pageSlug}`);
  }
  const build = LOGICAL_DETAIL_PATH[logical];
  if (!build) return collectionListHref(locale, collectionSlug);
  return localePath(locale, build(idOrSlug || pageSlug || ''));
}

export function catalogKeyForCollection(collectionSlug: string): string | null {
  const logical = logicalCollectionName(collectionSlug);
  return LOGICAL_CATALOG_KEY[logical] || null;
}
