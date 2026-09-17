import { listEntities, entityData, isPublishedEntity, localePath } from '../cms';
import { loadSiteManifest } from '../site';
import { toAbsoluteUrl } from './urls';

export type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
  alternates?: Array<{ hreflang: string; href: string }>;
};

type RawPath = {
  path: string;
  locale: string;
  groupKey: string;
  priority: string;
  lastmod?: string;
  robots?: string;
};

function entityLastmod(row: { updatedAt?: string; updated_at?: string; data?: Record<string, unknown> }) {
  const raw =
    row.updatedAt ||
    row.updated_at ||
    String(row.data?.updated_at || row.data?.updatedAt || '').trim();
  if (!raw) return '';
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

function isNoindex(robots: string) {
  return /\bnoindex\b/i.test(robots);
}

async function slugList(key: Parameters<typeof listEntities>[0], locale: string, slugField = 'slug') {
  const out: Array<{
    slug: string;
    lastmod?: string;
    groupKey: string;
    robots: string;
  }> = [];
  let page = 1;
  const pageSize = 100;
  for (;;) {
    try {
      const result = await listEntities(key, { locale, pageSize, page, status: 'published' });
      const list = (result.list || []).filter(isPublishedEntity);
      for (const row of list) {
        const data = entityData(row);
        const slug = String(data[slugField] || row.id).trim();
        if (!slug) continue;
        const robots = String(data.robots_directive || 'index,follow').trim();
        out.push({
          slug,
          lastmod: entityLastmod(row as any) || undefined,
          groupKey: String(row.language_group_key || `${key}:${slug}`).trim(),
          robots,
        });
      }
      const totalPages = Number(result.pages?.totalPages || 1) || 1;
      if (page >= totalPages || list.length === 0) break;
      page += 1;
      if (page > 50) break;
    } catch {
      break;
    }
  }
  return out;
}

function attachAlternates(paths: RawPath[], origin: string): SitemapEntry[] {
  const byGroup = new Map<string, RawPath[]>();
  for (const item of paths) {
    if (isNoindex(item.robots || '')) continue;
    const list = byGroup.get(item.groupKey) || [];
    list.push(item);
    byGroup.set(item.groupKey, list);
  }

  const entries: SitemapEntry[] = [];
  const seen = new Set<string>();

  for (const group of byGroup.values()) {
    const alternates = group.map((item) => ({
      hreflang: item.locale,
      href: toAbsoluteUrl(item.path, origin),
    }));
    for (const item of group) {
      const loc = toAbsoluteUrl(item.path, origin);
      if (!loc || seen.has(loc)) continue;
      seen.add(loc);
      entries.push({
        loc,
        changefreq: 'weekly',
        priority: item.priority,
        ...(item.lastmod ? { lastmod: item.lastmod } : {}),
        alternates,
      });
    }
  }

  return entries;
}

/** 汇总站内公开 URL（多语种），供 /sitemap.xml 使用 */
export async function collectSitemapEntries(options?: { origin?: string }): Promise<SitemapEntry[]> {
  const site = loadSiteManifest();
  const origin = String(options?.origin || '').trim() || undefined;
  if (!origin && !String(import.meta.env.PUBLIC_SITE_URL || '').trim()) {
    // Relative <loc> is invalid for search engines; still return paths for local debug.
  }
  const locales = site.locales?.length ? site.locales : [site.defaultLocale || 'zh-CN'];
  const staticPaths = [
    '/',
    '/products',
    '/articles',
    '/case-studies',
    '/solutions',
    '/resources',
    '/faq',
    '/about',
    '/contact',
    '/articles/type/news',
    '/articles/type/buying_guide',
    '/articles/type/comparison',
    '/articles/type/technical',
    '/articles/type/application_guide',
  ];

  const raw: RawPath[] = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      raw.push({
        path: localePath(locale, path),
        locale,
        groupKey: `static:${path}`,
        priority: path === '/' ? '1.0' : path.startsWith('/articles/type/') ? '0.65' : '0.8',
        robots: 'index,follow',
      });
    }

    const [products, articles, cases, industries, resources, categories] = await Promise.all([
      slugList('product', locale),
      slugList('article', locale),
      slugList('caseStudy', locale),
      slugList('industry', locale),
      slugList('resource', locale),
      slugList('productCategory', locale),
    ]);

    for (const item of products) {
      raw.push({
        path: localePath(locale, `/products/${encodeURIComponent(item.slug)}`),
        locale,
        groupKey: `product:${item.groupKey}`,
        priority: '0.7',
        lastmod: item.lastmod,
        robots: item.robots,
      });
    }
    for (const item of articles) {
      raw.push({
        path: localePath(locale, `/articles/${encodeURIComponent(item.slug)}`),
        locale,
        groupKey: `article:${item.groupKey}`,
        priority: '0.7',
        lastmod: item.lastmod,
        robots: item.robots,
      });
    }
    for (const item of cases) {
      raw.push({
        path: localePath(locale, `/case-studies/${encodeURIComponent(item.slug)}`),
        locale,
        groupKey: `case:${item.groupKey}`,
        priority: '0.7',
        lastmod: item.lastmod,
        robots: item.robots,
      });
    }
    for (const item of industries) {
      raw.push({
        path: localePath(locale, `/solutions/${encodeURIComponent(item.slug)}`),
        locale,
        groupKey: `industry:${item.groupKey}`,
        priority: '0.7',
        lastmod: item.lastmod,
        robots: item.robots,
      });
    }
    for (const item of resources) {
      raw.push({
        path: localePath(locale, `/resources/${encodeURIComponent(item.slug)}`),
        locale,
        groupKey: `resource:${item.groupKey}`,
        priority: '0.6',
        lastmod: item.lastmod,
        robots: item.robots,
      });
    }
    for (const item of categories) {
      raw.push({
        path: localePath(locale, `/products/category/${encodeURIComponent(item.slug)}`),
        locale,
        groupKey: `productCategory:${item.groupKey}`,
        priority: '0.75',
        lastmod: item.lastmod,
        robots: item.robots,
      });
    }
  }

  return attachAlternates(raw, origin || '');
}

export function renderSitemapXml(entries: SitemapEntry[]) {
  const body = entries
    .map((item) => {
      const bits = [`<loc>${escapeXml(item.loc)}</loc>`];
      if (item.lastmod) bits.push(`<lastmod>${escapeXml(item.lastmod)}</lastmod>`);
      if (item.changefreq) bits.push(`<changefreq>${item.changefreq}</changefreq>`);
      if (item.priority) bits.push(`<priority>${item.priority}</priority>`);
      for (const alt of item.alternates || []) {
        bits.push(
          `<xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />`
        );
      }
      return `<url>${bits.join('')}</url>`;
    })
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${body}</urlset>\n`;
}

function escapeXml(value: string) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
