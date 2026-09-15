import { listEntities, entityData, isPublishedEntity, localePath } from '../cms';
import { loadSiteManifest } from '../site';
import { toAbsoluteUrl } from './urls';

export type SitemapEntry = {
  loc: string;
  changefreq?: string;
  priority?: string;
};

async function slugList(key: Parameters<typeof listEntities>[0], locale: string, slugField = 'slug') {
  try {
    const result = await listEntities(key, { locale, pageSize: 100, status: 'published' });
    return (result.list || [])
      .filter(isPublishedEntity)
      .map((row) => String(entityData(row)[slugField] || row.id).trim())
      .filter(Boolean);
  } catch {
    return [] as string[];
  }
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

  const push = (path: string, priority = '0.7') => {
    const loc = toAbsoluteUrl(path);
    if (!loc || seen.has(loc)) return;
    seen.add(loc);
    entries.push({ loc, changefreq: 'weekly', priority });
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

    for (const slug of products) push(localePath(locale, `/products/${encodeURIComponent(slug)}`));
    for (const slug of articles) push(localePath(locale, `/articles/${encodeURIComponent(slug)}`));
    for (const slug of cases) push(localePath(locale, `/case-studies/${encodeURIComponent(slug)}`));
    for (const slug of industries) push(localePath(locale, `/solutions/${encodeURIComponent(slug)}`));
    for (const slug of resources) push(localePath(locale, `/resources/${encodeURIComponent(slug)}`));
  }

  return entries;
}

export function renderSitemapXml(entries: SitemapEntry[]) {
  const body = entries
    .map((item) => {
      const bits = [`<loc>${escapeXml(item.loc)}</loc>`];
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
