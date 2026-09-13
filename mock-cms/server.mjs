/**
 * 本地 Mock CMS：契约对齐 cizhenyu_payload 公开 API `/api/p`。
 * 真实联调：把 PUBLIC_CMS_API_BASE 改成后端地址即可。
 */
import http from 'node:http';
import { collections, languages, listKnownPaths } from './seed.mjs';

const PORT = Number(process.env.MOCK_CMS_PORT || 8787) || 8787;
const PREFIXES = ['/api/p', '/v1/p'];

function ok(data, msg = 'ok') {
  return { status: 200, msg, data };
}

function fail(status, msg) {
  return { status, msg, data: null };
}

function send(res, status, body) {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Accept',
  });
  res.end(json);
}

function parseUrl(reqUrl) {
  return new URL(reqUrl || '/', 'http://127.0.0.1');
}

function stripPrefix(pathname) {
  for (const prefix of PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return pathname.slice(prefix.length).replace(/^\//, '');
    }
  }
  return null;
}

const RESERVED = new Set([
  'page',
  'pageSize',
  'limit',
  'search',
  'locale',
  'translationGroup',
  'languageGroupKey',
  'language_group_key',
  'include',
]);

function isPublished(row) {
  const status = String(row?.data?.status || '').trim().toLowerCase();
  return !status || status === 'published';
}

function matchFilters(row, params) {
  for (const [key, value] of params.entries()) {
    if (RESERVED.has(key)) continue;
    if (key.endsWith('_like')) {
      const field = key.slice(0, -5);
      const hay = String(row.data?.[field] ?? '');
      if (!hay.toLowerCase().includes(String(value).toLowerCase())) return false;
      continue;
    }
    const expected = String(value);
    const actual = String(row.data?.[key] ?? '');
    const options = expected.split(',').map((item) => item.trim()).filter(Boolean);
    if (options.length > 1) {
      if (!options.includes(actual)) return false;
    } else if (actual !== expected) {
      return false;
    }
  }
  return true;
}

function filterRows(path, params) {
  const rows = collections[path];
  if (!rows) return null;

  let list = rows.filter(isPublished);

  const locale = params.get('locale');
  if (locale && locale !== 'all') {
    list = list.filter((row) => String(row.locale || '') === locale);
  }

  const group =
    params.get('translationGroup')
    || params.get('languageGroupKey')
    || params.get('language_group_key');
  if (group) {
    list = list.filter((row) => String(row.language_group_key || '') === group);
  }

  const search = params.get('search');
  if (search) {
    const q = search.toLowerCase();
    list = list.filter((row) => JSON.stringify(row.data || {}).toLowerCase().includes(q));
  }

  list = list.filter((row) => matchFilters(row, params));
  return list;
}

function paginate(list, params, path) {
  const page = Math.max(1, Number(params.get('page') || 1) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(params.get('pageSize') || params.get('limit') || 20) || 20));
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);
  const start = (page - 1) * pageSize;
  return {
    list: list.slice(start, start + pageSize),
    pages: { total, page, pageSize, totalPages },
    path,
  };
}

function parseDataPath(rest) {
  // data/{path} | data/{path}/single | data/{path}/{uuid}
  if (!rest.startsWith('data/')) return null;
  const raw = rest.slice('data/'.length);
  const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const parts = raw.split('/').filter(Boolean);
  if (!parts.length) return null;

  if (parts[parts.length - 1] === 'single') {
    return { path: parts.slice(0, -1).join('/'), mode: 'single' };
  }
  if (parts.length >= 2 && uuidRe.test(parts[parts.length - 1])) {
    return {
      path: parts.slice(0, -1).join('/'),
      mode: 'detail',
      id: parts[parts.length - 1],
    };
  }
  return { path: parts.join('/'), mode: 'list' };
}

function handleGet(pathname, params) {
  if (pathname === 'languages') {
    return { http: 200, body: ok(languages) };
  }

  if (pathname === 'translations') {
    return {
      http: 200,
      body: ok({ locale: params.get('locale') || 'en', translations: {} }),
    };
  }

  const parsed = parseDataPath(pathname);
  if (!parsed) {
    return { http: 404, body: fail(404, 'not found') };
  }

  const filtered = filterRows(parsed.path, params);
  if (!filtered) {
    return {
      http: 404,
      body: fail(404, `未知集合路径: ${parsed.path}（已知: ${listKnownPaths().join(', ')}）`),
    };
  }

  if (parsed.mode === 'list') {
    return { http: 200, body: ok(paginate(filtered, params, parsed.path)) };
  }

  if (parsed.mode === 'single') {
    const hit = filtered[0] || null;
    if (!hit) return { http: 404, body: fail(404, '未找到记录') };
    return { http: 200, body: ok({ ...hit, path: parsed.path }) };
  }

  if (parsed.mode === 'detail') {
    const all = collections[parsed.path] || [];
    const hit = all.find((row) => row.id === parsed.id);
    if (!hit || !isPublished(hit)) return { http: 404, body: fail(404, '未找到记录') };
    const locale = params.get('locale');
    if (locale && locale !== 'all' && String(hit.locale || '') !== locale) {
      return { http: 404, body: fail(404, '未找到记录') };
    }
    return { http: 200, body: ok({ ...hit, path: parsed.path }) };
  }

  return { http: 404, body: fail(404, 'not found') };
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    send(res, 204, ok(null));
    return;
  }

  const url = parseUrl(req.url);
  const rest = stripPrefix(url.pathname);
  if (rest == null) {
    send(res, 404, fail(404, 'Mock CMS only serves /api/p and /v1/p'));
    return;
  }

  if (req.method === 'GET') {
    const result = handleGet(rest, url.searchParams);
    send(res, result.http, result.body);
    return;
  }

  if (req.method === 'POST' && rest.startsWith('submit/')) {
    send(res, 200, ok({ id: '00000000-0000-4000-8000-000000000001', accepted: true }, '已提交'));
    return;
  }

  send(res, 405, fail(405, 'method not allowed'));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[mock-cms] http://127.0.0.1:${PORT}/api/p`);
  console.log(`[mock-cms] languages: ${languages.list.map((item) => item.code).join(', ')}`);
  console.log(`[mock-cms] collections: ${listKnownPaths().length}`);
});
