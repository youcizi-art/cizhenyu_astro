/**
 * default 主题首页落地页文案（PRD 结构化内容）
 * 业务叙事由主题持有；产品链接可由 CMS 注入。
 */

import ZH_CN from './home-content-zh-cn';
import ZH_TW from './home-content-zh-tw';
import JA from './home-content-ja';
import EN from './home-content-en';

export type HomeHighlight = { title: string; desc: string };
export type HomePain = { title: string; desc: string };
export type HomeFeature = { title: string; desc: string };
export type HomeProduct = {
  index: string;
  slug: string;
  tag: string;
  title: string;
  suit: string;
  features: HomeFeature[];
  value: string;
  cta: string;
};
export type HomeBenefit = {
  title: string;
  lead?: string;
  desc: string;
  bullets?: Array<{ title?: string; text: string }>;
  footer?: string;
};
export type HomeCompareCell = {
  dimension: string;
  wordpress: string;
  custom: string;
  saas: string;
  cizhenyu: string;
};
export type HomeStep = { index: string; title: string; desc: string };
export type HomePath = { title: string; desc: string; cta: string; intent: string };
export type HomeFaq = { question: string; answer: string };

export type HomePricingPlan = {
  price: string;
  currency?: string;
  period?: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  isPopular?: boolean;
  features: string[];
  ctaLabel: string;
  intent: string;
};

export type DefaultHomeContent = {
  brandLine: string;
  hero: {
    title: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    highlights: HomeHighlight[];
  };
  pain: {
    title: string;
    items: HomePain[];
    bridge: string;
    bridgeLead: string;
  };
  products: {
    title: string;
    items: HomeProduct[];
  };
  architecture: {
    title: string;
    items: HomeBenefit[];
    note: string;
  };
  compare: {
    title: string;
    lead: string;
    columns: [string, string, string, string, string];
    rows: HomeCompareCell[];
    coreTitle: string;
    coreHighlights: string[];
    summary: string;
  };
  pricing: {
    title: string;
    lead: string;
    plans: HomePricingPlan[];
  };
  seoGeo: {
    title: string;
    lead: string;
    intro: string;
    onsite: {
      title: string;
      items: Array<{ title: string; desc: string }>;
    };
    offsite: {
      title: string;
      items: Array<{ title: string; desc: string }>;
    };
    value: {
      title: string;
      lead: string;
      items: Array<{ title: string; desc: string }>;
    };
    workflow: {
      title: string;
      lead: string;
      desc: string;
      cta: string;
    };
  };
  testimonials?: {
    title: string;
    lead: string;
    items: Array<{
      name: string;
      role: string;
      quote: string;
      rating?: number;
    }>;
  };
  paths: {
    title: string;
    items: HomePath[];
  };
  faq: {
    title: string;
    items: HomeFaq[];
  };
  cta: {
    title: string;
    lead: string;
    button: string;
  };
};

import type { ContentBlock } from '@/modules/content-block';

export function defaultHomeContent(locale: string): DefaultHomeContent {
  if (locale === 'zh-TW' || locale === 'zh-HK') return ZH_TW;
  if (locale.startsWith('zh')) return ZH_CN;
  if (locale === 'ja') return JA;
  return EN;
}

/**
 * 优先采用 CMS content_block 实例数据，缺失时平滑无缝回退本地多语言静态配置
 * 支持用户在后台直接修改文案，无需前端重新打包部署
 */
