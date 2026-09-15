import { loadPageChrome } from '../chrome/load-chrome';
import { listProducts } from '../../modules/product';
import { listArticles } from '../../modules/article';
import { listCaseStudies } from '../../modules/case-study';
import { listBlocksByPlacement } from '../../modules/content-block';
import { localePath, toErrorMessage } from '../../modules/cms';
import { t } from '../../modules/i18n';
import type { ResolvedReferenceCard } from '../../modules/reference';
import type { ContentBlock } from '../../modules/content-block';
import type { CaseStudyCard } from '../../modules/case-study';

const TURMILL_HERO_FALLBACK =
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1400&h=700&q=80';

function homeLabels(locale: string) {
  const zh = locale.startsWith('zh');
  return {
    products: t(locale, 'products'),
    articles: t(locale, 'articles'),
    about: t(locale, 'about'),
    cases: t(locale, 'caseStudies'),
    featured: zh ? '推荐内容' : locale === 'ja' ? 'おすすめ' : 'Featured',
    emptyProducts: t(locale, 'emptyProducts'),
    readMore: zh ? '了解更多' : locale === 'ja' ? '詳しく見る' : 'Learn More',
    aboutCta: t(locale, 'contact'),
  };
}

function homePaths(locale: string) {
  return {
    home: localePath(locale, '/'),
    about: localePath(locale, '/about'),
    contact: localePath(locale, '/contact'),
    products: localePath(locale, '/products'),
  };
}

export async function loadHomePage(options: { locale?: string; pathname: string }) {
  const chrome = await loadPageChrome({
    locale: options.locale,
    pathname: options.pathname,
  });
  const labels = homeLabels(chrome.locale);
  const paths = homePaths(chrome.locale);

  if (!chrome.localeValid) {
    return {
      ...chrome,
      tagline: '',
      hero: null as ContentBlock | null,
      heroImageUrl: '',
      featuredRefs: [] as ResolvedReferenceCard[],
      products: [],
      caseStudies: [] as CaseStudyCard[],
      articles: [],
      ctaBanner: null as ContentBlock | null,
      companyIntro: chrome.company.summary,
      paths,
      labels,
      error: undefined as string | undefined,
    };
  }

  const { site, locale: currentLocale } = chrome;
  const warnings = [...chrome.warnings];

  try {
    const [heroes, featuredBlocks, ctaBlocks, products, articles, caseStudies] = await Promise.all([
      listBlocksByPlacement('home_hero', { locale: currentLocale, pageSize: 5 }).catch((error) => {
        warnings.push(toErrorMessage(error, '首页区块加载失败'));
        return [];
      }),
      listBlocksByPlacement('home_featured', { locale: currentLocale, pageSize: 5 }).catch(() => []),
      listBlocksByPlacement('footer_cta', { locale: currentLocale, pageSize: 3 }).catch(() => []),
      site.modules.products
        ? listProducts({ locale: currentLocale, page: 1, pageSize: 6 })
        : Promise.resolve({ items: [], pages: { total: 0, page: 1, pageSize: 6, totalPages: 0 } }),
      site.modules.articles
        ? listArticles({ locale: currentLocale, page: 1, pageSize: 3 }).catch((error) => {
          warnings.push(toErrorMessage(error, '文章加载失败'));
          return { items: [], pages: { total: 0, page: 1, pageSize: 3, totalPages: 0 } };
        })
        : Promise.resolve({ items: [], pages: { total: 0, page: 1, pageSize: 3, totalPages: 0 } }),
      site.modules.caseStudies
        ? listCaseStudies({ locale: currentLocale, page: 1, pageSize: 3 }).catch(() => ({
          items: [],
          pages: { total: 0, page: 1, pageSize: 3, totalPages: 0 },
        }))
        : Promise.resolve({ items: [], pages: { total: 0, page: 1, pageSize: 3, totalPages: 0 } }),
    ]);

    const hero = heroes[0] || null;
    const featuredRefs = [
      ...(hero?.references || []),
      ...featuredBlocks.flatMap((block) => block.references || []),
    ];
    const heroImageUrl =
      hero?.imageUrl ||
      (site.theme === 'turmill' ? TURMILL_HERO_FALLBACK : '');

    return {
      ...chrome,
      warnings,
      tagline: hero?.subtitle || chrome.company.slogan || String(site.brand?.tagline || ''),
      hero,
      heroImageUrl,
      featuredRefs,
      products: products.items,
      caseStudies: caseStudies.items,
      articles: articles.items,
      ctaBanner: ctaBlocks[0] || null,
      companyIntro: chrome.company.summary,
      paths,
      labels,
      error: undefined as string | undefined,
    };
  } catch (error) {
    return {
      ...chrome,
      warnings,
      tagline: chrome.company.slogan || String(site.brand?.tagline || ''),
      hero: null,
      heroImageUrl: site.theme === 'turmill' ? TURMILL_HERO_FALLBACK : '',
      featuredRefs: [] as ResolvedReferenceCard[],
      products: [],
      caseStudies: [] as CaseStudyCard[],
      articles: [],
      ctaBanner: null,
      companyIntro: chrome.company.summary,
      paths,
      labels,
      error: toErrorMessage(error, t(currentLocale, 'loadFailed')),
    };
  }
}
