import type { APIRoute } from 'astro';

/**
 * ARD / legacy catalog 止损：不提供清单时返回真 404（空 body），
 * 避免 Cloudflare/未知路由回落首页 HTML 导致 Lighthouse Malformed JSON 扣分。
 * 需要 GEO 参赛时再改为合法 JSON。
 */
function absentCatalog(): Response {
  return new Response(null, {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      'CDN-Cache-Control': 'public, max-age=300',
      'X-Agent-Catalog': 'absent',
    },
  });
}

export const prerender = false;

export const GET: APIRoute = async () => absentCatalog();
