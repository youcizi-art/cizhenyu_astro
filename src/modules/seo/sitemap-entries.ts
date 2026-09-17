import { listEntities, entityData, isPublishedEntity, localePath } from '../cms';
import { loadSiteManifest } from '../site';
import { toAbsoluteUrl } from './urls';

export type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
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

async function slugList(key: Parameters<typeof listEntities>[0], locale: string, slugField = 'slug') {
  const out: Array<{ slug: string; lastmod?: string }> = [];
  let page = 1;
  const pageSize = 100;
  for (;;) {
    try {
      const result = await listEntities(key, { locale, pageSize, page, status: 'published' });
      const list = (result.list || []).filter(isPublishedEntity);
      for (const row of list) {
        const slug = String(entityData(row)[slugField] || row.id).trim();
        if (!slug) continue;
        out.push({ slug, lastmod: entityLastmod(row as any) || undefined });
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

/** 汇总站内公开 URL（多语种），供 /sitemap.xml 使用 */
export async function collectSitemapEntries(): Promise<SitemapEntry[]> {
  const site = loadSiteManifest();
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
  ];

  const entries: SitemapEntry[] = [];
  const seen = new Set<string>();

  const push = (path: string, priority = '0.7', lastmod?: string) => {
    const loc = toAbsoluteUrl(path);
    if (!loc || seen.has(loc)) return;
    seen.add(loc);
    entries.push({
      loc,
      changefreq: 'weekly',
      priority,
      ...(lastmod ? { lastmod } : {}),
    });
  };

  for (const locale of locales) {
    for (const path of staticPaths) {
      push(localePath(locale, path), path === '/' ? '1.0' : '0.8');
    }

    const [products, articles, cases, industries, resources] = await Promise.all([
      slugList('product', locale),
      slugList('article', locale),
      slugList('caseStudy', locale),
      slugList('industry', locale),
      slugList('resource', locale),
    ]);

    for (const item of products) {
      push(localePath(locale, `/products/${encodeURIComponent(item.slug)}`), '0.7', item.lastmod);
    }
    for (const item of articles) {
      push(localePath(locale, `/articles/${encodeURIComponent(item.slug)}`), '0.7', item.lastmod);
    }
    for (const item of cases) {
      push(localePath(locale, `/case-studies/${encodeURIComponent(item.slug)}`), '0.7', item.lastmod);
    }
    for (const item of industries) {
      push(localePath(locale, `/solutions/${encodeURIComponent(item.slug)}`), '0.7', item.lastmod);
    }
    for (const item of resources) {
      push(localePath(locale, `/resources/${encodeURIComponent(item.slug)}`), '0.6', item.lastmod);
    }
  }

  return entries;
}

export function renderSitemapXml(entries: SitemapEntry[]) {
  const body = entries
    .map((item) => {
      const bits = [`<loc>${escapeXml(item.loc)}</loc>`];
      if (item.lastmod) bits.push(`<lastmod>${escapeXml(item.lastmod)}</lastmod>`);
      if (item.changefreq) bits.push(`<changefreq>${item.changefreq}</changefreq>`);
      if (item.priority) bits.push(`<priority>${item.priority}</priority>`);
      return `<url>${bits.join('')}</url>`;
    })
    .join('');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>\n`;
}

function escapeXml(value: string) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
