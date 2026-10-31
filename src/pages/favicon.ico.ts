import type { APIRoute } from 'astro';
import { loadSiteManifest } from '@/modules/site';
import { getThemeMeta, resolveTheme } from '@/ui/themes';

/**
 * 浏览器默认探测 `/favicon.ico`。
 * 多主题仓库不使用全局 public/favicon.ico；按当前站点主题跳到主题 assets 产物。
 * 单主题 pack 时仍会额外拷贝到 public/favicon.ico，边缘可直接静态命中。
 */
export const GET: APIRoute = async ({ url }) => {
  const site = loadSiteManifest();
  const { themeId } = resolveTheme({
    theme: site.theme,
    primaryColor: site.brand?.primaryColor,
  });
  const href = getThemeMeta(themeId).faviconHref;
  if (!href) {
    return new Response(null, { status: 404 });
  }
  const target = href.startsWith('http') || href.startsWith('//') ? href : new URL(href, url.origin).href;
  return Response.redirect(target, 302);
};
