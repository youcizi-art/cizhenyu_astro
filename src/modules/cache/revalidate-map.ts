/**
 * 集合 slug → 需要失效的路径前缀（不含 locale）。
 * 线上集合为 `{SITE_KEY}_product` 等，须按逻辑后缀匹配，不能只认写死的 b2b_*。
 */

/** 模板键（b2b_*）→ 路径前缀 */
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
  b2b_translation_fields: ['/'],
};

/** 影响全站 chrome（头尾导航）时额外失效的主要列表入口 */
export const CHROME_EXTRA_PREFIXES = [
  '/',
  '/products',
  '/articles',
  '/case-studies',
  '/solutions',
  '/faq',
  '/resources',
  '/about',
  '/contact',
] as const;

const TEMPLATE_KEYS = Object.keys(COLLECTION_PATH_PREFIXES).sort(
  (a, b) => b.length - a.length
);

/** ycz_me_product / b2b_product → b2b_product */
export function toTemplateCollectionSlug(slug: string): string | null {
  const raw = String(slug || '').trim().toLowerCase();
  if (!raw) return null;
  if (COLLECTION_PATH_PREFIXES[raw]) return raw;
  for (const key of TEMPLATE_KEYS) {
    const logical = key.slice('b2b_'.length); // product, nav_menu_item, …
    if (raw === logical || raw.endsWith(`_${logical}`)) return key;
  }
  return null;
}

function isChromeCollection(templateSlug: string) {
  return (
    templateSlug === 'b2b_nav_menu'
    || templateSlug === 'b2b_nav_menu_item'
    || templateSlug === 'b2b_company_info'
    || templateSlug === 'b2b_translation_fields'
  );
}

/** 统一 pathname：保留 `/`，其余去掉尾部 `/` */
export function normalizePathname(path: string): string {
  const raw = String(path || '').trim();
  if (!raw) return '/';
  const withSlash = raw.startsWith('/') ? raw : `/${raw}`;
  const noHash = withSlash.split('#')[0] || '/';
  const noQuery = noHash.split('?')[0] || '/';
  if (noQuery.length > 1 && noQuery.endsWith('/')) {
    return noQuery.replace(/\/+$/, '') || '/';
  }
  return noQuery || '/';
}

function expandPrefixes(prefixes: Iterable<string>, locales: string[], defaultLocale: string) {
  return expandPurgePaths([...prefixes], locales, defaultLocale);
}

/**
 * 失效路径展开：默认语种 canonical 无前缀 URL 与 /{locale}/… 双向补齐。
 * 例：default=zh-CN 时 `/about` ↔ `/zh-CN/about`；`/en-US/about` 仅保留自身。
 */
export function expandPurgePaths(
  paths: string[],
  locales: string[],
  defaultLocale: string
): string[] {
  const out = new Set<string>();
  const def = String(defaultLocale || '').trim();
  const codes = locales.map((l) => String(l || '').trim()).filter(Boolean);

  for (const raw of paths) {
    const trimmed = String(raw || '').trim();
    if (!trimmed || trimmed === '/*' || trimmed === '*') {
      out.add('/*');
      continue;
    }
    const path = normalizePathname(trimmed);
    out.add(path);

    const defPrefix = def ? `/${def}` : '';
    if (defPrefix && (path === defPrefix || path.startsWith(`${defPrefix}/`))) {
      const canonical = path === defPrefix ? '/' : path.slice(defPrefix.length) || '/';
      out.add(normalizePathname(canonical));
    }

    const hasLocalePrefix = codes.some(
      (locale) => path === `/${locale}` || path.startsWith(`/${locale}/`)
    );
    if (!hasLocalePrefix) {
      for (const locale of codes) {
        if (path === '/') out.add(`/${locale}`);
        else out.add(`/${locale}${path}`);
      }
    }
  }
  return [...out];
}

/** 由集合 slug 列表解析应失效的路径（含各语种前缀） */
export function pathsForCollections(
  collections: string[],
  locales: string[],
  defaultLocale: string
) {
  const prefixes = new Set<string>();
  let chrome = false;
  for (const slug of collections) {
    const template = toTemplateCollectionSlug(slug);
    if (!template) continue;
    if (isChromeCollection(template)) chrome = true;
    for (const prefix of COLLECTION_PATH_PREFIXES[template] || []) {
      prefixes.add(prefix);
    }
  }
  if (chrome) {
    for (const p of CHROME_EXTRA_PREFIXES) prefixes.add(p);
  }
  if (!prefixes.size) return [] as string[];
  return expandPrefixes(prefixes, locales, defaultLocale);
}

/** purge=chrome：头尾/导航相关入口页 */
export function pathsForChromePurge(locales: string[], defaultLocale: string) {
  return expandPrefixes(CHROME_EXTRA_PREFIXES, locales, defaultLocale);
}

/**
 * 规范化手动输入的页面 URL / 路径为 pathname（保留 query 丢弃）。
 * 接受 https://www.x.com/products/a 或 /products/a
 */
export function normalizePurgePathInput(input: string): string | null {
  const raw = String(input || '').trim();
  if (!raw) return null;
  try {
    if (/^https?:\/\//i.test(raw)) {
      const u = new URL(raw);
      return normalizePathname(u.pathname || '/');
    }
  } catch {
    return null;
  }
  return normalizePathname(raw);
}
