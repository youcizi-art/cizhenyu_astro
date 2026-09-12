/**
 * 集合 slug → 需要失效的路径前缀（不含 locale）
 */
export const COLLECTION_PATH_PREFIXES: Record<string, string[]> = {
  b2b_product: ['/products'],
  b2b_product_category: ['/products'],
  b2b_article: ['/articles'],
  b2b_case_study: ['/case-studies'],
  b2b_industry: ['/solutions'],
  b2b_faq: ['/faq'],
  b2b_page: ['/about', '/contact'],
  b2b_company_info: ['/', '/about', '/contact'],
  b2b_content_block: ['/'],
  b2b_nav_menu: ['/'],
  b2b_nav_menu_item: ['/'],
  b2b_resource: ['/resources'],
};

export function pathsForCollections(collections: string[], locales: string[]) {
  const prefixes = new Set<string>();
  for (const slug of collections) {
    for (const prefix of COLLECTION_PATH_PREFIXES[slug] || []) {
      prefixes.add(prefix);
    }
  }
  if (!prefixes.size) return [] as string[];

  const out = new Set<string>();
  for (const prefix of prefixes) {
    out.add(prefix);
    for (const locale of locales) {
      if (!locale) continue;
      if (prefix === '/') out.add(`/${locale}`);
      else out.add(`/${locale}${prefix}`);
    }
  }
  return [...out];
}
