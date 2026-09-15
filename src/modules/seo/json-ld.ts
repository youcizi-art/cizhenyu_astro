import type { PageSeo } from './types';
import { toAbsoluteUrl } from './urls';

export type JsonLdInput = {
  seo: PageSeo;
  pageUrl: string;
  siteName?: string;
  company?: {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    logoUrl?: string;
  };
  product?: {
    name?: string;
    description?: string;
    sku?: string;
    brand?: string;
    imageUrls?: string[];
  };
  article?: {
    headline?: string;
    description?: string;
    imageUrl?: string;
    author?: string;
  };
  faqs?: Array<{ question: string; answer: string }>;
};

function asSchemaType(raw: string) {
  const value = String(raw || '').trim();
  if (!value || value.toLowerCase() === 'none') return '';
  return value;
}

function organizationNode(input: JsonLdInput) {
  const company = input.company || {};
  const name = company.name || input.siteName || '';
  if (!name) return null;
  const node: Record<string, unknown> = {
    '@type': 'Organization',
    name,
  };
  if (company.website) node.url = company.website;
  if (company.logoUrl) node.logo = toAbsoluteUrl(company.logoUrl);
  if (company.email) node.email = company.email;
  if (company.phone) node.telephone = company.phone;
  if (company.address) {
    node.address = {
      '@type': 'PostalAddress',
      streetAddress: company.address,
    };
  }
  return node;
}

function withGeo(node: Record<string, unknown>, seo: PageSeo) {
  if (seo.geoLat && seo.geoLng) {
    node.geo = {
      '@type': 'GeoCoordinates',
      latitude: Number(seo.geoLat),
      longitude: Number(seo.geoLng),
    };
  }
  return node;
}

/** 按 schema_type 生成 JSON-LD；缺省时按可用数据兜底 WebPage */
export function buildJsonLd(input: JsonLdInput): Record<string, unknown> | null {
  const type = asSchemaType(input.seo.schemaType);
  const url = toAbsoluteUrl(input.pageUrl || input.seo.canonicalUrl);
  const org = organizationNode(input);

  if (type === 'Product' || (!type && input.product?.name)) {
    const product = input.product || {};
    const node: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name || input.seo.title,
      description: product.description || input.seo.description,
      url,
    };
    if (product.sku) node.sku = product.sku;
    if (product.brand) node.brand = { '@type': 'Brand', name: product.brand };
    if (product.imageUrls?.length) node.image = product.imageUrls.map((item) => toAbsoluteUrl(item));
    else if (input.seo.ogImage) node.image = toAbsoluteUrl(input.seo.ogImage);
    return node;
  }

  if (type === 'Article' || (!type && input.article?.headline)) {
    const article = input.article || {};
    const node: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.headline || input.seo.title,
      description: article.description || input.seo.description,
      url,
      mainEntityOfPage: url,
    };
    if (article.imageUrl || input.seo.ogImage) {
      node.image = toAbsoluteUrl(article.imageUrl || input.seo.ogImage);
    }
    if (article.author) node.author = { '@type': 'Person', name: article.author };
    if (org) node.publisher = org;
    return node;
  }

  if (type === 'FAQPage' || (!type && input.faqs?.length)) {
    const faqs = input.faqs || [];
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: String(item.answer || '').replace(/<[^>]+>/g, ' ').trim(),
        },
      })),
    };
  }

  if (type === 'Organization' && org) {
    return withGeo({ '@context': 'https://schema.org', ...org }, input.seo);
  }

  if (type === 'LocalBusiness') {
    const company = input.company || {};
    const node: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: company.name || input.siteName || input.seo.title,
      url,
    };
    if (company.phone) node.telephone = company.phone;
    if (company.email) node.email = company.email;
    if (company.address) {
      node.address = { '@type': 'PostalAddress', streetAddress: company.address };
    }
    if (input.seo.ogImage || company.logoUrl) {
      node.image = toAbsoluteUrl(input.seo.ogImage || company.logoUrl || '');
    }
    return withGeo(node, input.seo);
  }

  if (type === 'WebPage' || type === '' || type === 'WebSite') {
    const node: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': type === 'WebSite' ? 'WebSite' : 'WebPage',
      name: input.seo.title,
      description: input.seo.description,
      url,
    };
    if (org) node.isPartOf = org;
    return node;
  }

  return {
    '@context': 'https://schema.org',
    '@type': type || 'WebPage',
    name: input.seo.title,
    description: input.seo.description,
    url,
  };
}
