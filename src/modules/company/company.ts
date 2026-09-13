import { fetchCollectionSingle, toErrorMessage, type CmsEntity } from '../cms';
import { resolveMediaUrl } from '../media';

export type CompanyInfo = CmsEntity;

export type CompanyView = {
  name: string;
  slogan: string;
  summary: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logoUrl: string;
};

export type CompanyLoadResult =
  | { ok: true; company: CompanyView; warning?: undefined }
  | { ok: false; company: CompanyView; warning: string };

export function toCompanyView(info: CompanyInfo | null, fallbackName: string): CompanyView {
  const data = info?.data || {};
  return {
    name: String(data.company_name || data.name || data.title || fallbackName),
    slogan: String(data.slogan || ''),
    summary: String(data.summary || ''),
    address: String(data.address || ''),
    phone: String(data.phone || ''),
    email: String(data.email || ''),
    website: String(data.website || ''),
    logoUrl: resolveMediaUrl(data.logo || data.footer_logo),
  };
}

export function companyDisplayName(info: CompanyInfo | null, fallback: string) {
  return toCompanyView(info, fallback).name;
}

/** 公司信息为可选 chrome：失败时返回 fallback + warning，不伪装成「正常空公司」无提示 */
export async function loadCompanyView(
  locale: string | undefined,
  fallbackName: string
): Promise<CompanyLoadResult> {
  const empty = toCompanyView(null, fallbackName);
  try {
    const info = await fetchCollectionSingle<CompanyInfo>(
      'companyInfo',
      locale ? { locale } : undefined
    );
    return { ok: true, company: toCompanyView(info, fallbackName) };
  } catch (error) {
    return {
      ok: false,
      company: empty,
      warning: toErrorMessage(error, '公司信息加载失败'),
    };
  }
}
