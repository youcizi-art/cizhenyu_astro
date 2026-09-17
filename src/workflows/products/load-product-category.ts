import { loadPageChrome } from '../chrome/load-chrome';
import { getProductCategory } from '../../modules/product-category';
import { listProductsByCategoryId } from '../../modules/product';
import { toErrorMessage } from '../../modules/cms';
import { t } from '../../modules/i18n';

export async function loadProductCategoryPage(options: {
  locale?: string;
  pathname: string;
  slug: string;
  page?: number;
}) {
  const chrome = await loadPageChrome({
    locale: options.locale,
    pathname: options.pathname,
  });
  if (!chrome.localeValid || !chrome.site.modules.products) {
    return {
      ...chrome,
      enabled: false as const,
      category: null,
      items: [],
      pages: { total: 0, page: 1, pageSize: 12, totalPages: 0 },
      error: undefined as string | undefined,
    };
  }

  const page = Math.max(1, Number(options.page || 1) || 1);
  try {
    const category = await getProductCategory(options.slug, { locale: chrome.locale });
    if (!category) {
      return {
        ...chrome,
        enabled: true as const,
        category: null,
        items: [],
        pages: { total: 0, page, pageSize: 12, totalPages: 0 },
        error: undefined as string | undefined,
      };
    }
    const result = await listProductsByCategoryId(category.id, {
      locale: chrome.locale,
      page,
      pageSize: 12,
    });
    return {
      ...chrome,
      enabled: true as const,
      category,
      items: result.items,
      pages: result.pages,
      error: undefined as string | undefined,
    };
  } catch (error) {
    return {
      ...chrome,
      enabled: true as const,
      category: null,
      items: [],
      pages: { total: 0, page, pageSize: 12, totalPages: 0 },
      error: toErrorMessage(error, t(chrome.locale, 'loadFailed')),
    };
  }
}
