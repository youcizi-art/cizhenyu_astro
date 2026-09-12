import type { APIRoute } from 'astro';
import { pathsForCollections } from '@/modules/cache';
import { getSiteKey, loadSiteManifest } from '@/modules/site';

export const prerender = false;

type Body = {
  secret?: string;
  siteKey?: string;
  collections?: string[];
  paths?: string[];
  purge?: string;
};

export const POST: APIRoute = async ({ request }) => {
  const site = loadSiteManifest();
  const expectedSecret = String(import.meta.env.REVALIDATE_SECRET || '').trim();
  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ ok: false, msg: '无效 JSON' }, { status: 400 });
  }

  const secret = String(body.secret || '').trim();
  if (!expectedSecret || secret !== expectedSecret) {
    return Response.json({ ok: false, msg: 'unauthorized' }, { status: 401 });
  }

  const siteKey = String(body.siteKey || '').trim();
  if (siteKey && siteKey !== getSiteKey()) {
    return Response.json({ ok: false, msg: 'siteKey mismatch' }, { status: 403 });
  }

  const collections = Array.isArray(body.collections) ? body.collections.map(String) : [];
  const explicitPaths = Array.isArray(body.paths) ? body.paths.map(String) : [];
  const mapped = pathsForCollections(collections, site.locales);
  const paths = body.purge === 'all'
    ? ['/*']
    : [...new Set([...mapped, ...explicitPaths])];

  return Response.json({
    ok: true,
    siteKey: getSiteKey(),
    paths,
    msg: 'revalidate accepted',
  });
};
