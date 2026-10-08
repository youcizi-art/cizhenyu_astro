import { loadPageChrome } from '../chrome/load-chrome';
import { listProducts } from '../../modules/product';
import { listArticles } from '../../modules/article';
import { listCaseStudies } from '../../modules/case-study';
import { listSolutions } from '../../modules/industry';
import { listBlocksGroupedByPlacements, type ContentBlock } from '../../modules/content-block';
import { listFaqs, type FaqItem } from '../../modules/faq';
import { getPageBySlug, type SitePage } from '../../modules/page';
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
      description: b.summary || b.body,
      solution: b.subtitle || '',
    }))
    .filter((b) => b.title && (b.description || b.solution));
}

function mapComparisons(blocks: ContentBlock[]) {
  return blocks
    .map((b) => ({
      dimension: b.title || b.name,
      traditional: b.summary || b.body,
      solution: b.subtitle || b.ctaLabel,
    }))
    .filter((b) => b.dimension && b.traditional);
}

function mapSteps(blocks: ContentBlock[]) {
  return blocks
    .map((b, idx) => ({
      stepNumber: b.eyebrow || String(idx + 1).padStart(2, '0'),
      title: b.title || b.name,
      description: b.summary || b.body,
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
      comparisons: [] as ReturnType<typeof mapComparisons>,
      steps: [] as ReturnType<typeof mapSteps>,
      factoryItems: [] as ReturnType<typeof mapFactory>,
      companyIntro: chrome.company.summary,
      companyStats: [] as Array<{ label: string; value: string }>,
      cmsPage: null as SitePage | null,
      faqs: [] as FaqItem[],
      paths,
      labels,
      error: undefined as string | undefined,
    };
  }

  const { site, locale: currentLocale } = chrome;
  const warnings = [...chrome.warnings];

  try {
    const homePlacements = [
      'home_hero',
      'home_featured',
      'footer_cta',
      'home_advantage',
      'home_testimonial',
      'home_factory',
      'home_comparison',
      'home_step',
    ] as const;
    // 区块 / 列表 / SEO page 全部并行（无依赖不串行）
    const [blockMap, products, articles, caseStudies, solutions, faqs, cmsPage] = await Promise.all([
      listBlocksGroupedByPlacements(
        [...homePlacements],
        {
          locale: currentLocale,
          pageSize: 50,
        },
        { resolveReferencesFor: ['home_hero', 'home_featured'] }
      ).catch((error) => {
        warnings.push(toErrorMessage(error, '首页区块加载失败'));
        return Object.fromEntries(homePlacements.map((p) => [p, [] as ContentBlock[]]));
      }),
      site.modules.products
        ? listProducts({ locale: currentLocale, page: 1, pageSize: 6 }).catch((error) => {
            warnings.push(toErrorMessage(error, '产品加载失败'));
            return { items: [], pages: { total: 0, page: 1, pageSize: 6, totalPages: 0 } };
          })
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
      site.modules.faq
        ? listFaqs({ locale: currentLocale, page: 1, pageSize: 8 }).then((r) => r.items).catch(() => [] as FaqItem[])
        : Promise.resolve([] as FaqItem[]),
      getPageBySlug('home', { locale: currentLocale }).catch(() => null),
    ]);

    const heroes = blockMap.home_hero || [];
    const featuredBlocks = blockMap.home_featured || [];
    const ctaBlocks = blockMap.footer_cta || [];
    const advantageBlocks = blockMap.home_advantage || [];
    const testimonialBlocks = blockMap.home_testimonial || [];
    const factoryBlocks = blockMap.home_factory || [];
    const comparisonBlocks = blockMap.home_comparison || [];
    const stepBlocks = blockMap.home_step || [];

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
      comparisons: mapComparisons(comparisonBlocks),
      steps: mapSteps(stepBlocks),
      factoryItems: mapFactory(factoryBlocks),
      companyIntro: chrome.company.summary,
      companyStats: [] as Array<{ label: string; value: string }>,
      faqs,
      cmsPage,
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
      comparisons: [],
      steps: [],
      factoryItems: [],
      companyIntro: chrome.company.summary,
      companyStats: [],
      faqs: [] as FaqItem[],
      cmsPage: null as SitePage | null,
      paths,
      labels,
      error: toErrorMessage(error, t(currentLocale, 'loadFailed')),
    };
  }
}
