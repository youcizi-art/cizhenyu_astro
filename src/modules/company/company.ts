import { fetchCollectionSingle } from '../cms';

export type CompanyInfo = {
  id?: string;
  data?: Record<string, unknown>;
  [key: string]: unknown;
};

export async function getCompanyInfo(locale?: string): Promise<CompanyInfo | null> {
  try {
    return await fetchCollectionSingle<CompanyInfo>('companyInfo', locale ? { locale } : undefined);
  } catch {
    return null;
  }
}

export function companyDisplayName(info: CompanyInfo | null, fallback: string) {
  const data = info?.data || {};
  return String(data.name || data.company_name || data.title || fallback);
}
