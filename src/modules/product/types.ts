import { entityData, type CmsEntity } from '../cms';
import { isPublishedEntity, readSeoFields, readSpecEntries } from '../cms';
import { resolveMediaUrl, resolveMediaUrls } from '../media';
import { localePath } from '../cms';
import { toPageSeo, type PageSeo } from '../seo';

export type ProductRecord = CmsEntity;

export type ProductCard = {
  id: string;
  title: string;
  slug: string;
  sku: string;
  brand: string;
  summary: string;
  coverUrl: string;
  href: string;
  status: string;
};

export type ProductLinkCard = {
  id: string;
  title: string;
  href: string;
  summary?: string;
  coverUrl?: string;
};

export type ProductAdvantage = {
  title: string;
  description: string;
};

export type ProductCertification = {
  name: string;
  url?: string;
};

export type ProductFaqCard = {
  id: string;
  question: string;
  answer: string;
};

export type ProductDetail = ProductCard & {
  descriptionHtml: string;
  imageUrls: string[];
  price: string;
  currency: string;
  availability: string;
  seoTitle: string;
  seoDescription: string;
  seo: PageSeo;
  specs: Array<{ key: string; value: string }>;
  tagline: string;
  advantages: ProductAdvantage[];
  videoUrl: string;
  oemHtml: string;
  qualityHtml: string;
  certifications: ProductCertification[];
  industries: ProductLinkCard[];
  relatedProducts: ProductLinkCard[];
  relatedCases: ProductLinkCard[];
  faqs: ProductFaqCard[];
  /** raw relation ids for enrichment */
  industryIds: string[];
  relatedProductIds: string[];
  relatedCaseIds: string[];
  faqIds: string[];
  inquiryHref: string;
  inquiryLabel: string;
};

function readStatus(data: Record<string, unknown>) {
  return String(data.status || 'published').trim().toLowerCase();
}

export function isPublishedProduct(row: CmsEntity) {
  return isPublishedEntity(row);
}

export function asRelationIds(raw: unknown): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .map((item) => {
        if (typeof item === 'string' || typeof item === 'number') return String(item).trim();
        if (item && typeof item === 'object') {
          const obj = item as Record<string, unknown>;
          return String(obj.id || obj.value || obj.refId || '').trim();
        }
        return '';
      })
      .filter(Boolean);
  }
  if (typeof raw === 'string' && raw.trim()) return [raw.trim()];
  return [];
}

function asAdvantages(raw: unknown): ProductAdvantage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const obj = item as Record<string, unknown>;
      const title = String(obj.title || obj.name || '').trim();
      const description = String(obj.description || obj.summary || '').trim();
      if (!title) return null;
      return { title, description };
    })
    .filter(Boolean) as ProductAdvantage[];
}

function asCertifications(raw: unknown): ProductCertification[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (typeof item === 'string') {
        const name = item.trim();
        return name ? { name } : null;
      }
      if (!item || typeof item !== 'object') return null;
      const obj = item as Record<string, unknown>;
      const name = String(obj.name || obj.title || '').trim();
      if (!name) return null;
      return { name, url: String(obj.url || '').trim() || undefined };
    })
    .filter(Boolean) as ProductCertification[];
}

export function toProductCard(row: CmsEntity, locale?: string): ProductCard {
  const data = entityData(row);
  const slug = String(data.slug || data.url_slug || row.id || '').trim();
  const images = resolveMediaUrls(data.images);
  return {
    id: String(row.id),
    title: String(data.title || 'Untitled'),
    slug,
    sku: String(data.sku || ''),
    brand: String(data.brand || ''),
    summary: String(data.summary || ''),
    coverUrl: images[0] || resolveMediaUrl(data.cover),
    href: localePath(locale, `/products/${encodeURIComponent(slug || row.id)}`),
    status: readStatus(data),
  };
}

export function toProductDetail(row: CmsEntity, locale?: string): ProductDetail {
  const card = toProductCard(row, locale);
  const data = entityData(row);
  const imageUrls = resolveMediaUrls(data.images);
  if (card.coverUrl && !imageUrls.includes(card.coverUrl)) {
    imageUrls.unshift(card.coverUrl);
  }
  const priceRaw = data.price;
  const fields = readSeoFields(data, card.title, card.summary);
  const seo = toPageSeo(fields, {
    pathname: card.href,
    ogImageFallback: card.coverUrl,
    schemaTypeDefault: 'Product',
    ogType: 'product',
  });
  return {
    ...card,
    descriptionHtml: String(data.description || ''),
    imageUrls,
    price: priceRaw == null || priceRaw === '' ? '' : String(priceRaw),
    currency: String(data.price_currency || 'USD'),
    availability: String(data.availability || ''),
    seoTitle: seo.title || card.title,
    seoDescription: seo.description || card.summary,
    seo,
    specs: readSpecEntries(data.spec_data),
    tagline: String(data.tagline || '').trim(),
    advantages: asAdvantages(data.advantages),
    videoUrl: String(data.video_url || '').trim(),
    oemHtml: String(data.oem_content || ''),
    qualityHtml: String(data.quality_content || ''),
    certifications: asCertifications(data.certifications),
    industries: [],
    relatedProducts: [],
    relatedCases: [],
    faqs: [],
    industryIds: asRelationIds(data.industry_ids),
    relatedProductIds: asRelationIds(data.related_product_ids),
    relatedCaseIds: asRelationIds(data.related_case_ids),
    faqIds: asRelationIds(data.faq_ids),
    inquiryHref: '',
    inquiryLabel: '',
  };
}
