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
    title: 'Why this architecture best fits B2B sites, corporate portals & marketing sites',
    items: [
      {
        title: 'Help overseas buyers open pages faster',
        desc: 'Deliver static assets through Cloudflare’s global network so visitors in North America, Europe, Asia, and beyond can fetch pages from nearer nodes. One site can serve global markets without standing up separate servers for every region.',
      },
      {
        title: 'Own enterprise site infrastructure for under $12/year',
        lead: 'Drive site setup costs down; direct budget into buyer acquisition.',
        desc: 'Traditional builds often carry continuous server leases, environment maintenance, and technical overhead. Built on Cloudflare with efficient caching and optimization, baseline infrastructure costs for many typical corporate sites, B2B product hubs, and marketing sites can drop nearly to just domain renewal fees.',
        bullets: [
          { title: 'Under $12 per year', text: 'Using typical domain registration fees as benchmark, baseline site infrastructure spend can remain in this lean tier.' },
          { title: 'No traditional server babysitting', text: 'Eliminate ongoing operating system updates, stack maintenance, and server environment burdens.' },
          { title: 'Scale only when business demands', text: 'Upgrade in lockstep with real traffic and feature needs rather than paying upfront for idle capacity.' },
        ],
        footer: 'Never let heavy upfront server capital delay your global market rollout.',
      },
      {
        title: 'Less server maintenance, more business time',
        desc: 'You do not need to babysit traditional OS patches and runtime stacks for the website alone. Managed application services take on part of the foundation work so you can focus on product, content, customers, and sales.',
      },
      {
        title: 'Not just a display brochure: operate with single-click ease',
        lead: 'Spend less time wrestling with backends; let AI streamline daily operations.',
        desc: 'From catalog updates and editorial publishing to lead management, Cizhenyu turns complex administrative operations into clear, streamlined workflows without restarting engineering cycles each time.',
        bullets: [
          { title: 'Point-and-click daily management', text: 'Centralize products, articles, and case studies to eliminate duplicate entry.' },
          { title: 'AI-assisted operations', text: 'Harness tailored AI tools and workflows to research, draft, refine, and publish marketing copy.' },
          { title: 'From web presence to closed deals', text: 'Seamlessly connect lead inquiries, CRM, and SEO/GEO optimization as an ongoing revenue engine.' },
        ],
        footer: 'Keep technology under the hood; make everyday business operations effortless.',
      },
    ],
    note: 'Cost advantages assume a typical B2B site, sensible caching, and real usage. Exact spend depends on services and scale. The goal is avoiding unnecessary infrastructure spend—not cutting capability for the sake of cheapness.',
  },
  compare: {
    title: 'Building a website should not be a one-off gamble or long-term burden',
    lead: 'Going live is merely day one. What creates the real gap is ongoing operating cost, business ownership, and sustained customer acquisition.',
    columns: ['Dimension', 'WordPress', 'Custom Dev', 'SaaS Builders', 'Cizhenyu'],
    rows: [
      {
        dimension: 'Build & Setup Cost',
        wordpress: 'Variable; themes, plugins, and upkeep incur ongoing fees',
        custom: 'High upfront development investment',
        saas: 'Low entry barrier, but advanced tiers demand recurring subscriptions',
        cizhenyu: 'Delivered as modular capabilities tailored to your goals, trimming waste',
      },
      {
        dimension: 'Server & Maintenance',
        wordpress: 'Self-hosting requires care; managed hosts relieve partial burden',
        custom: 'Tied to tech stack and maintenance SLAs',
        saas: 'Fully handled by platform infrastructure',
        cizhenyu: 'Built on Cloudflare, eliminating traditional server operations',
      },
      {
        dimension: 'Site Speed & Access',
        wordpress: 'Varies by hosting quality, cache, and CDN tuning',
        custom: 'Dependent on deployment architecture and optimization',
        saas: 'Tied to proprietary platform infrastructure',
        cizhenyu: 'Delivered via Cloudflare global edge network, ideal for international buyers',
      },
      {
        dimension: 'Data Ownership & Control',
        wordpress: 'High control in self-hosted environments',
        custom: 'Governed by contracts, codebase, and deployment control',
        saas: 'Subject to platform terms, export limits, and plan tiers',
        cizhenyu: 'Structured around your own assets and deployment terms with clear ownership',
      },
      {
        dimension: 'Future Extensibility',
        wordpress: 'Dependent on plugins, themes, or custom rework',
        custom: 'High freedom, but modifications incur continued developer billing',
        saas: 'Constrained by closed APIs and walled-garden features',
        cizhenyu: 'Expandable by design across catalog, inquiries, CRM, and growth workflows',
      },
      {
        dimension: 'Daily Operations',
        wordpress: 'Requires juggling disparate plugins and manual effort',
        custom: 'Automation depth dictates further engineering expense',
        saas: 'Restricted to out-of-the-box platform widgets',
        cizhenyu: 'Engineered for simplified UI and AI-driven workflows to reduce busywork',
      },
      {
        dimension: 'SEO & GEO Long-term',
        wordpress: 'Relies on multi-plugin stacks and external tools',
        custom: 'Requires custom engineering or integration work',
        saas: 'Limited to platform-native SEO capabilities',
        cizhenyu: 'Unifies site foundation, content ops, and SEO/GEO into a cohesive pipeline',
      },
    ],
    coreTitle: "Cizhenyu's core edge is not claiming every single spec is better—it is solving the common business costs and headaches together:",
    coreHighlights: [
      'Free your team from traditional server management and maintenance overhead.',
      'Avoid fragmenting websites, lead forms, CRM, and content ops into disconnected silos.',
      'Stop rebuilding from ground zero each time a new operational requirement surfaces.',
      'Receive not just a static website, but a launchpad engineered for AI-assisted growth.',
    ],
    summary: 'If your business requires deeply specialized enterprise software, custom development remains best. But if you want a cost-controlled, easily managed, global-ready corporate website built for ongoing growth, Cizhenyu is the smarter choice.',
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
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'How much infrastructure cost should I expect per year?',
        answer:
          'Cizhenyu is deeply optimized for edge caching and lightweight execution on Cloudflare. For typical corporate websites, B2B product catalogs, and marketing portals, Cloudflare\'s free plan comfortably handles over 15,000 unique daily visitors (15K+ UV/day). For most businesses, fixed infrastructure overhead effectively drops down to just annual domain registration fees (under $12/year). When traffic scales exponentially, you expand on demand without upfront server retainers.',
      },
      {
        question: 'Can the website effortlessly serve global customers?',
        answer:
          'Absolutely. The site deploys seamlessly to Cloudflare Pages & Workers, leveraging edge data centers across 300+ cities worldwide. Whether your visitors are in North America, Europe, Southeast Asia, or Latin America, pages load in milliseconds from the nearest edge node. You never need to manage multi-region origin servers or configure complex CDN routing—global high performance is built-in from day one.',
      },
      {
        question: 'Can SEO and GEO guarantee specific rankings or orders?',
        answer:
          'No ethical engineer can promise absolute search rankings or guaranteed conversions, as market competition, keyword difficulty, and offering fit vary widely. However, on technical SEO and GEO (Generative Engine Optimization), Cizhenyu reaches industry-leading heights: on Google’s authoritative PageSpeed Insights, our generated sites consistently score 98+ across Performance, Accessibility, Best Practices, and SEO. With clean semantic markup and sub-second edge responses, both traditional search crawlers and generative AI engines (ChatGPT, Perplexity, etc.) can index, comprehend, and cite your content with maximum efficiency.',
      },
      {
        question: 'Will our website and business data remain fully under our own ownership?',
        answer:
          '100% yes. Just like AWS, Google Cloud, or Microsoft Azure, Cloudflare is an independent global cloud infrastructure provider. Cizhenyu deploys the application directly into your own Cloudflare account. Your databases (D1/KV), content, media assets, DNS records, and source artifacts remain entirely inside your infrastructure. We never hold your business data hostage—you retain full ownership and administrative control over your digital assets.',
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
