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
        saas: 'Accessible start, but advanced capabilities require subscriptions',
        cizhenyu: 'One-time upfront fee with zero recurring monthly/annual subscriptions; full source code, data, and database are 100% handed over to you',
      },
      {
        dimension: 'Server & Maintenance',
        wordpress: 'Self-hosting requires maintenance; managed services offload some work',
        custom: 'Depends on architecture and retainer agreement',
        saas: 'Platform generally handles infrastructure',
        cizhenyu: 'Built entirely on Cloudflare edge serverless infrastructure with enterprise-grade speed and DDoS security; only requires an annual domain fee (Note: 100% $0 running cost if using Cloudflare free subdomain)',
      },
      {
        dimension: 'Website Speed',
        wordpress: 'Depends on host, cache, and CDN setup',
        custom: 'Depends on stack architecture and optimization effort',
        saas: 'Depends on platform capabilities',
        cizhenyu: 'Powered by Cloudflare\'s global 300+ edge CDN points of presence; international buyers anywhere in the world experience instant sub-second page loads',
      },
      {
        dimension: 'Data Ownership',
        wordpress: 'High when self-hosted',
        custom: 'Depends on contract, code, and deployment',
        saas: 'Subject to platform policies, export limits, and tiers',
        cizhenyu: 'Deployed directly into your own Cloudflare account; all business data, customer records, and system assets are 100% owned and controlled by you',
      },
      {
        dimension: 'Feature Expansion',
        wordpress: 'Relies on plugins, themes, or custom modules',
        custom: 'High flexibility, but new requirements often mean added billing',
        saas: 'Limited by platform features and APIs',
        cizhenyu: 'Engineered on a low-code, model-driven architecture; easily configure and scale any new business modules or custom entities without reinventing the wheel',
      },
      {
        dimension: 'Daily Operations',
        wordpress: 'Often stitches together plugins and manual tasks',
        custom: 'Automation ceiling depends on invested budget',
        saas: 'Limited to provided tooling',
        cizhenyu: 'Integrates with popular AI Agents via pre-tuned professional Skill/MCP packages; simply click or describe your goals to let AI handle daily ops without steep learning curves',
      },
      {
        dimension: 'SEO / GEO Ops',
        wordpress: 'Supported through plugins and external tools',
        custom: 'Requires in-house engineering or tooling integration',
        saas: 'Bounded by platform-native SEO capabilities',
        cizhenyu: 'On-site technical SEO and AI-engine GEO are maximized out of the box, delivered with expert Agent Skill/MCP packs for effortless long-term growth and visibility',
      },
    ],
    coreTitle: 'Spend less on web setup, eliminate operational friction, and acquire buyers with clarity. Cizhenyu doesn\'t just deliver a static site—it unites web infrastructure, CRM, and SEO/GEO operations around your real business goals.',
    coreHighlights: [
      'Lighter cost: Built on Cloudflare to eliminate traditional hosting, OS maintenance, and DevOps retainers.',
      'Simpler management: Consolidate content, catalogs, and operational tools into one clear interface.',
      'Higher efficiency: Drive daily marketing with streamlined workflows and AI assistance to automate busywork.',
      'Clear growth path: From catalog displays and lead inquiries to ongoing SEO/GEO, build a solid foundation for revenue.',
    ],
    summary: 'Never settle for a passive website that merely waits for visitors. Build a cost-controlled, easily managed, global-ready portal engineered to actively win buyers. Cizhenyu makes business setup lighter and operations effortless.',
  },
  seoGeo: {
    title: 'SEO + GEO: Empower AI for Professional Growth & Continuous Exposure',
    lead: 'No need to master complex SEO or GEO frameworks from scratch. Feed in your goals, activate specialized workflows, and let AI execute research, optimization, and content distribution.',
    intro:
      'Cizhenyu integrates specialized SEO/GEO skills, MCP tools, and APIs into modern AI Agent environments. Use your preferred AI coding and agent tools to trigger our proven workflows—turning laborious manual research and publishing into automated, repeatable business growth.',
    onsite: {
      title: 'On-Page Optimization: From Audit to Execution in One Flow',
      items: [
        { title: 'Full Site Auditing', desc: 'Analyze technical markup, crawl health, keyword gaps, and UX roadblocks with clear remediation priorities.' },
        { title: 'Keyword & Topic Planning', desc: 'Uncover high-intent search queries across industry, rivals, and products to plan high-converting landing pages.' },
        { title: 'Batch Tuning & Copywriting', desc: 'Refine metadata, internal linking, product specs, and rich editorial copy crafted for search engines and AI citation.' },
        { title: 'CMS Sync & Re-verification', desc: 'Publish approved updates directly via authorized CMS APIs and re-audit results without juggling disparate tools.' },
      ],
    },
    offsite: {
      title: 'Off-Page Promotion: Expanding Reach Beyond Mere Blogging',
      items: [
        { title: 'Outreach Discovery', desc: 'Uncover industry hubs, trade directories, editorial partnerships, and organic citation opportunities.' },
        { title: 'Multi-Channel Distribution', desc: 'Tailor promotional excerpts, press snippets, and asset variants for third-party platforms.' },
        { title: 'Repetitive Task Automation', desc: 'Let autonomous agents, specialized skills, MCPs, and APIs execute approved distribution pipelines.' },
        { title: 'Continuous KPI Tracking', desc: 'Monitor organic impressions, crawl frequency, and conversion signals to steer subsequent operational sprints.' },
      ],
    },
    value: {
      title: 'What Real Value Do You Receive?',
      lead: 'Not a confusing pile of disjointed SEO utilities, but an executable operational system.',
      items: [
        { title: 'Zero Expertise Hurdle', desc: 'Drive enterprise-grade SEO and GEO campaigns with AI without becoming a technical specialist.' },
        { title: 'Drastic Time & Labor Savings', desc: 'Hand over repetitive audits, drafting, link checking, and scheduling to automated pipelines.' },
        { title: 'From Scattered Posts to Systematic Ops', desc: 'Connect site audits, keyword mapping, on-page tuning, content ops, and analytics into one loop.' },
        { title: 'Full Editorial Governance', desc: 'Review task outputs, verify key copy, and govern exactly what goes live based on business priorities.' },
        { title: 'Sustained Organic Visibility', desc: 'Target genuine buyer problems to maximize discovery across both classic search engines and generative AI agents.' },
      ],
    },
    workflow: {
      title: 'From Stating Your Intent to Executing Professional Workflows',
      lead: 'Instruct the AI which website to optimize, which products to showcase, and which buyer personas to reach. The system analyzes, generates tasks, and executes connected actions.',
      desc: 'You maintain strategic business direction and crucial approvals; AI handles the repetitive execution. Cizhenyu doesn’t promise overnight magic—we give you a battle-tested operational engine that steadily compounds organic buyer acquisition.',
      cta: 'Explore Service Workflow',
    },
  },
  testimonials: {
    title: 'Client Experiences & Proven Results',
    lead: 'Discover how real export manufacturers and global brands reduce web overhead and unlock sustained buyer acquisition on Cizhenyu.',
    items: [
      {
        name: 'Mr. Chen · Industrial Machinery Exporter',
        role: 'Manufacturing / Global Trade',
        quote: 'We used to spend thousands annually on foreign servers and maintenance, yet still battled sluggish overseas page loads. After deploying on Cizhenyu Cloudflare, our US and EU buyers experience instantaneous loading with virtually zero server upkeep. Those savings now go straight into marketing.',
        rating: 5,
      },
      {
        name: 'Sarah Lin · Smart Electronics Export Director',
        role: 'Consumer Tech / Brand Direct',
        quote: 'Our old open-source CMS was plagued with plugin conflicts and security patches. Updating a hero banner or catalog spec required waiting on dev tickets. Cizhenyu’s admin is refreshingly intuitive—our sales reps update products and multilingual case studies with a few clicks.',
        rating: 5,
      },
      {
        name: 'David Zhang · Founder of B2B Trade Agency',
        role: 'B2B Services / Growth Operations',
        quote: 'We audited the site on PageSpeed Insights and scored 98+ across Performance and Best Practices. Between the structured data and the built-in AI chat widget, our overseas buyer inquiries doubled compared to our previous portal.',
        rating: 5,
      },
    ],
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
