import type { APIRoute } from 'astro';
import { pathsForCollections } from '@/modules/cache';
import { getLastPurge, purgeHtmlPaths } from '@/modules/cache/html-cache';
import { getSiteKey, loadSiteManifest } from '@/modules/site';
import { envSync, warmRuntimeEnv } from '@/modules/runtime/env';

export const prerender = false;

type Body = {
  secret?: string;
  siteKey?: string;
  collections?: string[];
  paths?: string[];
  purge?: string;
};

export const POST: APIRoute = async ({ request }) => {
  await warmRuntimeEnv();
  const site = loadSiteManifest();
  const expectedSecret = envSync('REVALIDATE_SECRET');
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

  const siteOrigin = envSync('PUBLIC_SITE_URL').replace(/\/$/, '');
  const purge = await purgeHtmlPaths({
    paths,
    locales: site.locales,
    siteOrigin,
  });

  return Response.json({
    ok: true,
    siteKey: getSiteKey(),
    paths: purge.paths,
    purged: {
      deleted: purge.deleted,
      mode: purge.mode,
      cloudflare: purge.cloudflare,
      at: purge.at,
    },
    msg: purge.deleted > 0 || purge.cloudflare?.ok
      ? 'revalidate purged'
      : 'revalidate accepted (no matching local entries; CDN purge depends on CF credentials)',
  });
};

/** 观测最近一次 purge（验收用） */
export const GET: APIRoute = async () => {
  const last = getLastPurge();
  return Response.json({
    ok: true,
    lastPurge: last,
  });
};
