import { unwrapEnvelope, type PublicEnvelope, type PublicListData } from './envelope';
import { collectionDataPath, type CatalogKey } from './catalog';

export type CmsQuery = Record<string, string | number | undefined | null>;

function apiBase() {
  return String(import.meta.env.PUBLIC_CMS_API_BASE || '').replace(/\/$/, '');
}

function apiPrefix() {
  const raw = String(import.meta.env.PUBLIC_CMS_API_PREFIX || '/api/p').trim();
  return raw.startsWith('/') ? raw.replace(/\/$/, '') : `/${raw.replace(/\/$/, '')}`;
}

function buildUrl(resourcePath: string, query?: CmsQuery) {
  const base = apiBase();
  if (!base) {
    throw new Error('未配置 PUBLIC_CMS_API_BASE');
  }
  const url = new URL(`${apiPrefix()}/${resourcePath.replace(/^\//, '')}`, `${base}/`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === undefined || value === null || value === '') continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url;
}

async function cmsGetJson<T>(resourcePath: string, query?: CmsQuery): Promise<T> {
  const url = buildUrl(resourcePath, query);
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15_000),
  });
  const body = (await res.json().catch(() => null)) as PublicEnvelope<T> | null;
  if (!body) {
    throw new Error(`CMS 无效响应: ${res.status}`);
  }
  if (!res.ok) {
    throw new Error(body.msg || `CMS HTTP ${res.status}`);
  }
  return unwrapEnvelope(body);
}

export async function fetchCollectionList<T>(
  key: CatalogKey,
  query?: CmsQuery
): Promise<PublicListData<T>> {
  const dataPath = collectionDataPath(key);
  return cmsGetJson<PublicListData<T>>(`data/${dataPath}`, query);
}

export async function fetchCollectionById<T>(
  key: CatalogKey,
  id: string,
  query?: CmsQuery
): Promise<T> {
  const dataPath = collectionDataPath(key);
  return cmsGetJson<T>(`data/${dataPath}/${encodeURIComponent(id)}`, query);
}

export async function fetchCollectionSingle<T>(
  key: CatalogKey,
  query?: CmsQuery
): Promise<T> {
  const dataPath = collectionDataPath(key);
  return cmsGetJson<T>(`data/${dataPath}/single`, query);
}

export async function submitCollection(
  key: CatalogKey,
  payload: Record<string, unknown>
): Promise<unknown> {
  const dataPath = collectionDataPath(key);
  const url = buildUrl(`submit/${dataPath}`);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15_000),
  });
  const body = (await res.json().catch(() => null)) as PublicEnvelope<unknown> | null;
  if (!body) throw new Error(`CMS 提交无效响应: ${res.status}`);
  if (!res.ok) throw new Error(body.msg || `CMS HTTP ${res.status}`);
  return unwrapEnvelope(body, body.msg || '提交失败');
}

export async function fetchLanguages(): Promise<{ list: Array<Record<string, unknown>> }> {
  return cmsGetJson('languages');
}
