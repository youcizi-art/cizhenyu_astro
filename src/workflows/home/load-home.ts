import { loadPageChrome } from '../chrome/load-chrome';
import { listProducts } from '../../modules/product';
import { listArticles } from '../../modules/article';
import { listCaseStudies } from '../../modules/case-study';
import { listSolutions } from '../../modules/industry';
import { listBlocksByPlacement } from '../../modules/content-block';

export async function loadHomePage(locale?: string) {
  const chrome = await loadPageChrome(locale);
  const { site, locale: currentLocale } = chrome;

  try {
    const [heroes, products, articles, cases, solutions] = await Promise.all([
      listBlocksByPlacement('home_hero', { locale: currentLocale, pageSize: 5 }).catch(() => []),
      site.modules.products
        ? listProducts({ locale: currentLocale, page: 1, pageSize: 6 })
        : Promise.resolve({ items: [], pages: { total: 0, page: 1, pageSize: 6, totalPages: 0 } }),
      site.modules.articles
        ? listArticles({ locale: currentLocale, page: 1, pageSize: 3 })
        : Promise.resolve({ items: [], pages: { total: 0, page: 1, pageSize: 3, totalPages: 0 } }),
      site.modules.caseStudies
        ? listCaseStudies({ locale: currentLocale, page: 1, pageSize: 3 })
        : Promise.resolve({ items: [], pages: { total: 0, page: 1, pageSize: 3, totalPages: 0 } }),
      site.modules.solutions
        ? listSolutions({ locale: currentLocale, page: 1, pageSize: 3 })
        : Promise.resolve({ items: [], pages: { total: 0, page: 1, pageSize: 3, totalPages: 0 } }),
    ]);

    const hero = heroes[0] || null;
    return {
      ...chrome,
      tagline: hero?.subtitle || chrome.company.slogan || String(site.brand?.tagline || ''),
      hero,
      products: products.items,
      articles: articles.items,
      caseStudies: cases.items,
      solutions: solutions.items,
      error: undefined as string | undefined,
    };
  } catch (error) {
    return {
      ...chrome,
      tagline: chrome.company.slogan || String(site.brand?.tagline || ''),
      hero: null,
      products: [],
      articles: [],
      caseStudies: [],
      solutions: [],
      error: error instanceof Error ? error.message : '加载失败',
    };
  }
}
