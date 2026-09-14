import { loadPageChrome } from '../chrome/load-chrome';
import { listProducts } from '../../modules/product';
import { listArticles } from '../../modules/article';
import { listBlocksByPlacement } from '../../modules/content-block';
import { toErrorMessage } from '../../modules/cms';
import { t } from '../../modules/i18n';
import type { ResolvedReferenceCard } from '../../modules/reference';

export async function loadHomePage(options: { locale?: string; pathname: string }) {
  const chrome = await loadPageChrome({
    locale: options.locale,
    pathname: options.pathname,
  });
  if (!chrome.localeValid) {
    return {
      ...chrome,
      tagline: '',
      hero: null,
      featuredRefs: [] as ResolvedReferenceCard[],
      products: [],
      articles: [],
      companyIntro: chrome.company.summary,
      labels: {
        products: t(chrome.locale, 'products'),
        articles: t(chrome.locale, 'articles'),
        about: t(chrome.locale, 'about'),
        featured: '推荐',
        emptyProducts: t(chrome.locale, 'emptyProducts'),
      },
      error: undefined as string | undefined,
    };
  }

  const { site, locale: currentLocale } = chrome;
  const warnings = [...chrome.warnings];

  try {
    const [heroes, featuredBlocks, products, articles] = await Promise.all([
      listBlocksByPlacement('home_hero', { locale: currentLocale, pageSize: 5 }).catch((error) => {
        warnings.push(toErrorMessage(error, '首页区块加载失败'));
        return [];
      }),
      listBlocksByPlacement('home_featured', { locale: currentLocale, pageSize: 5 }).catch(() => []),
      site.modules.products
        ? listProducts({ locale: currentLocale, page: 1, pageSize: 6 })
        : Promise.resolve({ items: [], pages: { total: 0, page: 1, pageSize: 6, totalPages: 0 } }),
      site.modules.articles
        ? listArticles({ locale: currentLocale, page: 1, pageSize: 3 }).catch((error) => {
          warnings.push(toErrorMessage(error, '文章加载失败'));
          return { items: [], pages: { total: 0, page: 1, pageSize: 3, totalPages: 0 } };
        })
        : Promise.resolve({ items: [], pages: { total: 0, page: 1, pageSize: 3, totalPages: 0 } }),
    ]);

    const hero = heroes[0] || null;
    const featuredRefs = [
      ...(hero?.references || []),
      ...featuredBlocks.flatMap((block) => block.references || []),
    ];

    return {
      ...chrome,
      warnings,
      tagline: hero?.subtitle || chrome.company.slogan || String(site.brand?.tagline || ''),
      hero,
      featuredRefs,
      products: products.items,
      articles: articles.items,
      companyIntro: chrome.company.summary,
      labels: {
        products: t(currentLocale, 'products'),
        articles: t(currentLocale, 'articles'),
        about: t(currentLocale, 'about'),
        featured: currentLocale.startsWith('zh')
          ? '推荐内容'
          : currentLocale === 'ja'
            ? 'おすすめ'
            : 'Featured',
        emptyProducts: t(currentLocale, 'emptyProducts'),
      },
      error: undefined as string | undefined,
    };
  } catch (error) {
    return {
      ...chrome,
      warnings,
      tagline: chrome.company.slogan || String(site.brand?.tagline || ''),
      hero: null,
      featuredRefs: [] as ResolvedReferenceCard[],
      products: [],
      articles: [],
      companyIntro: chrome.company.summary,
      labels: {
        products: t(currentLocale, 'products'),
        articles: t(currentLocale, 'articles'),
        about: t(currentLocale, 'about'),
        featured: 'Featured',
        emptyProducts: t(currentLocale, 'emptyProducts'),
      },
      error: toErrorMessage(error, t(currentLocale, 'loadFailed')),
    };
  }
}
