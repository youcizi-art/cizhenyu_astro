import type { APIRoute } from 'astro';
import { collectSitemapEntries, renderSitemapXml } from '@/modules/seo';

export const prerender = false;

export const GET: APIRoute = async () => {
  const entries = await collectSitemapEntries();
  return new Response(renderSitemapXml(entries), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
