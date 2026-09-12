export type ProductRecord = {
  id: string;
  locale?: string | null;
  data?: {
    title?: string;
    slug?: string;
    sku?: string;
    summary?: string;
    cover?: unknown;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export type ProductCard = {
  id: string;
  title: string;
  slug: string;
  sku: string;
  summary: string;
  href: string;
};

export function toProductCard(row: ProductRecord, locale?: string): ProductCard {
  const data = row.data || {};
  const slug = String(data.slug || row.id || '').trim();
  const localePrefix = locale ? `/${locale}` : '';
  return {
    id: String(row.id),
    title: String(data.title || 'Untitled'),
    slug,
    sku: String(data.sku || ''),
    summary: String(data.summary || data.excerpt || ''),
    href: `${localePrefix}/products/${encodeURIComponent(slug || row.id)}`,
  };
}
