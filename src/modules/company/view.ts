import type { CompanyInfo } from './company';

export type CompanyView = {
  name: string;
  slogan: string;
  summary: string;
  address: string;
  phone: string;
  email: string;
  website: string;
};

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
  };
}

export { getCompanyInfo, companyDisplayName, type CompanyInfo } from './company';
