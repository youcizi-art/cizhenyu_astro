import type { APIRoute } from 'astro';
import {
  normalizePurgePathInput,
  pathsForChromePurge,
  pathsForCollections,
} from '@/modules/cache';
import { getLastPurge, purgeHtmlPaths } from '@/modules/cache/html-cache';
import { getSiteKey, loadSiteManifest } from '@/modules/site';
import { envSync, warmRuntimeEnv } from '@/modules/runtime/env';
import { applyApiNoStoreHeaders } from '@/workflows/chrome/http';

export const prerender = false;

type Body = {
  secret?: string;
  siteKey?: string;
  collections?: string[];
  paths?: string[];
  /** all | chrome；chrome=导航/页脚相关入口 */
  purge?: string;
};

function jsonWithNoStore(data: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  applyApiNoStoreHeaders(headers);
  headers.set('Content-Type', 'application/json; charset=utf-8');
  return Response.json(data, { ...init, headers });
}

export const POST: APIRoute = async ({ request }) => {
  await warmRuntimeEnv();
  const site = loadSiteManifest();
  const expectedSecret = envSync('REVALIDATE_SECRET');
  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return jsonWithNoStore({ ok: false, msg: '无效 JSON' }, { status: 400 });
  }

  const secret = String(body.secret || '').trim();
  if (!expectedSecret || secret !== expectedSecret) {
    return jsonWithNoStore({ ok: false, msg: 'unauthorized' }, { status: 401 });
  }

  const siteKey = String(body.siteKey || '').trim();
  if (siteKey && siteKey !== getSiteKey()) {
    return jsonWithNoStore({ ok: false, msg: 'siteKey mismatch' }, { status: 403 });
  }

  const collections = Array.isArray(body.collections) ? body.collections.map(String) : [];
  const explicitPaths = (Array.isArray(body.paths) ? body.paths.map(String) : [])
    .map((p) => normalizePurgePathInput(p))
    .filter((p): p is string => Boolean(p));
  const mapped = pathsForCollections(collections, site.locales);
  const chromePaths =
    body.purge === 'chrome' ? pathsForChromePurge(site.locales) : [];

  let paths: string[];
  if (body.purge === 'all') {
    paths = ['/*'];
  } else {
    paths = [...new Set([...mapped, ...chromePaths, ...explicitPaths])];
  }

  if (!paths.length) {
    return jsonWithNoStore({
      ok: false,
      msg: '无有效失效路径：请传 collections、paths，或 purge=all|chrome',
    }, { status: 400 });
  }

  const siteOrigin = envSync('PUBLIC_SITE_URL').replace(/\/$/, '');
  const purge = await purgeHtmlPaths({
    paths,
    locales: site.locales,
    siteOrigin,
  });

  const cdnOk = Boolean(purge.cloudflare?.ok);
  const cdnSkipped = Boolean(purge.cloudflare?.skipped);
  return jsonWithNoStore({
    ok: true,
    siteKey: getSiteKey(),
    paths: purge.paths,
    purged: {
      deleted: purge.deleted,
      mode: purge.mode,
      cloudflare: purge.cloudflare,
      at: purge.at,
    },
    msg: cdnOk
      ? 'revalidate purged (edge + local)'
      : cdnSkipped
        ? 'revalidate accepted（本地已清；CDN purge 跳过：缺 CF_ZONE_ID/CF_API_TOKEN）'
        : purge.deleted > 0
          ? 'revalidate purged local cache; CDN purge failed — see cloudflare.detail'
          : 'revalidate accepted (no matching local entries; CDN purge depends on CF credentials)',
  });
};

/** 观测最近一次 purge（验收用） */
export const GET: APIRoute = async () => {
  const last = getLastPurge();
  return jsonWithNoStore({ ok: true, lastPurge: last });
};
