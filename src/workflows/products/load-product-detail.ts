import { loadPageChrome } from '../chrome/load-chrome';
import { enrichProductDetail, getProduct } from '../../modules/product';
import { localePath, toErrorMessage } from '../../modules/cms';
import { t } from '../../modules/i18n';
import { resolveEntityLocaleAlternates, siteOrigin } from '../../modules/seo';

export async function loadProductDetailPage(options: {
  locale?: string;
  pathname: string;
  id: string;
  /** 用于 hreflang 绝对链；缺省用 PUBLIC_SITE_URL / 请求 origin 由页面再补 */
  origin?: string;
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
      alternates: [] as Array<{ href: string; hreflang: string }>,
      error: undefined as string | undefined,
    };
  }

  try {
    const raw = await getProduct(options.id, { locale: chrome.locale });
    if (!raw) {
      return {
        ...chrome,
        enabled: true as const,
        product: null,
        alternates: [],
        error: undefined as string | undefined,
      };
    }

    const origin = options.origin || siteOrigin() || undefined;
    // enrich 与 hreflang 无相互依赖：并行，缩短 MISS 串行深度
    const [product, alternates] = await Promise.all([
      enrichProductDetail(raw, chrome.locale).then((p) => ({
        ...p,
        inquiryHref: localePath(chrome.locale, '/contact'),
        inquiryLabel: t(chrome.locale, 'contact'),
      })),
      resolveEntityLocaleAlternates({
        catalogKey: 'product',
        languageGroupKey: raw.languageGroupKey,
        locales: chrome.languages.map((item) => item.code),
        defaultLocale: chrome.site.defaultLocale,
        currentLocale: chrome.locale,
        currentPath: options.pathname,
        pathForSlug: (locale, slug) =>
          localePath(locale, `/products/${encodeURIComponent(slug)}`),
        origin,
      }),
    ]);

    return {
      ...chrome,
      enabled: true as const,
      product,
      alternates,
      error: undefined as string | undefined,
    };
  } catch (error) {
    return {
      ...chrome,
      enabled: true as const,
      product: null,
      alternates: [],
      error: toErrorMessage(error, t(chrome.locale, 'loadFailed')),
    };
  }
}
