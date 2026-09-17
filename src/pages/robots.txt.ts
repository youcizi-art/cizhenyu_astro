import type { APIRoute } from 'astro';
import { siteOrigin, toAbsoluteUrl } from '@/modules/seo';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const origin = siteOrigin() || url.origin;
  const sitemap = toAbsoluteUrl('/sitemap.xml', origin);
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
