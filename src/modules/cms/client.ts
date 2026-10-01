import {
  getCmsApiBase,
  getCmsApiPrefix,
  getCmsServiceBindingName,
  getCmsTransport,
  getCloudflareEnv,
  getSiteKeyEnv,
} from '../runtime/env';
import { loadSiteManifest } from '../site/load-site';
import { CmsError } from './errors';
import { unwrapEnvelope, type PublicEnvelope, type PublicListData } from './envelope';
import { collectionDataPath, type CatalogKey } from './catalog';
import { buildRequestCacheKey, withRequestCache } from './request-cache';

async function collectionNamespace() {
  const fromEnv = (await getSiteKeyEnv()).trim();
  if (fromEnv) return fromEnv;
  return loadSiteManifest().cms.collectionNamespace || 'b2b';
}

export type CmsQuery = Record<string, string | number | undefined | null>;

type CmsFetcher = {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

type ErrorBody = PublicEnvelope<unknown> & { error?: string };

function cmsErrorMessage(body: ErrorBody | null, status: number) {
  if (!body || typeof body !== 'object') return `CMS HTTP ${status}`;
  const msg = String(body.msg || body.error || '').trim();
  return msg || `CMS HTTP ${status}`;
}

/** 解析 CMS 请求执行器：http 用全局 fetch；service 用 Cloudflare Service Binding */
async function resolveCmsFetcher(): Promise<CmsFetcher> {
  if ((await getCmsTransport()) !== 'service') {
    return { fetch: globalThis.fetch.bind(globalThis) };
  }
  try {
    const env = await getCloudflareEnv();
    const name = await getCmsServiceBindingName();
    const binding = env?.[name] as CmsFetcher | undefined;
    if (binding && typeof binding.fetch === 'function') {
      return binding;
    }
  } catch {
    // 非 CF 运行时回退
  }
  return { fetch: globalThis.fetch.bind(globalThis) };
}

async function cmsRequestHeaders(extra?: HeadersInit): Promise<Headers> {
  const headers = new Headers(extra);
  if (!headers.has('Accept')) headers.set('Accept', 'application/json');
  // 标记 Pages SSR，CMS 侧跳过防爬限流、隔离 IP 桶
  if ((await getCmsTransport()) === 'service') {
    headers.set('X-Cizhenyu-SSR', '1');
  }
  return headers;
}

export async function buildCmsUrl(resourcePath: string, query?: CmsQuery) {
  const base = await getCmsApiBase();
  if (!base) {
    throw new CmsError('未配置 PUBLIC_CMS_API_BASE（或 CMS_TRANSPORT=service）', {
      status: 500,
      code: 'config',
    });
  }
  const prefix = await getCmsApiPrefix();
  const url = new URL(`${prefix}/${resourcePath.replace(/^\//, '')}`, `${base}/`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === '') continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url;
}

async function cmsGetJson<T>(resourcePath: string, query?: CmsQuery): Promise<T> {
  const url = await buildCmsUrl(resourcePath, query);
  const cacheKey = buildRequestCacheKey(url.toString(), 'GET');

  return withRequestCache(cacheKey, async () => {
    const fetcher = await resolveCmsFetcher();
    let res: Response;
    try {
      res = await fetcher.fetch(url, {
        headers: await cmsRequestHeaders(),
        signal: AbortSignal.timeout(15_000),
      });
    } catch (cause) {
      throw new CmsError('无法连接 CMS，请检查 PUBLIC_CMS_API_BASE 或 Service Binding', {
        status: 503,
        code: 'network',
        cause,
      });
    }

    const body = (await res.json().catch(() => null)) as ErrorBody | null;
    if (!body || typeof body !== 'object') {
      throw new CmsError(`CMS 无效响应 (${res.status})`, { status: res.status, code: 'invalid' });
    }
    if (!res.ok || (typeof body.status === 'number' && body.status >= 400)) {
      throw new CmsError(cmsErrorMessage(body, res.status), {
        status: (typeof body.status === 'number' ? body.status : 0) || res.status,
        code: 'http',
      });
    }
    try {
      return unwrapEnvelope(body as PublicEnvelope<T>);
    } catch (cause) {
      throw new CmsError(cause instanceof Error ? cause.message : 'CMS 数据为空', {
        status: body.status || res.status,
        code: 'invalid',
        cause,
      });
    }
  });
}

export async function fetchCollectionList<T>(
  key: CatalogKey,
  query?: CmsQuery
): Promise<PublicListData<T>> {
  const dataPath = collectionDataPath(key, await collectionNamespace());
  return cmsGetJson<PublicListData<T>>(`data/${dataPath}`, query);
}

export async function fetchCollectionById<T>(
  key: CatalogKey,
  id: string,
  query?: CmsQuery
): Promise<T> {
  const dataPath = collectionDataPath(key, await collectionNamespace());
  return cmsGetJson<T>(`data/${dataPath}/${encodeURIComponent(id)}`, query);
}

export async function fetchCollectionSingle<T>(
  key: CatalogKey,
  query?: CmsQuery
): Promise<T> {
  const dataPath = collectionDataPath(key, await collectionNamespace());
  return cmsGetJson<T>(`data/${dataPath}/single`, query);
}

export async function submitCollection(
  key: CatalogKey,
  payload: Record<string, unknown>
): Promise<unknown> {
  const dataPath = collectionDataPath(key, await collectionNamespace());
  const url = await buildCmsUrl(`submit/${dataPath}`);
  const fetcher = await resolveCmsFetcher();
  let res: Response;
  try {
    res = await fetcher.fetch(url, {
      method: 'POST',
      headers: await cmsRequestHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15_000),
    });
  } catch (cause) {
    throw new CmsError('无法连接 CMS（提交失败）', { status: 503, code: 'network', cause });
  }
  const body = (await res.json().catch(() => null)) as ErrorBody | null;
  if (!body) throw new CmsError(`CMS 提交无效响应: ${res.status}`, { status: res.status, code: 'invalid' });
  if (!res.ok || (typeof body.status === 'number' && body.status >= 400)) {
    throw new CmsError(cmsErrorMessage(body, res.status), {
      status: (typeof body.status === 'number' ? body.status : 0) || res.status,
      code: 'http',
    });
  }
  return unwrapEnvelope(body as PublicEnvelope<unknown>, body.msg || '提交失败');
}

export async function fetchLanguages(): Promise<{ list: Array<Record<string, unknown>> }> {
  return cmsGetJson('languages');
}
