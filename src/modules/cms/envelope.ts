export type PublicEnvelope<T> = {
  status: number;
  msg: string;
  data: T | null;
};

export type PublicPages = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type PublicListData<T> = {
  list: T[];
  pages: PublicPages;
  path?: string;
};

export function unwrapEnvelope<T>(body: PublicEnvelope<T>, fallbackMsg = 'CMS 请求失败'): T {
  if (!body || typeof body !== 'object') {
    throw new Error(fallbackMsg);
  }
  if (body.status >= 400 || body.data == null) {
    throw new Error(body.msg || fallbackMsg);
  }
  return body.data;
}
