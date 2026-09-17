import { fetchCollectionSingle, toErrorMessage, entityData, type CmsEntity } from '../cms';
import { resolveMediaUrl } from '../media';

export type CompanyInfo = CmsEntity;

export type CompanyView = {
  name: string;
  slogan: string;
  summary: string;
  address: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  logoUrl: string;
  foundingDate: string;
  sameAs: string[];
  geoLat: string;
  geoLng: string;
};

export type CompanyLoadResult =
  | { ok: true; company: CompanyView; warning?: undefined }
  | { ok: false; company: CompanyView; warning: string };

export function toCompanyView(info: CompanyInfo | null, fallbackName: string): CompanyView {
  const data = info ? entityData(info) : {};
  const socialRaw = data.social_profiles;
  const sameAs: string[] = [];
  if (Array.isArray(socialRaw)) {
    for (const item of socialRaw) {
      if (typeof item === 'string' && item.trim()) sameAs.push(item.trim());
      else if (item && typeof item === 'object') {
        const url = String((item as { url?: unknown }).url || '').trim();
        if (url) sameAs.push(url);
      }
    }
  }
  const website = String(data.website || '').trim();
  if (website && !sameAs.includes(website)) sameAs.unshift(website);

  return {
    name: String(data.company_name || data.name || data.title || fallbackName),
    slogan: String(data.slogan || ''),
    summary: String(data.summary || ''),
    address: String(data.address || ''),
    country: String(data.country || ''),
    phone: String(data.phone || ''),
    email: String(data.email || ''),
    website,
    logoUrl: resolveMediaUrl(data.logo || data.footer_logo),
    foundingDate: String(data.founding_date || '').trim(),
    sameAs,
    geoLat: String(data.geo_latitude || '').trim(),
    geoLng: String(data.geo_longitude || '').trim(),
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
