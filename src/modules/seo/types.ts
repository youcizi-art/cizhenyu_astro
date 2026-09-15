import { resolveMediaUrl } from '../media';

export type CmsSeoFields = {
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  robots: string;
  ogImage: string;
  schemaType: string;
  schemaMapping: string;
  geoLat: string;
  geoLng: string;
};

export type PageSeo = {
  title: string;
  description: string;
  /** 绝对或站内路径；布局层再绝对化 */
  canonicalUrl: string;
  robots: string;
  ogImage: string;
  ogType: string;
  schemaType: string;
  schemaMapping: string;
  geoLat: string;
  geoLng: string;
};

function mediaOrString(value: unknown): string {
  if (value == null || value === '') return '';
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return '';
    return resolveMediaUrl(trimmed) || trimmed;
  }
  return resolveMediaUrl(value);
}

/** 读取 CMS 实体 data 上的 SEO/GEO 字段包 */
export function readSeoFields(
  data: Record<string, unknown>,
  fallbackTitle = '',
  fallbackDescription = ''
): CmsSeoFields {
  return {
    seoTitle: String(data.seo_title || fallbackTitle || '').trim(),
    seoDescription: String(data.seo_description || fallbackDescription || '').trim(),
    canonicalUrl: String(data.canonical_url || '').trim(),
    robots: String(data.robots_directive || '').trim(),
    ogImage: mediaOrString(data.og_image),
    schemaType: String(data.schema_type || '').trim(),
    schemaMapping: typeof data.schema_mapping === 'string'
      ? data.schema_mapping.trim()
      : data.schema_mapping
        ? JSON.stringify(data.schema_mapping)
        : '',
    geoLat: String(data.geo_latitude ?? '').trim(),
    geoLng: String(data.geo_longitude ?? '').trim(),
  };
}

export function toPageSeo(
  fields: CmsSeoFields,
  options?: {
    pathname?: string;
    ogImageFallback?: string;
    schemaTypeDefault?: string;
    ogType?: string;
  }
): PageSeo {
  const pathname = String(options?.pathname || '').trim();
  return {
    title: fields.seoTitle,
    description: fields.seoDescription,
    canonicalUrl: fields.canonicalUrl || pathname,
    robots: fields.robots || 'index,follow',
    ogImage: fields.ogImage || String(options?.ogImageFallback || '').trim(),
    ogType: options?.ogType || 'website',
    schemaType: fields.schemaType || String(options?.schemaTypeDefault || '').trim(),
    schemaMapping: fields.schemaMapping,
    geoLat: fields.geoLat,
    geoLng: fields.geoLng,
  };
}
