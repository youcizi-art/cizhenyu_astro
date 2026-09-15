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
};

function readStatus(data: Record<string, unknown>) {
  return String(data.status || 'published').trim().toLowerCase();
}

export function isPublishedProduct(row: CmsEntity) {
  return isPublishedEntity(row);
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
  };
}