export function resolveDefaultHomeContent(
  locale: string,
  blocks?: Record<string, ContentBlock[]>,
  cmsFaqs?: Array<{ question: string; answer: string }>
): DefaultHomeContent {
  const base = defaultHomeContent(locale);
  if (!blocks || Object.keys(blocks).length === 0) {
    if (cmsFaqs && cmsFaqs.length > 0) {
      return { ...base, faq: { ...base.faq, items: cmsFaqs } };
    }
    return base;
  }

  // 1. Hero
  const heroBlock = blocks['home_hero']?.[0];
  const heroExtra = heroBlock?.extra as any;
  const hero = heroBlock
    ? {
        title: heroBlock.title || base.hero.title,
        lead: heroBlock.subtitle || heroBlock.summary || base.hero.lead,
        ctaPrimary: heroBlock.ctaLabel || base.hero.ctaPrimary,
        ctaSecondary: heroExtra?.ctaSecondary || base.hero.ctaSecondary,
        highlights: Array.isArray(heroExtra?.highlights) && heroExtra.highlights.length
          ? heroExtra.highlights
          : base.hero.highlights,
      }
    : base.hero;

  const brandLine = heroBlock?.eyebrow || base.brandLine;

  // 2. Pain
  const painBlock = blocks['home_pain']?.[0];
  const painExtra = painBlock?.extra as any;
  const pain = painBlock
    ? {
        title: painBlock.title || base.pain.title,
        bridge: painBlock.subtitle || base.pain.bridge,
        bridgeLead: painBlock.summary || painBlock.body || base.pain.bridgeLead,
        items: Array.isArray(painExtra?.items) && painExtra.items.length
          ? painExtra.items
          : base.pain.items,
      }
    : base.pain;

  // 3. Architecture
  const archBlock = blocks['home_architecture']?.[0];
  const archExtra = archBlock?.extra as any;
  const architecture = archBlock
    ? {
        title: archBlock.title || base.architecture.title,
        note: archBlock.subtitle || base.architecture.note,
        items: Array.isArray(archExtra?.items) && archExtra.items.length
          ? archExtra.items
          : base.architecture.items,
      }
    : base.architecture;

  // 4. Compare
  const compareBlock = blocks['home_compare']?.[0];
  const compareExtra = compareBlock?.extra as any;
  const compare = compareBlock
    ? {
        title: compareBlock.title || base.compare.title,
        lead: compareBlock.subtitle || base.compare.lead,
        columns: (Array.isArray(compareExtra?.columns) && compareExtra.columns.length === 5
          ? compareExtra.columns
          : base.compare.columns) as [string, string, string, string, string],
        rows: Array.isArray(compareExtra?.rows) && compareExtra.rows.length
          ? compareExtra.rows
          : base.compare.rows,
        coreTitle: compareBlock.summary || compareExtra?.coreTitle || base.compare.coreTitle,
        coreHighlights: Array.isArray(compareExtra?.coreHighlights) && compareExtra.coreHighlights.length
          ? compareExtra.coreHighlights
          : base.compare.coreHighlights,
        summary: compareBlock.body || compareExtra?.summary || base.compare.summary,
      }
    : base.compare;

  // 5. SEO / GEO
  const seoGeoBlock = blocks['home_seo_geo']?.[0];
  const seoGeoExtra = seoGeoBlock?.extra as any;
  const seoGeo = seoGeoBlock
    ? {
        title: seoGeoBlock.title || base.seoGeo.title,
        lead: seoGeoBlock.subtitle || base.seoGeo.lead,
        intro: seoGeoBlock.summary || base.seoGeo.intro,
        onsite: seoGeoExtra?.onsite || base.seoGeo.onsite,
        offsite: seoGeoExtra?.offsite || base.seoGeo.offsite,
        value: seoGeoExtra?.value || base.seoGeo.value,
        workflow: seoGeoExtra?.workflow || base.seoGeo.workflow,
      }
    : base.seoGeo;

  // 6. Paths
  const pathsBlock = blocks['home_paths']?.[0];
  const pathsExtra = pathsBlock?.extra as any;
  const paths = pathsBlock
    ? {
        title: pathsBlock.title || base.paths.title,
        items: Array.isArray(pathsExtra?.items) && pathsExtra.items.length
          ? pathsExtra.items
          : base.paths.items,
      }
    : base.paths;

  // 7. Footer CTA
  const ctaBlock = blocks['footer_cta']?.[0];
  const cta = ctaBlock
    ? {
        title: ctaBlock.title || base.cta.title,
        lead: ctaBlock.subtitle || ctaBlock.summary || base.cta.lead,
        button: ctaBlock.ctaLabel || base.cta.button,
      }
    : base.cta;

  // 8. FAQ
  const faqItems = (cmsFaqs && cmsFaqs.length > 0) ? cmsFaqs : base.faq.items;
  const faq = {
    title: base.faq.title,
    items: faqItems,
  };

  return {
    brandLine,
    hero,
    pain,
    products: base.products,
    architecture,
    compare,
    pricing: base.pricing,
    seoGeo,
    paths,
    testimonials: base.testimonials,
    faq,
    cta,
  };
}
