import { loadPageChrome } from '../chrome/load-chrome';
import { enrichProductDetail, getProduct } from '../../modules/product';
import { localePath, toErrorMessage } from '../../modules/cms';
import { t } from '../../modules/i18n';

export async function loadProductDetailPage(options: {
  locale?: string;
  pathname: string;
  id: string;
}) {
  const chrome = await loadPageChrome({
    locale: options.locale,
    pathname: options.pathname,
  });
  if (!chrome.localeValid || !chrome.site.modules.products) {
    return {
      ...chrome,
      enabled: false as const,
      product: null,
      error: undefined as string | undefined,
    };
  }

  try {
    let product = await getProduct(options.id, { locale: chrome.locale });
    if (product) {
      product = await enrichProductDetail(product, chrome.locale);
      product = {
        ...product,
        inquiryHref: localePath(chrome.locale, '/contact'),
        inquiryLabel: t(chrome.locale, 'contact'),
      };
    }
    return {
      ...chrome,
      enabled: true as const,
      product,
      error: undefined as string | undefined,
    };
  } catch (error) {
    return {
      ...chrome,
      enabled: true as const,
      product: null,
      error: toErrorMessage(error, t(chrome.locale, 'loadFailed')),
    };
  }
}
