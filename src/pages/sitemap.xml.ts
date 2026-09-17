import type { APIRoute } from 'astro';
import { collectSitemapEntries, renderSitemapXml, siteOrigin } from '@/modules/seo';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const origin = siteOrigin() || url.origin;
  const entries = await collectSitemapEntries({ origin });
  return new Response(renderSitemapXml(entries), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
