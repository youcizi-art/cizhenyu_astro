import { loadPageChrome } from '../chrome/load-chrome';
import { listProducts } from '../../modules/product';
import { listArticles } from '../../modules/article';
import { listCaseStudies } from '../../modules/case-study';
import { listSolutions } from '../../modules/industry';
import { listBlocksByPlacement, type ContentBlock } from '../../modules/content-block';
import { localePath, toErrorMessage } from '../../modules/cms';
import { t } from '../../modules/i18n';
import type { ResolvedReferenceCard } from '../../modules/reference';
import type { CaseStudyCard } from '../../modules/case-study';

function homeLabels(locale: string) {
  return {
    products: t(locale, 'products'),
    articles: t(locale, 'articles'),
    about: t(locale, 'about'),
    cases: t(locale, 'caseStudies'),
    featured: locale.startsWith('zh') ? '推荐内容' : locale === 'ja' ? 'おすすめ' : 'Featured',
    emptyProducts: t(locale, 'emptyProducts'),
    readMore: locale.startsWith('zh') ? '了解更多' : locale === 'ja' ? '詳しく見る' : 'Learn More',
    aboutCta: t(locale, 'contact'),
    exploreAll: locale.startsWith('zh') ? '查看全部' : 'Explore All',
  };
}

function homePaths(locale: string) {
  return {
    home: localePath(locale, '/'),
    about: localePath(locale, '/about'),
    contact: localePath(locale, '/contact'),
    products: localePath(locale, '/products'),
    solutions: localePath(locale, '/solutions'),
  };
}

function mapAdvantages(blocks: ContentBlock[]) {
  return blocks
    .map((b) => ({
      title: b.title || b.name,
      description: b.summary || b.subtitle || b.body,
    }))
    .filter((b) => b.title && b.description);
}

function mapTestimonials(blocks: ContentBlock[]) {
  return blocks
    .map((b) => ({
      name: b.title || b.name,
      role: b.eyebrow || b.subtitle,
      quote: b.summary || b.body,
      avatarUrl: b.imageUrl,
      meta: b.ctaLabel,
      rating: 5,
    }))
    .filter((b) => b.name && b.quote);
}

function mapFactory(blocks: ContentBlock[]) {
  return blocks
    .map((b) => ({
      title: b.title || b.name,
      imageUrl: b.imageUrl || b.backgroundImageUrl,
    }))
    .filter((b) => b.title && b.imageUrl);
}

/** 通用首页数据：不写死任何主题；营销缺省由主题 Active 层补齐 */
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
      solutions: [],
      ctaBanner: null as ContentBlock | null,
      advantages: [] as ReturnType<typeof mapAdvantages>,
      testimonials: [] as ReturnType<typeof mapTestimonials>,
      factoryItems: [] as ReturnType<typeof mapFactory>,
      companyIntro: chrome.company.summary,
      companyStats: [] as Array<{ label: string; value: string }>,
      paths,
      labels,
      error: undefined as string | undefined,
    };
  }

  const { site, locale: currentLocale } = chrome;
  const warnings = [...chrome.warnings];

  try {
    const [
      heroes,
      featuredBlocks,
      ctaBlocks,
      advantageBlocks,
      testimonialBlocks,
      factoryBlocks,
      products,
      articles,
      caseStudies,
      solutions,
    ] = await Promise.all([
      listBlocksByPlacement('home_hero', { locale: currentLocale, pageSize: 5 }).catch((error) => {
        warnings.push(toErrorMessage(error, '首页区块加载失败'));
        return [];
      }),
      listBlocksByPlacement('home_featured', { locale: currentLocale, pageSize: 5 }).catch(() => []),
      listBlocksByPlacement('footer_cta', { locale: currentLocale, pageSize: 3 }).catch(() => []),
      listBlocksByPlacement('home_advantage', { locale: currentLocale, pageSize: 6 }).catch(() => []),
      listBlocksByPlacement('home_testimonial', { locale: currentLocale, pageSize: 6 }).catch(() => []),
      listBlocksByPlacement('home_factory', { locale: currentLocale, pageSize: 8 }).catch(() => []),
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
      site.modules.solutions
        ? listSolutions({ locale: currentLocale, page: 1, pageSize: 3 }).catch(() => ({
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

    return {
      ...chrome,
      warnings,
      tagline: hero?.subtitle || chrome.company.slogan || String(site.brand?.tagline || ''),
      hero,
      heroImageUrl: hero?.imageUrl || '',
      featuredRefs,
      products: products.items,
      caseStudies: caseStudies.items,
      articles: articles.items,
      solutions: solutions.items,
      ctaBanner: ctaBlocks[0] || null,
      advantages: mapAdvantages(advantageBlocks),
      testimonials: mapTestimonials(testimonialBlocks),
      factoryItems: mapFactory(factoryBlocks),
      companyIntro: chrome.company.summary,
      companyStats: [] as Array<{ label: string; value: string }>,
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
      heroImageUrl: '',
      featuredRefs: [] as ResolvedReferenceCard[],
      products: [],
      caseStudies: [] as CaseStudyCard[],
      articles: [],
      solutions: [],
      ctaBanner: null,
      advantages: [],
      testimonials: [],
      factoryItems: [],
      companyIntro: chrome.company.summary,
      companyStats: [],
      paths,
      labels,
      error: toErrorMessage(error, t(currentLocale, 'loadFailed')),
    };
  }
}
