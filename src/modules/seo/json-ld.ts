import type { PageSeo } from './types';
import { toAbsoluteUrl } from './urls';

export type JsonLdBreadcrumb = { name: string; href?: string };

export type JsonLdInput = {
  seo: PageSeo;
  pageUrl: string;
  siteName?: string;
  breadcrumbs?: JsonLdBreadcrumb[];
  company?: {
    name?: string;
    address?: string;
    country?: string;
    phone?: string;
    email?: string;
    website?: string;
    logoUrl?: string;
    foundingDate?: string;
    sameAs?: string[];
  };
  product?: {
    name?: string;
    description?: string;
    sku?: string;
    brand?: string;
    imageUrls?: string[];
    specs?: Array<{ key: string; value: string }>;
    price?: string;
    currency?: string;
    availability?: string;
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

function applySchemaMapping(node: Record<string, unknown>, mapping: string) {
  if (!mapping) return node;
  try {
    const parsed = JSON.parse(mapping) as Record<string, unknown>;
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value !== 'string') continue;
      // Only allow plain string overrides (templates already resolved by CMS)
      if (!value.includes('${') && value.trim()) node[key] = value;
    }
  } catch {
    /* ignore invalid mapping */
  }
  return node;
}

function organizationNode(input: JsonLdInput) {
  const company = input.company || {};
  const name = company.name || input.siteName || '';
  if (!name) return null;
  const node: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': company.website ? `${toAbsoluteUrl(company.website)}#organization` : undefined,
    name,
  };
  if (company.website) node.url = company.website;
  if (company.logoUrl) node.logo = toAbsoluteUrl(company.logoUrl);
  if (company.email) node.email = company.email;
  if (company.phone) node.telephone = company.phone;
  if (company.foundingDate) node.foundingDate = company.foundingDate;
  if (company.sameAs?.length) node.sameAs = company.sameAs;
  if (company.address || company.country) {
    node.address = {
      '@type': 'PostalAddress',
      streetAddress: company.address || undefined,
      addressCountry: company.country || undefined,
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

function breadcrumbNode(crumbs: JsonLdBreadcrumb[] | undefined, pageUrl: string) {
  if (!crumbs?.length) return null;
  const elements = crumbs
    .map((crumb, index) => {
      const item: Record<string, unknown> = {
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
      };
      const href = crumb.href || (index === crumbs.length - 1 ? pageUrl : '');
      if (href) item.item = toAbsoluteUrl(href);
      return item;
    })
    .filter((item) => item.name);
  if (!elements.length) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: elements,
  };
}

function buildPrimaryEntity(input: JsonLdInput): Record<string, unknown> | null {
  const type = asSchemaType(input.seo.schemaType);
  const url = toAbsoluteUrl(input.pageUrl || input.seo.canonicalUrl);
  const org = organizationNode(input);

  if (type === 'Product' || (!type && input.product?.name)) {
    const product = input.product || {};
    const node: Record<string, unknown> = {
      '@type': 'Product',
      name: product.name || input.seo.title,
      description: product.description || input.seo.description,
      url,
    };
    if (product.sku) node.sku = product.sku;
    if (product.brand) node.brand = { '@type': 'Brand', name: product.brand };
    if (product.imageUrls?.length) node.image = product.imageUrls.map((item) => toAbsoluteUrl(item));
    else if (input.seo.ogImage) node.image = toAbsoluteUrl(input.seo.ogImage);
    if (product.specs?.length) {
      node.additionalProperty = product.specs.map((row) => ({
        '@type': 'PropertyValue',
        name: row.key,
        value: row.value,
      }));
    }
    if (product.price) {
      const offer: Record<string, unknown> = {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: product.currency || 'USD',
        url,
      };
      if (product.availability) {
        const avail = product.availability.trim();
        offer.availability = avail.startsWith('http')
          ? avail
          : `https://schema.org/${avail.replace(/\s+/g, '')}`;
      }
      node.offers = offer;
    }
    if (org) node.manufacturer = { '@id': org['@id'] || undefined, '@type': 'Organization', name: org.name };
    return applySchemaMapping(node, input.seo.schemaMapping);
  }

  if (type === 'Article' || (!type && input.article?.headline)) {
    const article = input.article || {};
    const node: Record<string, unknown> = {
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
    return applySchemaMapping(node, input.seo.schemaMapping);
  }

  if (type === 'FAQPage' || (!type && input.faqs?.length)) {
    const faqs = input.faqs || [];
    return {
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
    return withGeo({ ...org }, input.seo);
  }

  if (type === 'LocalBusiness') {
    const company = input.company || {};
    const node: Record<string, unknown> = {
      '@type': 'LocalBusiness',
      name: company.name || input.siteName || input.seo.title,
      url,
    };
    if (company.phone) node.telephone = company.phone;
    if (company.email) node.email = company.email;
    if (company.address || company.country) {
      node.address = {
        '@type': 'PostalAddress',
        streetAddress: company.address || undefined,
        addressCountry: company.country || undefined,
      };
    }
    if (input.seo.ogImage || company.logoUrl) {
      node.image = toAbsoluteUrl(input.seo.ogImage || company.logoUrl || '');
    }
    if (company.sameAs?.length) node.sameAs = company.sameAs;
    return withGeo(node, input.seo);
  }

  if (type === 'WebPage' || type === '' || type === 'WebSite') {
    const node: Record<string, unknown> = {
      '@type': type === 'WebSite' ? 'WebSite' : 'WebPage',
      name: input.seo.title,
      description: input.seo.description,
      url,
    };
    if (org) node.isPartOf = org['@id'] ? { '@id': org['@id'] } : org;
    return node;
  }

  return {
    '@type': type || 'WebPage',
    name: input.seo.title,
    description: input.seo.description,
    url,
  };
}

/** 按 schema_type 生成 JSON-LD；优先 @graph（主实体 + Org + Breadcrumb + 可选 FAQ） */
export function buildJsonLd(input: JsonLdInput): Record<string, unknown> | null {
  const primary = buildPrimaryEntity(input);
  if (!primary) return null;

  const graph: Record<string, unknown>[] = [];
  const org = organizationNode(input);
  const crumbs = breadcrumbNode(input.breadcrumbs, input.pageUrl || input.seo.canonicalUrl);

  // Avoid duplicating Organization when primary is already Organization
  if (org && primary['@type'] !== 'Organization') {
    graph.push(org);
  }
  graph.push(primary);

  // Product (or other) pages may also expose FAQPage in the same graph
  if (primary['@type'] !== 'FAQPage' && input.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: input.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: String(item.answer || '').replace(/<[^>]+>/g, ' ').trim(),
        },
      })),
    });
  }

  if (crumbs) graph.push(crumbs);

  if (graph.length === 1) {
    return { '@context': 'https://schema.org', ...graph[0] };
  }
  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
