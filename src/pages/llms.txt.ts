import type { APIRoute } from 'astro';
import { loadSiteManifest } from '@/modules/site';
import { loadLanguages } from '@/modules/i18n';
import { loadNavLinks } from '@/modules/nav';
import { loadCompanyView } from '@/modules/company';
import { siteOrigin, toAbsoluteUrl } from '@/modules/seo';
import { localePath } from '@/modules/cms';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const origin = siteOrigin() || url.origin;
  const site = loadSiteManifest();

  // 1. 动态获取后台 API 启用的语种，确定默认主语种（语种完全取决于后台，en 仅作为保底）
  const { languages } = await loadLanguages(site);
  const activeLangs = languages.filter((l) => l.status === 'active');
  const candidateLangs = activeLangs.length ? activeLangs : languages;
  const defaultLangObj = candidateLangs.find((l) => l.isDefault) || candidateLangs[0];
  const primaryLocale = defaultLangObj?.code || site.defaultLocale || 'en';

  // 2. 按后台主语种拉取公司/品牌信息与摘要
  const { company } = await loadCompanyView(primaryLocale, site.displayName || site.siteKey);
  const siteTitle = company.name || site.displayName || site.siteKey;
  const siteSummary =
    company.summary ||
    company.slogan ||
    site.brand?.tagline ||
    'Official website and corporate catalog.';

  // 3. 按后台主语种动态加载导航与模块页面（完全由后台 CMS 菜单及模块决定）
  const { links } = await loadNavLinks(site, primaryLocale);

  const homeUrl = toAbsoluteUrl(localePath(primaryLocale, '/', primaryLocale), origin);

  const lines: string[] = [
    `# ${siteTitle}`,
    '',
    `> ${siteSummary}`,
    '',
    '## Core Pages',
    `- [Home](${homeUrl}): Homepage and main portal for ${siteTitle}.`,
  ];

  // 避免输出重复 URL
  const seenHrefs = new Set<string>([homeUrl]);

  for (const link of links) {
    const linkUrl = toAbsoluteUrl(link.href, origin);
    if (!seenHrefs.has(linkUrl)) {
      seenHrefs.add(linkUrl);
      const label = link.label || 'Page';
      lines.push(`- [${label}](${linkUrl}): Overview and specifications for ${label}.`);
    }

    // 展开核心二级模块（若存在）
    if (link.children?.length) {
      for (const child of link.children) {
        const childUrl = toAbsoluteUrl(child.href, origin);
        if (!seenHrefs.has(childUrl)) {
          seenHrefs.add(childUrl);
          const childLabel = child.label || 'Subpage';
          const childDesc = child.summary ? `${child.summary}` : `Details and catalog for ${childLabel}.`;
          lines.push(`- [${childLabel}](${childUrl}): ${childDesc}`);
        }
      }
    }
  }

  // 4. 动态列出后台 API 支持的所有语种入口
  if (candidateLangs.length > 0) {
    lines.push('', '## Languages');
    for (const lang of candidateLangs) {
      const langUrl = toAbsoluteUrl(localePath(lang.code, '/', primaryLocale), origin);
      const isPrimary = lang.code === primaryLocale;
      lines.push(
        `- [${lang.name || lang.code} (${lang.code})](${langUrl}): ${
          isPrimary ? 'Primary language edition' : 'Localized language edition'
        }.`
      );
    }
  }

  // 5. 辅助与完整文档索引（Sitemap）
  lines.push('', '## Optional');
  lines.push(`- [Sitemap](${toAbsoluteUrl('/sitemap.xml', origin)}): XML sitemap containing all indexable pages across all supported languages.`);
  lines.push('');

  return new Response(lines.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
