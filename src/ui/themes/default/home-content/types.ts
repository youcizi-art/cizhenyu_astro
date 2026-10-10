/** default 主题首页营销文案结构（来自 PRD；与 CMS 展示字段解耦） */
export type HomeTrust = { title: string; desc: string };

export type HomePainItem = { title: string; desc: string };

export type HomeProductFeature = { title: string; desc: string };

export type HomeProduct = {
  index: string;
  tag: string;
  title: string;
  suit: string;
  features: HomeProductFeature[];
  value: string;
  cta: string;
  /** contact intent query */
  intent: string;
};

export type HomeArchItem = { title: string; body: string };

export type HomeCompareRow = { plan: string; get: string; cost: string };

export type HomeGeoStep = { index: string; title: string; desc: string };

export type HomePath = {
  title: string;
  desc: string;
  cta: string;
  intent: string;
};

export type HomeFaqItem = { question: string; answer: string };

export type HomeContent = {
  brandLine: string;
  hero: {
    title: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trusts: HomeTrust[];
  };
  pain: {
    title: string;
    items: HomePainItem[];
    bridgeTitle: string;
    bridgeBody: string;
  };
  products: {
    title: string;
    items: HomeProduct[];
  };
  architecture: {
    title: string;
    items: HomeArchItem[];
    footnote: string;
  };
  comparison: {
    title: string;
    lead: string;
    colPlan: string;
    colGet: string;
    colCost: string;
    rows: HomeCompareRow[];
    whyTitle: string;
    whyBody: string;
  };
  geo: {
    title: string;
    subtitle: string;
    lead: string;
    steps: HomeGeoStep[];
    goal: string;
    disclaimer: string;
  };
  paths: {
    title: string;
    items: HomePath[];
  };
  faq: {
    title: string;
    items: HomeFaqItem[];
  };
  cta: {
    title: string;
    lead: string;
    button: string;
  };
};
