import type { DefaultHomeContent } from './home-content';

const EN: DefaultHomeContent = {
  brandLine: 'Website · CRM · Search Growth',
  hero: {
    title: 'Build the site, manage customers, and help global buyers find you.',
    lead:
      'Stop wrestling with expensive servers, scattered leads, and long stretches of zero traffic. Build a lightweight, fast, scalable business site on Cloudflare—then pair it with CRM, AI support, and SEO / GEO so the website actually drives growth.',
    ctaPrimary: 'Choose a website plan',
    ctaSecondary: 'Explore CRM',
    highlights: [
      { title: 'Global reach', desc: 'Worldwide network delivery' },
      { title: 'Ultra-low ops cost', desc: 'Leave traditional server burden behind' },
      { title: 'Ongoing acquisition', desc: 'Long-term SEO / GEO operations' },
    ],
  },
  pain: {
    title: 'Your online business may need more than just a website',
    items: [
      {
        title: 'Building is expensive; upkeep is messy',
        desc: 'Servers, runtime environments, and updates cost both money and time.',
      },
      {
        title: 'The site launches—but traffic never comes',
        desc: 'Without keyword planning, useful content, and ongoing optimization, target buyers rarely find you.',
      },
      {
        title: 'Inquiries arrive; leads slip away',
        desc: 'Scattered inquiries, repeated Q&A, and slow follow-up waste acquisition spend.',
      },
      {
        title: 'More tools, less coherence',
        desc: 'Website, support, CRM, and ops each run alone—raising cost and coordination load.',
      },
    ],
    bridge: 'One clear product system solves three critical problems.',
    bridgeLead:
      'Website building carries the business. CRM and AI support manage customers. SEO / GEO expand search visibility. Start with whichever you need first.',
  },
  products: {
    title: 'Three products that solve real business problems',
    items: [
      {
        index: '01',
        slug: 'cizhenyu-sites',
        tag: 'Website building',
        title: 'Not just a delivered site—a business system you can manage yourself.',
        suit: 'Ideal for corporate sites, B2B export sites, product showcases, and content marketing sites.',
        features: [
          { title: 'Complete page set', desc: 'Home, products, cases, solutions, articles, FAQ, and contact.' },
          { title: 'Business-ready admin', desc: 'Manage products, articles, and pages with less day-to-day developer dependency.' },
          { title: 'Search-ready foundation', desc: 'Clear structure, SEO settings, and internal content organization.' },
          { title: 'Extend on demand', desc: 'Add multilingual support, inquiry entry points, and other modules as needed.' },
        ],
        value: 'What you get: fewer rebuild loops, and a site you can keep managing and extending after launch.',
        cta: 'View website plans',
      },
      {
        index: '02',
        slug: 'cizhenyu-inquiry',
        tag: 'Customer management',
        title: 'Every inquiry recorded. Every follow-up grounded in context.',
        suit: 'For teams with website inquiries who need lead follow-up or less repetitive support work.',
        features: [
          { title: 'Centralized customer profiles', desc: 'Reduce gaps between email, spreadsheets, and chat logs.' },
          { title: 'Unified web intake', desc: 'Bring forms and relevant inquiry channels into one handling flow.' },
          { title: 'AI knowledge answers', desc: 'Use your own product materials to answer common questions.' },
          { title: 'Follow-up history', desc: 'Track needs and progress so important leads are not dropped.' },
        ],
        value: 'What you get: less repetitive communication, more time for deals that can close.',
        cta: 'View CRM plans',
      },
      {
        index: '03',
        slug: 'cizhenyu-growth',
        tag: 'Search growth',
        title: 'Building the site is not enough—buyers still need a way to find you.',
        suit: 'For companies that want steady visibility through Google and AI search.',
        features: [
          { title: 'Industry & keyword research', desc: 'Find search demand and content opportunities worth pursuing.' },
          { title: 'Product & content optimization', desc: 'Build around real products, buyer questions, and decision needs.' },
          { title: 'Production & publishing', desc: 'Turn research into an executable content plan and release cadence.' },
          { title: 'Measurement & iteration', desc: 'Use indexing, search performance, and conversion signals to prioritize the next round.' },
        ],
        value: 'What you get: SEO / GEO as a repeatable acquisition process—not scattered one-off tasks.',
        cta: 'View growth plans',
      },
    ],
  },
  architecture: {
    title: 'Why this architecture fits lightweight B2B sites',
    items: [
      {
        title: 'Help overseas buyers open pages faster',
        desc: 'Deliver static assets through Cloudflare’s global network so visitors in North America, Europe, Asia, and beyond can fetch pages from nearer nodes. One site can serve global markets without standing up separate servers for every region.',
      },
      {
        title: 'Bring server spend close to negligible',
        desc: 'Typical B2B sites should not pre-buy expensive capacity for traffic that does not exist. With caching, static delivery, and sensible optimization, infrastructure cost can stay extremely low at common usage—often with the domain as the main fixed fee. Scale later based on real demand.',
      },
      {
        title: 'Less server maintenance, more business time',
        desc: 'You do not need to babysit traditional OS patches and runtime stacks for the website alone. Managed application services take on part of the foundation work so you can focus on product, content, customers, and sales.',
      },
      {
        title: 'Start with a site that can grow',
        desc: 'A website should not become frozen after delivery. With a clear front/back office and modular business capabilities, you can extend CMS, inquiry, CRM, and ops without rebuilding from scratch every time.',
      },
    ],
    note: 'Cost advantages assume a typical B2B site, sensible caching, and real usage. Exact spend depends on services and scale. The goal is avoiding unnecessary infrastructure spend—not cutting capability for the sake of cheapness.',
  },
  compare: {
    title: 'What really differs across website approaches?',
    lead: 'Do not only compare build quotes. What matters more is how much maintenance, expansion, and management cost remains after launch.',
    colPlan: 'Approach',
    colGet: 'What you get',
    colCost: 'What it costs you later',
    rows: [
      {
        plan: 'Self-hosted WordPress',
        get: 'Mature CMS, rich plugins, strong ecosystem',
        cost: 'You manage hosting, plugin compatibility, updates, and security; managed hosting can share some work',
      },
      {
        plan: 'Fully custom development',
        get: 'High functional freedom, deep business fit',
        cost: 'Development, testing, maintenance, and ongoing iteration all require matching investment',
      },
      {
        plan: 'SaaS website builders',
        get: 'Fast start; the platform carries most infrastructure',
        cost: 'Features, data control, and migration paths are constrained by the platform and plan',
      },
      {
        plan: 'Cizhenyu on Cloudflare',
        get: 'Lightweight hosting, admin, extensible modules—combinable with CRM and SEO / GEO',
        cost: 'You configure and manage accounts, apps, and data per project; special features extend on demand',
      },
    ],
    whyTitle: 'Why choose Cizhenyu?',
    whyBody:
      'If you need an international-facing business site with lower day-to-day maintenance, room to expand, and a path into acquisition ops, this approach lets you start from common website needs—not from servers and rebuild cycles. It does not need to replace every WordPress or SaaS project. Its strength is for teams that want ownership of business assets, control of long-term spend, and a tighter link between the website and customer operations.',
  },
  seoGeo: {
    title: 'SEO + GEO: one quality content system for more search surfaces',
    lead: 'One content strategy for search engines and AI search. No duplicate content stacks, no keyword stuffing—just stronger site information quality around real products and buyer questions.',
    steps: [
      { index: '01', title: 'Find opportunities', desc: 'Analyze industry, competitors, and keywords to prioritize product pages and topics.' },
      { index: '02', title: 'Build content', desc: 'Strengthen specs, use cases, solutions, cases, and FAQs so buyers can decide.' },
      { index: '03', title: 'Publish & optimize', desc: 'Produce, review, and ship on a plan while improving structure, internal links, and coverage.' },
      { index: '04', title: 'Measure & iterate', desc: 'Use indexing, exposure, clicks, and conversions to set the next optimization focus.' },
    ],
    goal: 'Goal: accumulate reusable content assets and search visibility—not publish once and disappear.',
    disclaimer:
      'SEO / GEO cannot guarantee rankings, AI citations, or orders. Continuous research, content building, and measurement turn site ops from gut feel into planned execution and improvement.',
  },
  paths: {
    title: 'Pick the product that matches your stage',
    items: [
      {
        title: 'I need a website',
        desc: 'Build a corporate site, product catalog, and content admin—with clear deploy and delivery scope.',
        cta: 'Website plans',
        intent: 'sites',
      },
      {
        title: 'I need CRM',
        desc: 'Unify inquiries, profiles, knowledge base, and AI support to reduce dropped leads.',
        cta: 'CRM plans',
        intent: 'crm',
      },
      {
        title: 'I need acquisition',
        desc: 'Establish a long-term SEO / GEO process and keep improving content and search performance.',
        cta: 'Growth plans',
        intent: 'growth',
      },
    ],
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        question: 'How much infrastructure cost should I expect per year?',
        answer:
          'For a typical B2B site with sensible caching and optimization, infrastructure can stay very low—often mostly domain and basic fees. Scale up with traffic, dynamic load, and features as needed. Final cost depends on the services you use.',
      },
      {
        question: 'Can the website serve global customers?',
        answer:
          'Yes—Cloudflare’s global network can deliver static assets so visitors in different regions reach content more efficiently. Actual experience still depends on page optimization, dynamic APIs, and network conditions.',
      },
      {
        question: 'I already have a site. Can I buy only CRM or SEO / GEO?',
        answer:
          'Yes. The three products can be chosen independently. Assess your current site and workflow, then add only the capabilities you need—no full rebuild required.',
      },
      {
        question: 'Can SEO / GEO guarantee rankings or orders?',
        answer:
          'No fixed rankings, AI citations, or order volumes are guaranteed. Work focuses on keywords, content quality, page performance, and measurable signals. Results depend on competition, product, market, and execution.',
      },
      {
        question: 'Can I manage the site and data myself?',
        answer:
          'By project agreement, we can deploy to your own Cloudflare account and define admin rights, code, data, and backup ownership. Delivery boundaries are confirmed before kickoff.',
      },
    ],
  },
  cta: {
    title: 'Don’t leave your website stuck in brochure mode.',
    lead: 'From website building and CRM to search growth, choose products that fit your business—and turn online spend into manageable, lasting operating assets.',
    button: 'Talk about the right plan for me',
  },
};

export default EN;
