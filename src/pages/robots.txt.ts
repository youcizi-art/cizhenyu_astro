import type { APIRoute } from 'astro';
import { siteOrigin, toAbsoluteUrl } from '@/modules/seo';

export const prerender = false;

export const GET: APIRoute = async () => {
  const origin = siteOrigin() || 'http://localhost:4321';
  const sitemap = toAbsoluteUrl('/sitemap.xml') || `${origin}/sitemap.xml`;
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
