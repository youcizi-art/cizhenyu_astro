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
export type HomeBenefit = { title: string; desc: string };
export type HomeCompareRow = { plan: string; get: string; cost: string };
export type HomeStep = { index: string; title: string; desc: string };
export type HomePath = { title: string; desc: string; cta: string; intent: string };
export type HomeFaq = { question: string; answer: string };

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
    colPlan: string;
    colGet: string;
    colCost: string;
    rows: HomeCompareRow[];
    whyTitle: string;
    whyBody: string;
  };
  seoGeo: {
    title: string;
    lead: string;
    steps: HomeStep[];
    goal: string;
    disclaimer: string;
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

export function defaultHomeContent(locale: string): DefaultHomeContent {
  if (locale === 'zh-TW' || locale === 'zh-HK') return ZH_TW;
  if (locale.startsWith('zh')) return ZH_CN;
  if (locale === 'ja') return JA;
  return EN;
}
