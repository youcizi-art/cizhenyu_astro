/**
 * 生成 default theme CMS seed（磁帧鱼 · Rinda 风格营销站）
 * 导航：首页 / 产品 / 帮助 / 下载 / 动态 / 关于 / 联系
 * 产品：站群+B2B生成 · 智能客服询盘 · 部署运营获客
 * 运行：node src/ui/themes/default/seed/build-seed.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCALES = ['zh-CN', 'zh-TW', 'ja', 'en-US'];

const img = (seed, w = 800, h = 600) =>
  `https://placehold.co/${w}x${h}/0b1220/38bdf8?text=${encodeURIComponent(seed)}`;

function lgk(kind, n) {
  return `def00000-${kind}-4000-8000-${String(n).padStart(12, '0')}`;
}

function L(map) {
  const out = {};
  for (const loc of LOCALES) {
    if (!map[loc]) throw new Error(`missing locale ${loc}`);
    out[loc] = map[loc];
  }
  return out;
}

function tw(s) {
  return s
    .replace(/磁帧鱼/g, '磁幀魚')
    .replace(/外贸/g, '外貿')
    .replace(/站点/g, '站點')
    .replace(/后台/g, '後台')
    .replace(/询盘/g, '詢盤')
    .replace(/自动化/g, '自動化')
    .replace(/运营/g, '運營')
    .replace(/数据/g, '資料')
    .replace(/内容/g, '內容')
    .replace(/获取/g, '獲取')
    .replace(/方案/g, '方案')
    .replace(/模块/g, '模組')
    .replace(/知识库/g, '知識庫')
    .replace(/客服/g, '客服')
    .replace(/一键/g, '一鍵')
    .replace(/个人/g, '個人')
    .replace(/业务员/g, '業務員')
    .replace(/企业/g, '企業')
    .replace(/服务商/g, '服務商')
    .replace(/独立站/g, '獨立站')
    .replace(/搜索/g, '搜尋')
    .replace(/优化/g, '優化')
    .replace(/多语言/g, '多語言')
    .replace(/账户/g, '帳戶')
    .replace(/价格/g, '價格')
    .replace(/官网/g, '官網')
    .replace(/提交/g, '提交')
    .replace(/关于/g, '關於')
    .replace(/我们/g, '我們')
    .replace(/联系/g, '聯繫')
    .replace(/产品/g, '產品')
    .replace(/帮助/g, '幫助')
    .replace(/下载/g, '下載')
    .replace(/动态/g, '動態')
    .replace(/站群/g, '站群')
    .replace(/生成/g, '生成')
    .replace(/智能/g, '智慧')
    .replace(/部署/g, '部署')
    .replace(/获客/g, '獲客')
    .replace(/协作/g, '協作')
    .replace(/安装/g, '安裝');
}

function writeJson(name, data) {
  fs.writeFileSync(path.join(__dirname, name), JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('wrote', name);
}

const PREFIX = { 'zh-CN': '/zh-CN', 'zh-TW': '/zh-TW', ja: '/ja', 'en-US': '/en-US' };

// —— company（logo 留空，前端闪电图标兜底，可在 CMS 替换）——
writeJson('company_info.json', {
  collectionSlug: 'b2b_company_info',
  items: [
    {
      languageGroupKey: lgk('c001', 1),
      locales: L({
        'zh-CN': {
          company_name: '磁帧鱼',
          company_type: 'software',
          slogan: '建好网站，管好客户，让全球客户找到你',
          summary:
            '磁帧鱼提供网站建设、CRM 与 AI 客服、SEO / GEO 运营三套可组合产品。基于 Cloudflare 轻量架构，降低运维负担，让网站真正服务业务增长。',
          address: '中国',
          phone: '',
          email: 'service@ycz.me',
          website: 'https://ycz.me',
          logo: { url: '' },
          about_content:
            '<p>磁帧鱼做的不是「又一个模板站」，而是能装到您账户里、能持续改内容、能接住询盘的增长系统。</p><p>三款产品可单独购买、也可组合交付：全能站群 + B2B 前端生成、智能客服询盘、部署运营获客。下载安装可联系客服协作完成；价格与实施方案通过询盘获取。</p>',
          seo_title: '磁帧鱼｜网站建设 · 客户管理 · 搜索增长',
          seo_description:
            'Cloudflare 轻量建站、CRM 与 AI 客服、SEO / GEO 长期运营。咨询适合你的方案。',
          robots_directive: 'index,follow',
          schema_type: 'Organization',
          og_image: { url: img('Cizhenyu', 1200, 630) },
          country: '中国',
          social_profiles: [{ platform: 'website', url: 'https://ycz.me' }],
        },
        'zh-TW': {
          company_name: '磁幀魚',
          company_type: 'software',
          slogan: '第一次做外貿站群與詢盤，也能搭出可交付的獲客系統',
          summary:
            '磁幀魚面向外貿業務員、工廠外貿部與服務商，提供站群與 B2B 站點生成、智慧客服詢盤、部署運營獲客三套可安裝產品。',
          address: '中國',
          phone: '',
          email: 'service@ycz.me',
          website: 'https://ycz.me',
          logo: { url: '' },
          about_content:
            '<p>磁幀魚提供可裝到您帳戶裡的外貿獲客系統。三款產品可單獨或組合交付；安裝可聯繫客服協作，方案透過詢盤獲取。</p>',
          seo_title: '磁幀魚｜外貿站群 · 詢盤 · 部署獲客系統',
          seo_description: '站群與 B2B 站點生成、智慧客服詢盤、部署運營獲客。提交詢盤獲取方案。',
          robots_directive: 'index,follow',
          schema_type: 'Organization',
          og_image: { url: img('Cizhenyu', 1200, 630) },
          country: '中國',
          social_profiles: [{ platform: 'website', url: 'https://ycz.me' }],
        },
        ja: {
          company_name: '磁帧鱼',
          company_type: 'software',
          slogan: '初めての輸出サイト群・問い合わせでも、届けられる獲得システムを',
          summary:
            '磁帧鱼は営業個人・中小メーカー・支援事業者向けに、サイト群/B2B生成・AI問い合わせ・導入運用の3製品を提供します。',
          address: 'China',
          phone: '',
          email: 'service@ycz.me',
          website: 'https://ycz.me',
          logo: { url: '' },
          about_content:
            '<p>磁帧鱼はテンプレート販売ではなく、お客様アカウントへ導入できる獲得システムです。インストールはサポート同席可能。価格はお問い合わせください。</p>',
          seo_title: '磁帧鱼｜サイト群・問い合わせ・導入獲得',
          seo_description: 'サイト群/B2B生成、AI問い合わせ、導入運用。お問い合わせでご提案。',
          robots_directive: 'index,follow',
          schema_type: 'Organization',
          og_image: { url: img('Cizhenyu', 1200, 630) },
          country: 'China',
          social_profiles: [{ platform: 'website', url: 'https://ycz.me' }],
        },
        'en-US': {
          company_name: 'Cizhenyu',
          company_type: 'software',
          slogan: 'Ship a real acquisition stack — even if it’s your first export site',
          summary:
            'Cizhenyu helps export sellers, factory teams, and agencies install three products: multi-site + B2B site generation, AI inquiry desk, and deploy-ops growth. Assets stay on your cloud account.',
          address: 'China',
          phone: '',
          email: 'service@ycz.me',
          website: 'https://ycz.me',
          logo: { url: '' },
          about_content:
            '<p>Cizhenyu is not another template shop. It is an installable growth stack for B2B export. Buy modules alone or together; we can collaborate on install. Pricing via inquiry.</p>',
          seo_title: 'Cizhenyu | Multi-site · Inquiry · Deploy growth',
          seo_description:
            'Multi-site + B2B generation, AI inquiry desk, deploy-ops growth. Inquire for install collaboration.',
          robots_directive: 'index,follow',
          schema_type: 'Organization',
          og_image: { url: img('Cizhenyu', 1200, 630) },
          country: 'China',
          social_profiles: [{ platform: 'website', url: 'https://ycz.me' }],
        },
      }),
    },
  ],
});

writeJson('product_category.json', {
  collectionSlug: 'b2b_product_category',
  items: [
    {
      languageGroupKey: lgk('cate', 1),
      locales: L({
        'zh-CN': {
          name: '磁帧鱼产品',
          slug: 'cizhenyu-products',
          description: '站群生成、智能询盘、部署获客三条产品线。',
          sort_order: 10,
          status: 'published',
          seo_title: '磁帧鱼产品',
          seo_description: '站群生成、智能询盘、部署获客。',
          robots_directive: 'index,follow',
        },
        'zh-TW': {
          name: '磁幀魚產品',
          slug: 'cizhenyu-products',
          description: '站群生成、智慧詢盤、部署獲客三條產品線。',
          sort_order: 10,
          status: 'published',
          seo_title: '磁幀魚產品',
          seo_description: '站群生成、智慧詢盤、部署獲客。',
          robots_directive: 'index,follow',
        },
        ja: {
          name: '磁帧鱼プロダクト',
          slug: 'cizhenyu-products',
          description: 'サイト群生成・AI問い合わせ・導入獲得。',
          sort_order: 10,
          status: 'published',
          seo_title: '磁帧鱼プロダクト',
          seo_description: 'サイト群生成・AI問い合わせ・導入獲得。',
          robots_directive: 'index,follow',
        },
        'en-US': {
          name: 'Cizhenyu products',
          slug: 'cizhenyu-products',
          description: 'Multi-site generation, AI inquiry, deploy growth.',
          sort_order: 10,
          status: 'published',
          seo_title: 'Cizhenyu products',
          seo_description: 'Multi-site generation, AI inquiry, deploy growth.',
          robots_directive: 'index,follow',
        },
      }),
    },
  ],
});

const products = [
  {
    n: 1,
    slug: 'cizhenyu-sites',
    sku: 'CZ-SITES',
    cover: 'Sites',
    zh: {
      title: '磁帧鱼 全能站群管理系统 + B2B 前端站点生成系统',
      tagline: '一套后台管多站，一键生成可上线的 B2B 外贸站',
      summary:
        '面向外贸站群与企业站交付：统一内容后台、多语言结构、产品/文章/案例模板，生成可部署到 Cloudflare Pages 的 B2B 前端。',
      description:
        '<p><strong>全能站群 + B2B 前端生成</strong>帮您把「多站点内容」和「可交付的企业官网」放在同一套系统里。</p><ul><li>站群统一管理：域名、语言、栏目、内容权限</li><li>B2B 站点结构开箱：产品、帮助、动态、关于、联系</li><li>主题包交付：无需给客户源码环境</li><li>与询盘、部署产品可组合安装</li></ul><p>适合服务商批量交付，也适合工厂/贸易公司自建主站。下载安装可联系客服协作。</p>',
      advantages: [
        { title: '站群一体', description: '多站内容与权限统一，减少重复配置。' },
        { title: 'B2B 结构就绪', description: '外贸站必备栏目与 SEO 基础已内置。' },
        { title: '可协作安装', description: '下载后可约客服协助部署上线。' },
      ],
    },
    en: {
      title: 'Cizhenyu Multi-site CMS + B2B Site Generator',
      tagline: 'One hub for many sites — generate deployable B2B export sites',
      summary:
        'Manage multi-site content and generate Cloudflare Pages–ready B2B sites with products, help, news, about, and contact.',
      description:
        '<p><strong>Multi-site + B2B generator</strong> unifies catalogs and shippable corporate sites. Theme packages avoid shipping full source. Pair with inquiry and deploy products. Collaborative install available.</p>',
      advantages: [
        { title: 'Multi-site hub', description: 'Shared content and permissions.' },
        { title: 'B2B IA ready', description: 'Export-site sections built in.' },
        { title: 'Guided install', description: 'Download, then collaborate with support.' },
      ],
    },
    ja: {
      title: '磁帧鱼 サイト群CMS + B2Bサイト生成',
      tagline: '多サイトを一括管理し、納品可能なB2Bサイトを生成',
      summary: 'サイト群のコンテンツ管理と、Cloudflare Pages向けB2Bサイト生成。',
      description:
        '<p><strong>サイト群 + B2B生成</strong>で、多サイト運用と企業サイト納品を一本化。問い合わせ・導入製品と組み合わせ可能。インストール同席サポートあり。</p>',
      advantages: [
        { title: '多サイト一元', description: '権限とコンテンツを共有。' },
        { title: 'B2B構成済み', description: '輸出サイトの導線を内蔵。' },
        { title: '同席導入', description: 'ダウンロード後、サポートと導入。' },
      ],
    },
  },
  {
    n: 2,
    slug: 'cizhenyu-inquiry',
    sku: 'CZ-INQUIRY',
    cover: 'Inquiry',
    zh: {
      title: '磁帧鱼 智能客服智能询盘系统',
      tagline: '白天夜里都能接住询盘——知识库应答，关键线索转人工',
      summary:
        '把散落在邮箱、表单、聊天工具里的询盘收进同一中台：智能客服按知识库应答，高意向线索可转人工跟进。',
      description:
        '<p><strong>智能客服 · 智能询盘</strong>解决「线索散、夜间空窗、跟进记不住」。</p><ul><li>统一询盘台：来源可追溯</li><li>知识库驱动自动应答，可配置转人工</li><li>与站点表单、下载意向联动（询盘按钮可预留接入）</li><li>适合外贸业务员与团队协作跟进</li></ul><p>可与站群、部署获客产品组合。安装与对接可联系客服协作。</p>',
      advantages: [
        { title: '线索不丢', description: '多渠道汇入同一跟进视图。' },
        { title: '智能应答', description: '常见问题自动回复，高意向转人工。' },
        { title: '可扩展接入', description: '网页询盘按钮预留，后续接真实表单。' },
      ],
    },
    en: {
      title: 'Cizhenyu AI Desk & Inquiry Hub',
      tagline: 'Catch leads day and night — KB answers, humans on high intent',
      summary:
        'Centralize inquiries from forms and chat. Knowledge-base replies with optional human handoff.',
      description:
        '<p><strong>AI desk + inquiry hub</strong> stops scattered leads and night-time gaps. Wire to site CTAs (form hook reserved). Pair with multi-site and deploy products. Collaborative install available.</p>',
      advantages: [
        { title: 'One inbox', description: 'Traceable sources in one view.' },
        { title: 'KB replies', description: 'Auto answers; escalate when needed.' },
        { title: 'CTA-ready', description: 'Inquiry buttons reserved for form wiring.' },
      ],
    },
    ja: {
      title: '磁帧鱼 AI客服・問い合わせ中台',
      tagline: '昼夜問わず問い合わせを受け止め、必要時に有人へ',
      summary: 'フォームやチャットの問い合わせを一元化。知識ベース応答、高意向は有人。',
      description:
        '<p><strong>AI客服・問い合わせ</strong>で漏れと夜間空白を解消。サイトの問い合わせボタンと接続可能（フォームは後日実装可）。他製品と組み合わせ可。</p>',
      advantages: [
        { title: '一元管理', description: '流入経路を追跡。' },
        { title: '知識ベース', description: '自動応答＋有人切替。' },
        { title: '拡張余地', description: 'ボタン先行、フォーム後付け。' },
      ],
    },
  },
  {
    n: 3,
    slug: 'cizhenyu-growth',
    sku: 'CZ-GROWTH',
    cover: 'Growth',
    zh: {
      title: '磁帧鱼 部署运营获客系统',
      tagline: '点选部署到自有云账户，再把 SEO/GEO 与日常运营跑起来',
      summary:
        '部署向导把站点交付到您自己的 Cloudflare；运营侧提供可持续的 SEO/GEO 与获客节奏，避免「上线即停更」。',
      description:
        '<p><strong>部署 · 运营 · 获客</strong>把上线和日常增长连成一条链。</p><ul><li>向导式部署：域名、Pages、环境变量点选完成</li><li>资产在您账户，不锁死在厂商平台</li><li>运营获客节奏：内容、索引、回访触达可按模块扩展</li><li>可与站群、询盘系统组合交付</li></ul><p>下载安装后可约客服协作首发上线与运营初始化。</p>',
      advantages: [
        { title: '自有账户', description: 'Cloudflare 资产归您，迁移清晰。' },
        { title: '降低技术门槛', description: '向导代替手写配置。' },
        { title: '上线后继续跑', description: '运营获客不是一次性建站。' },
      ],
    },
    en: {
      title: 'Cizhenyu Deploy & Growth Ops',
      tagline: 'Wizard deploy to your cloud — then run SEO/GEO acquisition loops',
      summary:
        'Deploy to your Cloudflare account, then keep SEO/GEO and acquisition cadence moving after go-live.',
      description:
        '<p><strong>Deploy + growth ops</strong> connects launch to ongoing acquisition. Assets stay on your account. Pair with multi-site and inquiry products. Collaborative first launch available.</p>',
      advantages: [
        { title: 'Your account', description: 'Clear ownership on Cloudflare.' },
        { title: 'Wizard deploy', description: 'Less hand-written config.' },
        { title: 'Keep shipping', description: 'Ops cadence after go-live.' },
      ],
    },
    ja: {
      title: '磁帧鱼 導入・運用獲得システム',
      tagline: '自クラウドアカウントへ導入し、SEO/GEO 運用を回す',
      summary: 'ウィザードで Cloudflare へ導入。公開後も SEO/GEO・獲得リズムを継続。',
      description:
        '<p><strong>導入・運用・獲得</strong>で公開と継続成長をつなぎます。資産はお客様アカウント。他製品と組み合わせ可。初回導入の同席サポートあり。</p>',
      advantages: [
        { title: '自アカウント', description: '所有権が明確。' },
        { title: 'ウィザード', description: '手書き設定を削減。' },
        { title: '継続運用', description: '公開で終わらない。' },
      ],
    },
  },
];

writeJson('product.json', {
  collectionSlug: 'b2b_product',
  items: products.map((p) => ({
    languageGroupKey: lgk('prod', p.n),
    locales: L({
      'zh-CN': {
        title: p.zh.title,
        slug: p.slug,
        sku: p.sku,
        brand: '磁帧鱼',
        summary: p.zh.summary,
        description: p.zh.description,
        images: [{ url: img(p.cover, 800, 600) }, { url: img(`${p.cover}+UI`, 800, 600) }],
        availability: 'InStock',
        status: 'published',
        spec_data: { module: p.sku, install: 'download+collaborate' },
        seo_title: `${p.zh.title}｜磁帧鱼`,
        seo_description: p.zh.summary,
        robots_directive: 'index,follow',
        schema_type: 'Product',
        og_image: { url: img(p.cover, 1200, 630) },
        tagline: p.zh.tagline,
        advantages: p.zh.advantages,
        taxonomy_ids: ['__BY_SLUG__:b2b_product_category:cizhenyu-products'],
      },
      'zh-TW': {
        title: tw(p.zh.title),
        slug: p.slug,
        sku: p.sku,
        brand: '磁幀魚',
        summary: tw(p.zh.summary),
        description: tw(p.zh.description),
        images: [{ url: img(p.cover, 800, 600) }],
        availability: 'InStock',
        status: 'published',
        spec_data: { module: p.sku, install: 'download+collaborate' },
        seo_title: `${tw(p.zh.title)}｜磁幀魚`,
        seo_description: tw(p.zh.summary),
        robots_directive: 'index,follow',
        schema_type: 'Product',
        og_image: { url: img(p.cover, 1200, 630) },
        tagline: tw(p.zh.tagline),
        advantages: p.zh.advantages.map((a) => ({ title: tw(a.title), description: tw(a.description) })),
        taxonomy_ids: ['__BY_SLUG__:b2b_product_category:cizhenyu-products'],
      },
      ja: {
        title: p.ja.title,
        slug: p.slug,
        sku: p.sku,
        brand: '磁帧鱼',
        summary: p.ja.summary,
        description: p.ja.description,
        images: [{ url: img(p.cover, 800, 600) }],
        availability: 'InStock',
        status: 'published',
        spec_data: { module: p.sku, install: 'download+collaborate' },
        seo_title: `${p.ja.title}｜磁帧鱼`,
        seo_description: p.ja.summary,
        robots_directive: 'index,follow',
        schema_type: 'Product',
        og_image: { url: img(p.cover, 1200, 630) },
        tagline: p.ja.tagline,
        advantages: p.ja.advantages,
        taxonomy_ids: ['__BY_SLUG__:b2b_product_category:cizhenyu-products'],
      },
      'en-US': {
        title: p.en.title,
        slug: p.slug,
        sku: p.sku,
        brand: 'Cizhenyu',
        summary: p.en.summary,
        description: p.en.description,
        images: [{ url: img(p.cover, 800, 600) }],
        availability: 'InStock',
        status: 'published',
        spec_data: { module: p.sku, install: 'download+collaborate' },
        seo_title: `${p.en.title} | Cizhenyu`,
        seo_description: p.en.summary,
        robots_directive: 'index,follow',
        schema_type: 'Product',
        og_image: { url: img(p.cover, 1200, 630) },
        tagline: p.en.tagline,
        advantages: p.en.advantages,
        taxonomy_ids: ['__BY_SLUG__:b2b_product_category:cizhenyu-products'],
      },
    }),
  })),
});

const articles = [
  {
    n: 1,
    slug: 'why-multisite-for-export',
    zh: {
      title: '外贸为什么需要站群，而不是只做一个官网？',
      summary: '主站品牌、行业站引流、语言站本地化——站群让内容与获客分工更清晰。',
      content:
        '<p>许多外贸团队只有一个「名片站」，改一次排一期。站群的价值在于：主站承载品牌信任，子站承接细分行业或语种流量，后台仍可统一改内容。</p><p>磁帧鱼站群产品把这件事产品化；本文为占位动态，后续可替换为真实案例。</p>',
    },
    en: {
      title: 'Why export teams need multi-site — not one brochure',
      summary: 'Brand site, niche sites, locale sites — divide content and acquisition roles.',
      content:
        '<p>A single brochure site rarely scales. Multi-site lets brand, niche, and locale jobs split while content stays manageable. Placeholder news — replace later.</p>',
    },
  },
  {
    n: 2,
    slug: 'inquiry-desk-basics',
    zh: {
      title: '智能询盘中台怎么接住夜间线索？',
      summary: '知识库先答常见问题，高意向再转人工——先把漏斗守住。',
      content:
        '<p>夜间空窗是外贸常见漏点。智能客服用知识库顶住第一轮问答，把联系方式与意向字段留下来，白天人工接力。</p><p>占位文章，后续可换成客户故事与数据。</p>',
    },
    en: {
      title: 'How an AI inquiry desk catches night-time leads',
      summary: 'KB answers first; humans take high intent.',
      content: '<p>Night gaps lose deals. KB replies hold the first turn; humans follow up. Placeholder article.</p>',
    },
  },
  {
    n: 3,
    slug: 'deploy-then-operate',
    zh: {
      title: '上线只是开始：部署之后如何持续获客',
      summary: '向导部署解决「能不能上线」，运营获客解决「上线后谁来更新」。',
      content:
        '<p>很多项目死在上线当天。部署产品把技术门槛压下去；运营获客模块把 SEO/GEO 与内容节奏接上。占位动态，后期替换。</p>',
    },
    en: {
      title: 'Go-live is not the finish line',
      summary: 'Deploy gets you live; growth ops keeps acquisition moving.',
      content: '<p>Too many projects stop at launch. Deploy lowers the bar; ops keeps SEO/GEO moving. Placeholder.</p>',
    },
  },
];

writeJson('article.json', {
  collectionSlug: 'b2b_article',
  items: articles.map((a) => ({
    languageGroupKey: lgk('art', a.n),
    locales: L({
      'zh-CN': {
        title: a.zh.title,
        slug: a.slug,
        summary: a.zh.summary,
        content: a.zh.content,
        content_type: 'article',
        status: 'published',
        cover: { url: img(`News${a.n}`, 800, 500) },
        seo_title: a.zh.title,
        seo_description: a.zh.summary,
        robots_directive: 'index,follow',
        schema_type: 'Article',
        related_product_ids: ['__BY_SLUG__:b2b_product:cizhenyu-sites'],
      },
      'zh-TW': {
        title: tw(a.zh.title),
        slug: a.slug,
        summary: tw(a.zh.summary),
        content: tw(a.zh.content),
        content_type: 'article',
        status: 'published',
        cover: { url: img(`News${a.n}`, 800, 500) },
        seo_title: tw(a.zh.title),
        seo_description: tw(a.zh.summary),
        robots_directive: 'index,follow',
        schema_type: 'Article',
        related_product_ids: ['__BY_SLUG__:b2b_product:cizhenyu-sites'],
      },
      ja: {
        title: a.en.title,
        slug: a.slug,
        summary: a.en.summary,
        content: a.en.content,
        content_type: 'article',
        status: 'published',
        cover: { url: img(`News${a.n}`, 800, 500) },
        seo_title: a.en.title,
        seo_description: a.en.summary,
        robots_directive: 'index,follow',
        schema_type: 'Article',
        related_product_ids: ['__BY_SLUG__:b2b_product:cizhenyu-sites'],
      },
      'en-US': {
        title: a.en.title,
        slug: a.slug,
        summary: a.en.summary,
        content: a.en.content,
        content_type: 'article',
        status: 'published',
        cover: { url: img(`News${a.n}`, 800, 500) },
        seo_title: a.en.title,
        seo_description: a.en.summary,
        robots_directive: 'index,follow',
        schema_type: 'Article',
        related_product_ids: ['__BY_SLUG__:b2b_product:cizhenyu-sites'],
      },
    }),
  })),
});

const faqs = [
  {
    n: 1,
    zh: {
      q: '使用这套方案，一年需要多少基础设施费用？',
      a: '磁帧鱼基于 Cloudflare 进行了极致的性能与缓存架构优化。对于常规企业官网、B2B 产品站与营销站，在 Cloudflare 免费套餐下即可稳定承载每日 15,000 人以上（日 UV 1.5 万+）的访客访问。绝大多数企业在日常运营阶段，基础设施固定开销几乎只剩基础域名费（每年仅需几十元）。即使未来业务爆发增长，也是按实际用量弹性升级，不必一开始就为昂贵的传统服务器买单。',
    },
    ja: {
      q: 'この構成で、年間のインフラ費用はどのくらいかかりますか？',
      a: '磁幀魚（Cizhenyu）はCloudflare上で徹底的なエッジキャッシュとパフォーマンス最適化を行っています。一般的な企業公式サイト、B2B製品サイト、マーケティングサイトであれば、Cloudflareの無料プランでも1日あたり15,000人以上（日次UV 1.5万+）のアクセスを安定して処理可能です。多くの企業様において、日々の固定インフラ費用は実質ドメイン更新料（年間千数百円程度）のみで運用でき、アクセス急増時も従量制で無理なく拡張できます。',
    },
    en: {
      q: 'How much infrastructure cost should I expect per year?',
      a: 'Cizhenyu is deeply optimized for edge caching and lightweight execution on Cloudflare. For typical corporate websites, B2B product catalogs, and marketing portals, Cloudflare\'s free plan comfortably handles over 15,000 unique daily visitors (15K+ UV/day). For most businesses, fixed infrastructure overhead effectively drops down to just annual domain registration fees (under $12/year). When traffic scales exponentially, you expand on demand without upfront server retainers.',
    },
  },
  {
    n: 2,
    zh: {
      q: '网站可以服务全球客户吗？',
      a: '当然可以。站点一键部署在 Cloudflare Pages / Workers 全球边缘网络上，依托遍布全球 300+ 城市的分布式节点实现资源就近交付。无论客户在北美、欧洲、东南亚还是中东，访问网站都能实现毫秒级秒开，无需企业自行采购多地服务器或繁琐配置海外 CDN，天生具备全球高速访问能力。',
    },
    ja: {
      q: '世界中の顧客へ快適に配信できますか？',
      a: 'もちろんです。サイトはCloudflare Pages / Workersのグローバルエッジネットワークへワンクリックで自動展開されます。世界300以上の主要都市に分散するエッジノードから最寄りのユーザーへ即座に配信されるため、北米・欧州・アジアなど世界中どこからでもミリ秒単位の高速表示が可能です。国ごとのサーバー契約や複雑なCDN設定は一切不要です。',
    },
    en: {
      q: 'Can the website effortlessly serve global customers?',
      a: 'Absolutely. The site deploys seamlessly to Cloudflare Pages & Workers, leveraging edge data centers across 300+ cities worldwide. Whether your visitors are in North America, Europe, Southeast Asia, or Latin America, pages load in milliseconds from the nearest edge node. You never need to manage multi-region origin servers or configure complex CDN routing—global high performance is built-in from day one.',
    },
  },
  {
    n: 3,
    zh: {
      q: 'SEO / GEO 是否能保证排名或订单？',
      a: '任何客观专业的服务都无法保证绝对的搜索排名或订单转化，因为最终效果受行业竞争激烈程度、关键词热度及企业自身产品力等多重外部因素影响。但在技术 SEO 与 GEO（生成式 AI 引擎优化）层面，磁帧鱼已经做到了极致——在 Google 官方权威工具 PageSpeed Insights 测评中，网站的性能（Performance）、无障碍（Accessibility）、最佳做法（Best Practices）以及 SEO 各项评分均稳定达到 98 分及以上。结合结构化数据规范与极速加载体验，能够让 Google 等搜索引擎爬虫与 ChatGPT、Perplexity 等 AI 智能体优先极速抓取、理解与引用，为长效获客打下最扎实的技术底座。',
    },
    ja: {
      q: 'SEO / GEO は検索順位や受注を保証できますか？',
      a: '市場競争やキーワード需要、製品力など外部要因が関わるため、絶対的な順位や受注数の確約はできません。しかし、技術的SEOおよびGEO（生成AIエンジン最適化）において、磁幀魚は最高水準を達成しています。Google公式の PageSpeed Insights 診断において、パフォーマンス、アクセシビリティ、ベストプラクティス、SEOの主要指標で一貫して98点以上のスコアを達成。クリーンな構造化データと極限の高速表示により、Google検索クローラーはもちろん、ChatGPTやPerplexityなどのAIエージェントからも高精度に認識・引用されやすい技術基盤を提供します。',
    },
    en: {
      q: 'Can SEO and GEO guarantee specific rankings or orders?',
      a: 'No ethical engineer can promise absolute search rankings or guaranteed conversions, as market competition, keyword difficulty, and offering fit vary widely. However, on technical SEO and GEO (Generative Engine Optimization), Cizhenyu reaches industry-leading heights: on Google’s authoritative PageSpeed Insights, our generated sites consistently score 98+ across Performance, Accessibility, Best Practices, and SEO. With clean semantic markup and sub-second edge responses, both traditional search crawlers and generative AI engines (ChatGPT, Perplexity, etc.) can index, comprehend, and cite your content with maximum efficiency.',
    },
  },
  {
    n: 4,
    zh: {
      q: '网站和数据能否由我自己管理？',
      a: '100% 由您自己掌控。Cloudflare 与 AWS（亚马逊云）、阿里云、腾讯云一样，是全球领先的独立云服务提供商。磁帧鱼是将整套网站应用一键部署到您自己的 Cloudflare 官方账户中。无论是数据库（D1/KV）、网站内容、媒体资源、域名解析还是代码部署，所有资产完全保存在您的自有账户内。我们不截留、不控制任何客户业务数据，您拥有对数字资产完整的自主权与最高管理权限。',
    },
    ja: {
      q: 'サイトとデータは自社で100%管理・保有できますか？',
      a: 'はい、100%貴社自身のアカウントで完全に管理・保有いただけます。CloudflareはAWSやGoogle Cloud等と同様のグローバルな独立クラウド基盤です。磁幀魚は開発したWebシステムを貴社名義のCloudflareアカウント上へ直接デプロイします。データベース（D1/KV）、コンテンツ、画像アセット、DNS設定、ソースコードに至るまで、すべてのデータは貴社のアカウント内に安全に保持されます。当社がデータを囲い込むことは一切なく、完全な所有権と最高管理権限が貴社に帰属します。',
    },
    en: {
      q: 'Will our website and business data remain fully under our own ownership?',
      a: '100% yes. Just like AWS, Google Cloud, or Microsoft Azure, Cloudflare is an independent global cloud infrastructure provider. Cizhenyu deploys the application directly into your own Cloudflare account. Your databases (D1/KV), content, media assets, DNS records, and source artifacts remain entirely inside your infrastructure. We never hold your business data hostage—you retain full ownership and administrative control over your digital assets.',
    },
  },
  {
    n: 5,
    zh: {
      q: '网站上的品牌 Logo，企业信息等内容我可以随时替换吗？',
      a: '随时都可以。磁帧鱼采用现代“无头内容管理（Headless CMS）+ 极速前端”架构，前端展示的所有内容均与 CMS 后台实时打通。无论是品牌 Logo、企业简介、联系方式，还是轮播横幅、页面文案、产品参数、新闻案例等，您均可在直观友好的后台可视化修改、上传并一键发布，内容会自动同步更新至线上站点，日常维护完全无需编写代码或依赖技术开发人员。',
    },
    ja: {
      q: 'ブランドロゴや企業情報、サイトの掲載内容はいつでも自由に変更できますか？',
      a: 'はい、いつでも自由に変更可能です。磁幀魚は先進の「ヘッドレスCMS ＋ 高速フロントエンド」アーキテクチャを採用しており、Webサイト上のあらゆる情報はCMS管理画面から一元管理されています。ロゴ画像、会社概要、連絡先はもちろん、バナー、ページテキスト、製品スペック、お知らせ記事なども、直感的な管理画面からクリック操作で編集・即時反映できます。日常の運用でコードを書いたり技術者に依頼する必要はありません。',
    },
    en: {
      q: 'Can I update the brand logo, company info, and website content at any time?',
      a: 'Yes, anytime with ease. Cizhenyu is built on a modern "Headless CMS + High-Performance Frontend" architecture, seamlessly connecting everything on your site to a centralized content backend. Whether updating your logo, company profile, contact details, banner graphics, page copy, product catalogs, or case studies, you can edit and publish visually in the admin console. Updates take effect immediately without writing code or waiting on engineering teams.',
    },
  },
];

function trimSeoDesc(s, max = 220) {
  if (!s) return '';
  const clean = String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return clean.length > max ? clean.slice(0, max - 1) + '…' : clean;
}

writeJson('faq.json', {
  collectionSlug: 'b2b_faq',
  items: faqs.map((f) => ({
    languageGroupKey: lgk('faq', f.n),
    locales: L({
      'zh-CN': {
        question: f.zh.q,
        answer: `<p>${f.zh.a}</p>`,
        short_answer: f.zh.a,
        sort_order: f.n * 10,
        status: 'published',
        seo_title: f.zh.q,
        seo_description: trimSeoDesc(f.zh.a),
        robots_directive: 'index,follow',
      },
      'zh-TW': {
        question: tw(f.zh.q),
        answer: `<p>${tw(f.zh.a)}</p>`,
        short_answer: tw(f.zh.a),
        sort_order: f.n * 10,
        status: 'published',
        seo_title: tw(f.zh.q),
        seo_description: trimSeoDesc(tw(f.zh.a)),
        robots_directive: 'index,follow',
      },
      ja: {
        question: f.ja.q,
        answer: `<p>${f.ja.a}</p>`,
        short_answer: f.ja.a,
        sort_order: f.n * 10,
        status: 'published',
        seo_title: f.ja.q,
        seo_description: trimSeoDesc(f.ja.a),
        robots_directive: 'index,follow',
      },
      'en-US': {
        question: f.en.q,
        answer: `<p>${f.en.a}</p>`,
        short_answer: f.en.a,
        sort_order: f.n * 10,
        status: 'published',
        seo_title: f.en.q,
        seo_description: trimSeoDesc(f.en.a),
        robots_directive: 'index,follow',
      },
    }),
  })),
});

// —— resources（下载页：三款产品安装包入口 → 询盘）——
const resources = products.map((p, idx) => ({
  n: idx + 1,
  slug: `download-${p.slug}`,
  productSlug: p.slug,
  zh: {
    title: `${p.zh.title} · 安装包`,
    summary: `点击下载将进入询盘，客服可协作完成安装与初始化。${p.zh.tagline}`,
  },
  en: {
    title: `${p.en.title} · Installer`,
    summary: `Download leads to inquiry — we can collaborate on install. ${p.en.tagline}`,
  },
}));

writeJson('resource.json', {
  collectionSlug: 'b2b_resource',
  items: resources.map((r) => ({
    languageGroupKey: lgk('res', r.n),
    locales: L({
      'zh-CN': {
        title: r.zh.title,
        slug: r.slug,
        summary: r.zh.summary,
        description: `<p>${r.zh.summary}</p><p>正式安装包与许可证通过询盘交付；页面下载按钮将跳转联系/询盘。</p>`,
        resource_type: 'installer',
        file_format: '询盘获取',
        cover: { url: img(`DL${r.n}`, 800, 500) },
        download_file: { url: '' },
        status: 'published',
        seo_title: r.zh.title,
        seo_description: r.zh.summary,
        robots_directive: 'index,follow',
        related_product_ids: [`__BY_SLUG__:b2b_product:${r.productSlug}`],
      },
      'zh-TW': {
        title: tw(r.zh.title),
        slug: r.slug,
        summary: tw(r.zh.summary),
        description: `<p>${tw(r.zh.summary)}</p><p>正式安裝包透過詢盤交付。</p>`,
        resource_type: 'installer',
        file_format: '詢盤獲取',
        cover: { url: img(`DL${r.n}`, 800, 500) },
        download_file: { url: '' },
        status: 'published',
        seo_title: tw(r.zh.title),
        seo_description: tw(r.zh.summary),
        robots_directive: 'index,follow',
        related_product_ids: [`__BY_SLUG__:b2b_product:${r.productSlug}`],
      },
      ja: {
        title: r.en.title,
        slug: r.slug,
        summary: r.en.summary,
        description: `<p>${r.en.summary}</p>`,
        resource_type: 'installer',
        file_format: 'inquiry',
        cover: { url: img(`DL${r.n}`, 800, 500) },
        download_file: { url: '' },
        status: 'published',
        seo_title: r.en.title,
        seo_description: r.en.summary,
        robots_directive: 'index,follow',
        related_product_ids: [`__BY_SLUG__:b2b_product:${r.productSlug}`],
      },
      'en-US': {
        title: r.en.title,
        slug: r.slug,
        summary: r.en.summary,
        description: `<p>${r.en.summary}</p><p>Installer packages are delivered after inquiry.</p>`,
        resource_type: 'installer',
        file_format: 'via inquiry',
        cover: { url: img(`DL${r.n}`, 800, 500) },
        download_file: { url: '' },
        status: 'published',
        seo_title: r.en.title,
        seo_description: r.en.summary,
        robots_directive: 'index,follow',
        related_product_ids: [`__BY_SLUG__:b2b_product:${r.productSlug}`],
      },
    }),
  })),
});

writeJson('nav_menu.json', {
  collectionSlug: 'b2b_nav_menu',
  items: [
    {
      languageGroupKey: lgk('navm', 1),
      locales: L({
        'zh-CN': { name: '主导航', slug: 'header', menu_type: 'header', status: 'published' },
        'zh-TW': { name: '主導航', slug: 'header', menu_type: 'header', status: 'published' },
        ja: { name: 'メインナビ', slug: 'header', menu_type: 'header', status: 'published' },
        'en-US': { name: 'Header', slug: 'header', menu_type: 'header', status: 'published' },
      }),
    },
    {
      languageGroupKey: lgk('navm', 2),
      locales: L({
        'zh-CN': { name: '页脚', slug: 'footer', menu_type: 'footer', status: 'published' },
        'zh-TW': { name: '頁腳', slug: 'footer', menu_type: 'footer', status: 'published' },
        ja: { name: 'フッター', slug: 'footer', menu_type: 'footer', status: 'published' },
        'en-US': { name: 'Footer', slug: 'footer', menu_type: 'footer', status: 'published' },
      }),
    },
  ],
});

function navItem(n, slug, titles, pathSuffix, sort, mode = 'link', refType) {
  const mk = (loc, title) => {
    const row = {
      nav_menu_ids: ['__BY_SLUG__:b2b_nav_menu:header'],
      title,
      slug,
      link_mode: mode,
      sort_order: sort,
      open_in_new_tab: ['no'],
      status: 'published',
    };
    if (mode === 'link') row.link_url = `${PREFIX[loc]}${pathSuffix}`;
    if (mode === 'reference') {
      row.target_reference = { type: 'internal', refType, refId: '' };
    }
    return row;
  };
  return {
    languageGroupKey: lgk('nmit', n),
    locales: L({
      'zh-CN': mk('zh-CN', titles.zh),
      'zh-TW': mk('zh-TW', titles.tw),
      ja: mk('ja', titles.ja),
      'en-US': mk('en-US', titles.en),
    }),
  };
}

const headerNav = [
  navItem(1, 'home', { zh: '首页', tw: '首頁', ja: 'ホーム', en: 'Home' }, '', 10),
  navItem(2, 'products', { zh: '产品', tw: '產品', ja: '製品', en: 'Products' }, '/products', 20, 'reference', 'b2b_product'),
  navItem(3, 'help', { zh: '帮助', tw: '幫助', ja: 'ヘルプ', en: 'Help' }, '/faq', 30),
  navItem(4, 'download', { zh: '下载', tw: '下載', ja: 'ダウンロード', en: 'Download' }, '/resources', 40),
  navItem(5, 'news', { zh: '动态', tw: '動態', ja: 'ニュース', en: 'News' }, '/articles', 50),
  navItem(6, 'about', { zh: '关于', tw: '關於', ja: '会社概要', en: 'About' }, '/about', 60),
  navItem(7, 'contact', { zh: '联系', tw: '聯繫', ja: 'お問い合わせ', en: 'Contact' }, '/contact', 70),
];

const footerNav = [
  { n: 11, slug: 'f-products', zh: '产品', tw: '產品', ja: '製品', en: 'Products', path: '/products' },
  { n: 12, slug: 'f-download', zh: '下载', tw: '下載', ja: 'ダウンロード', en: 'Download', path: '/resources' },
  { n: 13, slug: 'f-help', zh: '帮助', tw: '幫助', ja: 'ヘルプ', en: 'Help', path: '/faq' },
  { n: 14, slug: 'f-contact', zh: '联系', tw: '聯繫', ja: 'お問い合わせ', en: 'Contact', path: '/contact' },
  { n: 15, slug: 'f-privacy', zh: '隐私权政策', tw: '隱私權政策', ja: 'プライバシーポリシー', en: 'Privacy Policy', path: '/privacy' },
  { n: 16, slug: 'f-terms', zh: '服务条款', tw: '服務條款', ja: '利用規約', en: 'Terms of Service', path: '/terms' },
].map((item, idx) => ({
  languageGroupKey: lgk('nmif', item.n),
  locales: L(
    Object.fromEntries(
      LOCALES.map((loc) => {
        const title =
          loc === 'zh-CN' ? item.zh : loc === 'zh-TW' ? item.tw : loc === 'ja' ? item.ja : item.en;
        return [
          loc,
          {
            nav_menu_ids: ['__BY_SLUG__:b2b_nav_menu:footer'],
            title,
            slug: item.slug,
            link_mode: 'link',
            sort_order: (idx + 1) * 10,
            open_in_new_tab: ['no'],
            status: 'published',
            link_url: `${PREFIX[loc]}${item.path}`,
          },
        ];
      }),
    ),
  ),
}));

writeJson('nav_menu_item.json', { collectionSlug: 'b2b_nav_menu_item', items: [...headerNav, ...footerNav] });

writeJson('page.json', {
  collectionSlug: 'b2b_page',
  items: [
    {
      languageGroupKey: lgk('page', 1),
      locales: L({
        'zh-CN': {
          title: '关于磁帧鱼',
          slug: 'about',
          summary: '把外贸站群、询盘与部署获客，做成可安装的产品',
          content:
            '<p>磁帧鱼服务外贸业务员、工厂外贸部与服务商。我们交付三款可下载安装的产品：</p><ol><li>全能站群管理系统 + B2B 前端站点生成系统</li><li>智能客服智能询盘系统</li><li>部署运营获客系统</li></ol><p>默认 Logo 为闪电占位，可在 CMS 公司信息中替换。系统提供标准建站（$599）、智能营销（$899）与源码自主（$1,599）交付方案，具体产品按组合交付。</p>',
          target_reference: [
            { type: 'internal', refType: 'b2b_product', refId: '__BY_SLUG__:cizhenyu-sites', title: '站群 + B2B 生成' },
            { type: 'internal', refType: 'b2b_product', refId: '__BY_SLUG__:cizhenyu-inquiry', title: '智能询盘' },
            { type: 'internal', refType: 'b2b_product', refId: '__BY_SLUG__:cizhenyu-growth', title: '部署获客' },
          ],
          status: 'published',
          seo_title: '关于磁帧鱼',
          seo_description: '磁帧鱼三款外贸获客产品介绍。',
          robots_directive: 'index,follow',
          schema_type: 'AboutPage',
          og_image: { url: img('About', 1200, 630) },
        },
        'zh-TW': {
          title: '關於磁幀魚',
          slug: 'about',
          summary: '把外貿站群、詢盤與部署獲客，做成可安裝的產品',
          content:
            '<p>磁幀魚交付三款可下載安裝的產品：站群 + B2B 生成、智慧詢盤、部署運營獲客。Logo 可於 CMS 替換。系統提供標準建站（$599）、智慧行銷（$899）與源碼自主（$1,599）交付方案，具體產品按組合交付。</p>',
          target_reference: [
            { type: 'internal', refType: 'b2b_product', refId: '__BY_SLUG__:cizhenyu-sites', title: '站群 + B2B 生成' },
          ],
          status: 'published',
          seo_title: '關於磁幀魚',
          seo_description: '磁幀魚三款外貿獲客產品介紹。',
          robots_directive: 'index,follow',
          schema_type: 'AboutPage',
          og_image: { url: img('About', 1200, 630) },
        },
        ja: {
          title: '磁帧鱼について',
          slug: 'about',
          summary: 'サイト群・問い合わせ・導入獲得を、導入可能な製品に',
          content: '<p>3製品を提供します。ロゴはCMSで差し替え可能。標準（$599）、スマート集客（$899）、ソースコード自主（$1,599）の組み合わせパッケージで納品します。</p>',
          target_reference: [
            { type: 'internal', refType: 'b2b_product', refId: '__BY_SLUG__:cizhenyu-sites', title: 'サイト群' },
          ],
          status: 'published',
          seo_title: '磁帧鱼について',
          seo_description: '磁帧鱼の3製品。',
          robots_directive: 'index,follow',
          schema_type: 'AboutPage',
          og_image: { url: img('About', 1200, 630) },
        },
        'en-US': {
          title: 'About Cizhenyu',
          slug: 'about',
          summary: 'Installable products for multi-site, inquiry, and deploy growth',
          content:
            '<p>Three products: multi-site + B2B generator, AI inquiry desk, deploy & growth ops. Logo is CMS-replaceable. Available in Standard ($599), Smart Marketing ($899), and Source Ownership ($1,599) delivery packages.</p>',
          target_reference: [
            { type: 'internal', refType: 'b2b_product', refId: '__BY_SLUG__:cizhenyu-sites', title: 'Multi-site' },
            { type: 'internal', refType: 'b2b_product', refId: '__BY_SLUG__:cizhenyu-inquiry', title: 'Inquiry' },
            { type: 'internal', refType: 'b2b_product', refId: '__BY_SLUG__:cizhenyu-growth', title: 'Growth' },
          ],
          status: 'published',
          seo_title: 'About Cizhenyu',
          seo_description: 'Three Cizhenyu products for export growth.',
          robots_directive: 'index,follow',
          schema_type: 'AboutPage',
          og_image: { url: img('About', 1200, 630) },
        },
      }),
    },
    {
      languageGroupKey: lgk('page', 2),
      locales: L({
        'zh-CN': {
          title: '联系我们',
          slug: 'contact',
          summary: '下载安装、产品组合、协作部署——先告诉我们您的现状',
          content:
            '<p>请留下行业、目标市场、需要的产品组合与交付套餐（标准建站 $599 / 智能营销 $899 / 源码自主 $1,599），以及是否需要客服协作安装。</p><p>邮箱：<a href="mailto:hello@ycz.me">hello@ycz.me</a> · 官网：<a href="https://ycz.me">ycz.me</a></p><p>在线询盘表单即将接入；当前请使用下方「提交询盘」按钮或邮件联系。</p>',
          status: 'published',
          seo_title: '联系｜磁帧鱼',
          seo_description: '提交询盘，获取产品安装与协作方案。',
          robots_directive: 'index,follow',
          schema_type: 'ContactPage',
          og_image: { url: img('Contact', 1200, 630) },
        },
        'zh-TW': {
          title: '聯繫我們',
          slug: 'contact',
          summary: '下載安裝、產品組合、協作部署——先告訴我們現狀',
          content:
            '<p>請留下行業與交付套餐（標準建站 $599 / 智慧行銷 $899 / 源碼自主 $1,599）。郵箱：<a href="mailto:hello@ycz.me">hello@ycz.me</a>。線上表單即將接入。</p>',
          status: 'published',
          seo_title: '聯繫｜磁幀魚',
          seo_description: '提交詢盤，獲取安裝與協作方案。',
          robots_directive: 'index,follow',
          schema_type: 'ContactPage',
          og_image: { url: img('Contact', 1200, 630) },
        },
        ja: {
          title: 'お問い合わせ',
          slug: 'contact',
          summary: 'ダウンロード導入・製品組合せ・同席サポート',
          content:
            '<p>業界とご希望の導入パッケージ（標準 $599 / スマート集客 $899 / ソースコード自主 $1,599）をお送りください。<a href="mailto:hello@ycz.me">hello@ycz.me</a>。フォームは後日接続予定です。</p>',
          status: 'published',
          seo_title: 'お問い合わせ｜磁帧鱼',
          seo_description: '導入とサポートのご相談。',
          robots_directive: 'index,follow',
          schema_type: 'ContactPage',
          og_image: { url: img('Contact', 1200, 630) },
        },
        'en-US': {
          title: 'Contact',
          slug: 'contact',
          summary: 'Download install, product mix, collaborative deploy — tell us your status',
          content:
            '<p>Share industry, markets, and your target package (Standard $599 / Smart Marketing $899 / Source Ownership $1,599). Email <a href="mailto:hello@ycz.me">hello@ycz.me</a>.</p>',
          status: 'published',
          seo_title: 'Contact | Cizhenyu',
          seo_description: 'Inquire for install and collaboration.',
          robots_directive: 'index,follow',
          schema_type: 'ContactPage',
          og_image: { url: img('Contact', 1200, 630) },
        },
      }),
    },
    {
      languageGroupKey: lgk('page', 3),
      locales: L({
        'zh-CN': {
          title: '隐私权政策',
          slug: 'privacy',
          summary: '磁帧鱼（Cizhenyu）隐私权政策与个人信息保护声明',
          content:
            '<h2>隐私权政策</h2><p>生效日期：2026年1月1日</p><h3>1. 信息收集</h3><p>磁帧鱼系统尊重并保护所有使用服务用户的个人隐私权。在您通过网站表单或在线咨询工具提交询盘时，我们可能会收集您的姓名、电子邮箱、联系电话、所属行业及产品需求等信息，用于为您提供针对性的产品与实施服务。</p><h3>2. 信息使用与保护</h3><p>我们承诺不会向任何无关第三方出售、出租、分享或交易您的个人资料。您的系统部署于您自主掌控的云服务账户（如 Cloudflare）中，业务数据与数据库 100% 由您自主掌控。</p><h3>3. Cookie 与追踪技术</h3><p>本网站使用必要的 Cookie 及统计工具（如 Google Analytics、Cloudflare Web Analytics）来分析流量与提升网站性能。您可以通过浏览器设置拒绝或清除 Cookie。</p><h3>4. 联系方式</h3><p>如对本隐私权政策有任何疑问或希望更正您的个人信息，请通过 <a href="mailto:service@ycz.me">service@ycz.me</a> 与我们联系。</p>',
          status: 'published',
          seo_title: '隐私权政策｜磁帧鱼',
          seo_description: '磁帧鱼官方隐私权政策与数据保护声明。',
          robots_directive: 'index,follow',
          schema_type: 'WebPage',
          og_image: { url: img('Privacy', 1200, 630) },
        },
        'zh-TW': {
          title: '隱私權政策',
          slug: 'privacy',
          summary: '磁幀魚（Cizhenyu）隱私權政策與個人資訊保護聲明',
          content:
            '<h2>隱私權政策</h2><p>生效日期：2026年1月1日</p><h3>1. 資訊收集</h3><p>磁幀魚系統尊重並保護所有使用服務使用者的個人隱私權。在您透過網站表單或在線諮詢工具提交詢盤時，我們可能會收集您的姓名、電子郵件、聯絡電話、所屬行業及產品需求等資訊，用於為您提供針對性的產品與實施服務。</p><h3>2. 資訊使用與保護</h3><p>我們承諾不會向任何無關第三方出售、出租、分享或交易您的個人資料。您的系統部署於您自主掌控的雲端服務帳戶（如 Cloudflare）中，業務資料與資料庫 100% 由您自主掌控。</p><h3>3. Cookie 與追蹤技術</h3><p>本網站使用必要的 Cookie 及統計工具以分析流量與提升網站性能。您可以透過瀏覽器設定拒絕或清除 Cookie。</p><h3>4. 聯絡方式</h3><p>如對本隱私權政策有任何疑問，請透過 <a href="mailto:service@ycz.me">service@ycz.me</a> 與我們聯絡。</p>',
          status: 'published',
          seo_title: '隱私權政策｜磁幀魚',
          seo_description: '磁幀魚官方隱私權政策與資料保護聲明。',
          robots_directive: 'index,follow',
          schema_type: 'WebPage',
          og_image: { url: img('Privacy', 1200, 630) },
        },
        ja: {
          title: 'プライバシーポリシー',
          slug: 'privacy',
          summary: '磁帧鱼（Cizhenyu）プライバシーポリシーおよび個人情報保護方針',
          content:
            '<h2>プライバシーポリシー</h2><p>発効日：2026年1月1日</p><h3>1. 個人情報の収集</h3><p>磁帧鱼は、お客様の個人情報保護を重視しています。お問い合わせやお見積もり依頼の際、氏名、メールアドレス、電話番号、企業情報などを収集する場合があります。</p><h3>2. 情報の利用と保護</h3><p>当社は収集した個人情報を第三者に販売・提供いたしません。システムはお客様自身のクラウド環境（Cloudflare等）に構築され、データ主権は100%お客様に帰属します。</p><h3>3. Cookie の使用</h3><p>サイトの利便性向上およびアクセス解析のため、Cookie を使用する場合があります。</p><h3>4. お問い合わせ</h3><p>プライバシーポリシーに関するご質問は <a href="mailto:service@ycz.me">service@ycz.me</a> までご連絡ください。</p>',
          status: 'published',
          seo_title: 'プライバシーポリシー｜磁帧鱼',
          seo_description: '磁帧鱼のプライバシーポリシーとデータ保護について。',
          robots_directive: 'index,follow',
          schema_type: 'WebPage',
          og_image: { url: img('Privacy', 1200, 630) },
        },
        'en-US': {
          title: 'Privacy Policy',
          slug: 'privacy',
          summary: 'Cizhenyu Privacy Policy and personal data protection statement',
          content:
            '<h2>Privacy Policy</h2><p>Effective Date: January 1, 2026</p><h3>1. Information Collection</h3><p>Cizhenyu respects and protects your privacy. When you submit inquiries through our web forms or live chat, we may collect your name, email address, phone number, and business requirements to deliver our products and deployment services.</p><h3>2. Use and Protection of Information</h3><p>We do not sell, rent, or trade your personal information to third parties. Your web system is deployed to your own Cloudflare account, ensuring 100% data ownership.</p><h3>3. Cookies and Analytics</h3><p>We use essential cookies and web analytics tools to ensure site reliability and measure performance.</p><h3>4. Contact Us</h3><p>If you have questions regarding this Privacy Policy, please contact us at <a href="mailto:service@ycz.me">service@ycz.me</a>.</p>',
          status: 'published',
          seo_title: 'Privacy Policy | Cizhenyu',
          seo_description: 'Official privacy policy and data governance statement for Cizhenyu.',
          robots_directive: 'index,follow',
          schema_type: 'WebPage',
          og_image: { url: img('Privacy', 1200, 630) },
        },
      }),
    },
    {
      languageGroupKey: lgk('page', 4),
      locales: L({
        'zh-CN': {
          title: '服务条款',
          slug: 'terms',
          summary: '磁帧鱼（Cizhenyu）系统与技术服务条款',
          content:
            '<h2>服务条款</h2><p>生效日期：2026年1月1日</p><h3>1. 协议接受</h3><p>欢迎使用磁帧鱼 B2B 外贸独立站系统。购买、安装或使用我们的系统与服务，即表示您已阅读并同意接受本服务条款的所有内容。</p><h3>2. 交付与授权范围</h3><p>磁帧鱼提供三种标准化交付方案：标准建站版（$599）、智能营销版（$899）及源码自主版（$1,599）。前两项交付编译后的生产运行版本，源码自主版在约定范围内交付原始工程源码及二次开发授权。所有方案均以最终合同与交付功能清单为准。</p><h3>3. 第三方费用与持续服务边界</h3><p>本系统定价为一次性项目交付费用，不包含持续性第三方费用。包括 Cloudflare 账单、AI 模型 API 调用费用、Google Ads 广告预算及第三方服务订阅费用均由客户自行承担。</p><h3>4. 技术支持与保修</h3><p>根据不同交付方案提供约定维保支持：标准建站版提供交付后 30 天基础保修；智能营销版提供 3 个月技术支持；源码自主版提供 12 个月约定技术支持。系统缺陷按约定范围修复，新增定制需求另行约定。</p><h3>5. 知识产权与适用法律</h3><p>磁帧鱼系统核心架构与自主设计组件受知识产权法保护。源码授权客户在授权许可范围内合法使用。</p>',
          status: 'published',
          seo_title: '服务条款｜磁帧鱼',
          seo_description: '磁帧鱼系统交付与技术服务条款。',
          robots_directive: 'index,follow',
          schema_type: 'WebPage',
          og_image: { url: img('Terms', 1200, 630) },
        },
        'zh-TW': {
          title: '服務條款',
          slug: 'terms',
          summary: '磁幀魚（Cizhenyu）系統與技術服務條款',
          content:
            '<h2>服務條款</h2><p>生效日期：2026年1月1日</p><h3>1. 協議接受</h3><p>歡迎使用磁幀魚 B2B 外貿獨立站系統。購買、安裝或使用我們的系統與服務，即表示您已閱讀並同意接受本服務條款的所有內容。</p><h3>2. 交付與授權範圍</h3><p>磁幀魚提供三種標準化交付方案：標準建站版（$599）、智慧行銷版（$899）及源碼自主版（$1,599）。所有方案均以最終合約與交付功能清單為準。</p><h3>3. 第三方費用與持續服務邊界</h3><p>本系統定價為一次性專案交付費用，不包含持續性第三方費用（如 Cloudflare 帳單、AI 模型調用費、Google Ads 廣告預算等均由客戶自行承擔）。</p><h3>4. 技術支援與保修</h3><p>標準建站版提供交付後 30 天基礎保修；智慧行銷版提供 3 個月技術支援；源碼自主版提供 12 個月約定技術支援。</p><h3>5. 智慧財產權</h3><p>磁幀魚系統核心架構受智慧財產權法律保護。源碼授權客戶在許可範圍內合法使用。</p>',
          status: 'published',
          seo_title: '服務條款｜磁幀魚',
          seo_description: '磁幀魚系統交付與技術服務條款。',
          robots_directive: 'index,follow',
          schema_type: 'WebPage',
          og_image: { url: img('Terms', 1200, 630) },
        },
        ja: {
          title: '利用規約',
          slug: 'terms',
          summary: '磁帧鱼（Cizhenyu）システムおよびサービス利用規約',
          content:
            '<h2>利用規約</h2><p>発効日：2026年1月1日</p><h3>1. 規約への同意</h3><p>磁帧鱼システムをご利用いただくことで、本規約に同意されたものとみなします。</p><h3>2. 提供パッケージとライセンス</h3><p>標準サイト構築版（$599）、スマート集客版（$899）、ソースコード自主版（$1,599）の3つのティアを提供します。詳細は各契約書に基づきます。</p><h3>3. 第三者費用</h3><p>Cloudflare運用費、AI API利用料、Google Ads広告費などの外部実費はお客様のご負担となります。</p><h3>4. 保証と技術サポート</h3><p>各パッケージに定められた期間（30日〜12ヶ月）の技術サポートと不具合修正を提供します。</p>',
          status: 'published',
          seo_title: '利用規約｜磁帧鱼',
          seo_description: '磁帧鱼システムの利用規約とライセンス条件。',
          robots_directive: 'index,follow',
          schema_type: 'WebPage',
          og_image: { url: img('Terms', 1200, 630) },
        },
        'en-US': {
          title: 'Terms of Service',
          slug: 'terms',
          summary: 'Cizhenyu System and Technical Services Terms of Service',
          content:
            '<h2>Terms of Service</h2><p>Effective Date: January 1, 2026</p><h3>1. Acceptance of Terms</h3><p>By purchasing, installing, or using Cizhenyu B2B website systems and services, you agree to be bound by these Terms of Service.</p><h3>2. Delivery Packages & Scope</h3><p>Cizhenyu provides three distinct delivery tiers: Standard Site ($599), Smart Marketing ($899), and Source Ownership ($1,599). Delivery scope follows the signed agreement.</p><h3>3. Third-Party Costs & Boundaries</h3><p>Pricing represents a one-time project delivery fee. External ongoing costs including Cloudflare usage, AI model API tokens, and Google Ads ad spend remain client responsibility.</p><h3>4. Technical Support & Warranty</h3><p>Warranties apply per plan: 30 days for Standard Site, 3 months for Smart Marketing, and 12 months for Source Ownership.</p>',
          status: 'published',
          seo_title: 'Terms of Service | Cizhenyu',
          seo_description: 'Cizhenyu system delivery terms and service license agreement.',
          robots_directive: 'index,follow',
          schema_type: 'WebPage',
          og_image: { url: img('Terms', 1200, 630) },
        },
      }),
    },
  ],
});

writeJson('content_block.json', {
  collectionSlug: 'b2b_content_block',
  items: [
    {
      languageGroupKey: lgk('blk', 1),
      locales: L({
        'zh-CN': {
          name: '首页首屏',
          block_type: 'hero',
          title: '建好网站，管好客户，让全球客户找到你。',
          slug: 'home-hero',
          placement: 'home_hero',
          eyebrow: '网站建设 · 客户管理 · 搜索增长',
          subtitle:
            '不再为昂贵的服务器、零散的客户线索和长期缺乏流量而烦恼。用 Cloudflare 构建轻量、高效、可扩展的业务网站，配合 CRM、AI 客服与 SEO / GEO 运营，让网站真正服务于你的业务增长。',
          summary: '面向全球网络交付 · 极低运维成本 · SEO / GEO 长期运营',
          link_label: '选择建站方案',
          link_url: '/zh-CN/contact?intent=sites',
          image: { url: img('Hero', 960, 720) },
          status: 'published',
          sort_order: 10,
        },
        'zh-TW': {
          name: '首頁首屏',
          block_type: 'hero',
          title: '建好網站，管好客戶，讓全球客戶找到你。',
          slug: 'home-hero',
          placement: 'home_hero',
          eyebrow: '網站建設 · 客戶管理 · 搜尋增長',
          subtitle:
            '不再為昂貴的伺服器、零散的客戶線索和長期缺乏流量而煩惱。用 Cloudflare 構建輕量、高效、可擴展的業務網站，配合 CRM、AI 客服與 SEO / GEO 運營，讓網站真正服務於你的業務增長。',
          summary: '面向全球網路交付 · 極低運維成本 · SEO / GEO 長期運營',
          link_label: '選擇建站方案',
          link_url: '/zh-TW/contact?intent=sites',
          image: { url: img('Hero', 960, 720) },
          status: 'published',
          sort_order: 10,
        },
        ja: {
          name: 'ホームヒーロー',
          block_type: 'hero',
          title: 'サイトを整え、顧客を管理し、世界中の顧客に見つけてもらう。',
          slug: 'home-hero',
          placement: 'home_hero',
          eyebrow: 'サイト構築 · 顧客管理 · 検索成長',
          subtitle:
            '高額なサーバー、散在するリード、慢性的な流入不足から解放されます。Cloudflare で軽量・高速・拡張可能なビジネスサイトを構築し、CRM・AI カスタマーサポート・SEO / GEO 運用と組み合わせて、サイトを本当の成長エンジンにします。',
          summary: 'グローバル配信 · 極低運用コスト · SEO / GEO 長期運用',
          link_label: 'サイト構築プランを見る',
          link_url: '/ja/contact?intent=sites',
          image: { url: img('Hero', 960, 720) },
          status: 'published',
          sort_order: 10,
        },
        'en-US': {
          name: 'Home Hero',
          block_type: 'hero',
          title: 'Build the site, manage customers, and help global buyers find you.',
          slug: 'home-hero',
          placement: 'home_hero',
          eyebrow: 'Website · CRM · Search Growth',
          subtitle:
            'Stop wrestling with expensive servers, scattered leads, and long stretches of zero traffic. Build a lightweight, fast, scalable business site on Cloudflare—then pair it with CRM, AI support, and SEO / GEO so the website actually drives growth.',
          summary: 'Global delivery · Ultra-low ops cost · Long-term SEO / GEO',
          link_label: 'Choose a website plan',
          link_url: '/en-US/contact?intent=sites',
          image: { url: img('Hero', 960, 720) },
          status: 'published',
          sort_order: 10,
        },
      }),
    },
    {
      languageGroupKey: lgk('blk', 2),
      locales: L({
        'zh-CN': {
          name: '页脚行动号召',
          block_type: 'cta',
          title: '别让网站停留在展示阶段。',
          slug: 'footer-cta',
          placement: 'footer_cta',
          subtitle: '从建站、客户管理到搜索增长，选择真正适合你业务的产品，让线上投入逐步沉淀为可管理、可持续经营的业务资产。',
          summary: '网站建设 · 客户管理 · SEO / GEO 可独立选择或组合。',
          link_label: '咨询适合我的方案',
          link_url: '/zh-CN/contact?intent=consult',
          status: 'published',
          sort_order: 10,
        },
        'zh-TW': {
          name: '頁腳行動號召',
          block_type: 'cta',
          title: '別讓網站停留在展示階段。',
          slug: 'footer-cta',
          placement: 'footer_cta',
          subtitle: '從建站、客戶管理到搜尋增長，選擇真正適合你業務的產品，讓線上投入逐步沉澱為可管理、可持續經營的業務資產。',
          summary: '網站建設 · 客戶管理 · SEO / GEO 可獨立選擇或組合。',
          link_label: '諮詢適合我的方案',
          link_url: '/zh-TW/contact?intent=consult',
          status: 'published',
          sort_order: 10,
        },
        ja: {
          name: 'フッターCTA',
          block_type: 'cta',
          title: 'サイトを見せるだけで終わらせない。',
          slug: 'footer-cta',
          placement: 'footer_cta',
          subtitle: 'サイト構築、顧客管理、検索成長から、本当に合うプロダクトを選び、オンライン投資を管理可能で継続経営できる事業資産へ変えていきましょう。',
          summary: 'サイト構築 · 顧客管理 · SEO / GEO は単体でも組み合わせでも選択可能。',
          link_label: '自分に合う方案を相談する',
          link_url: '/ja/contact?intent=consult',
          status: 'published',
          sort_order: 10,
        },
        'en-US': {
          name: 'Footer CTA',
          block_type: 'cta',
          title: 'Don’t leave your website stuck in brochure mode.',
          slug: 'footer-cta',
          placement: 'footer_cta',
          subtitle: 'From website building and CRM to search growth, choose products that fit your business—and turn online spend into manageable, lasting operating assets.',
          summary: 'Website, CRM, and SEO / GEO can be chosen alone or combined.',
          link_label: 'Talk about the right plan for me',
          link_url: '/en-US/contact?intent=consult',
          status: 'published',
          sort_order: 10,
        },
      }),
    },
    {
      languageGroupKey: lgk('blk', 3),
      locales: L({
        'zh-CN': {
          name: '用户反馈-机械出口',
          block_type: 'testimonial',
          title: '李先生',
          subtitle: '某精密机械出口业务负责人',
          summary: '以前建站找外包花了几万，改个产品图都要等一周。用磁帧鱼后架构轻、上线快，内嵌的客服挂件让我们直接接住了中东客户的询盘，运营效率提升非常明显。',
          slug: 'testimonial-1',
          placement: 'home_testimonial',
          status: 'published',
          sort_order: 10,
        },
        'zh-TW': {
          name: '用戶反饋-機械出口',
          block_type: 'testimonial',
          title: '李先生',
          subtitle: '某精密機械出口業務負責人',
          summary: '以前建站找外包花了好幾萬，改個產品圖都要等一週。用磁幀魚後架構輕、上線快，內嵌的客服掛件讓我們直接接住了中東客戶的詢盤，運營效率提升非常明顯。',
          slug: 'testimonial-1',
          placement: 'home_testimonial',
          status: 'published',
          sort_order: 10,
        },
        ja: {
          name: 'お客様の声-機械輸出',
          block_type: 'testimonial',
          title: '李 様',
          subtitle: '精密機械輸出部門マネージャー',
          summary: '以前はサイト制作の外注に多額を投じ、画像変更すら1週間待たされていました。磁帧鱼に移行してからは運用が格段に軽快になり、内蔵チャットで中東バイヤーからの問い合わせを確実にキャッチできています。',
          slug: 'testimonial-1',
          placement: 'home_testimonial',
          status: 'published',
          sort_order: 10,
        },
        'en-US': {
          name: 'Testimonial - Machinery Export',
          block_type: 'testimonial',
          title: 'Mr. Li',
          subtitle: 'Head of Export, Precision Machinery',
          summary: 'We used to spend tens of thousands on external agencies, waiting a week just to swap a product photo. With Cizhenyu, everything is lightweight and fast. The embedded chat helped us capture direct inquiries from Middle Eastern buyers.',
          slug: 'testimonial-1',
          placement: 'home_testimonial',
          status: 'published',
          sort_order: 10,
        },
      }),
    },
    {
      languageGroupKey: lgk('blk', 4),
      locales: L({
        'zh-CN': {
          name: '用户反馈-跨境品牌',
          block_type: 'testimonial',
          title: 'Sarah Chen',
          subtitle: '消费电子独立站创始人',
          summary: 'Cloudflare 架构在全球访问真的秒开，不用担心服务器宕机和高昂运维账单。AI Agent 结合 SEO 运营工作流，帮我们持续生产多语言内容，自然搜索流量稳步上涨。',
          slug: 'testimonial-2',
          placement: 'home_testimonial',
          status: 'published',
          sort_order: 20,
        },
        'zh-TW': {
          name: '用戶反饋-跨境品牌',
          block_type: 'testimonial',
          title: 'Sarah Chen',
          subtitle: '消費電子獨立站創始人',
          summary: 'Cloudflare 架構在全球訪問真的秒開，不用擔心伺服器宕機和高昂運維賬單。AI Agent 結合 SEO 運營工作流，幫我們持續生產多語言內容，自然搜尋流量穩步上漲。',
          slug: 'testimonial-2',
          placement: 'home_testimonial',
          status: 'published',
          sort_order: 20,
        },
        ja: {
          name: 'お客様の声-D2Cブランド',
          block_type: 'testimonial',
          title: 'Sarah Chen',
          subtitle: '越境家電ECファウンダー',
          summary: 'Cloudflare基盤により世界中どこからでも瞬時に表示され、サーバーダウンや高額な保守費用の心配がありません。AI Agentを活用したSEOワークフローにより自然検索流入が着実に伸びています。',
          slug: 'testimonial-2',
          placement: 'home_testimonial',
          status: 'published',
          sort_order: 20,
        },
        'en-US': {
          name: 'Testimonial - Cross-border Brand',
          block_type: 'testimonial',
          title: 'Sarah Chen',
          subtitle: 'Founder, Consumer Electronics DTC',
          summary: 'The Cloudflare stack delivers near-instant global page loads without server crashes or hefty maintenance bills. The AI-assisted SEO workflow continuously drives organic search impressions.',
          slug: 'testimonial-2',
          placement: 'home_testimonial',
          status: 'published',
          sort_order: 20,
        },
      }),
    },
    {
      languageGroupKey: lgk('blk', 5),
      locales: L({
        'zh-CN': {
          name: '用户反馈-服务商',
          block_type: 'testimonial',
          title: '王经理',
          subtitle: '数字化出海服务商合伙人',
          summary: '基于模型低代码架构非常灵活，客户需要什么业务页面和表单都能快速配置落地。不再是死板的展示站，而是真正能帮企业沉淀客户资产的增长系统。',
          slug: 'testimonial-3',
          placement: 'home_testimonial',
          status: 'published',
          sort_order: 30,
        },
        'zh-TW': {
          name: '用戶反饋-服務商',
          block_type: 'testimonial',
          title: '王經理',
          subtitle: '數位化出海服務商合夥人',
          summary: '基於模型低代碼架構非常靈活，客戶需要什麼業務頁面和表單都能快速配置落地。不再是死板的展示站，而是真正能幫企業沉澱客戶資產的增長系統。',
          slug: 'testimonial-3',
          placement: 'home_testimonial',
          status: 'published',
          sort_order: 30,
        },
        ja: {
          name: 'お客様の声-パートナー企業',
          block_type: 'testimonial',
          title: '王 氏',
          subtitle: 'DX海外展開支援パートナー',
          summary: 'モデル駆動のローコード構成が極めて柔軟で、クライアントが求めるページやフォームを即座に具現化できます。形だけの静的サイトではなく、確実に顧客データを蓄積できる実践的システムです。',
          slug: 'testimonial-3',
          placement: 'home_testimonial',
          status: 'published',
          sort_order: 30,
        },
        'en-US': {
          name: 'Testimonial - Agency Partner',
          block_type: 'testimonial',
          title: 'Manager Wang',
          subtitle: 'Partner, Digital Export Agency',
          summary: 'The model-driven low-code architecture is remarkably flexible. We can roll out custom business pages and forms effortlessly. It turns rigid brochure sites into real customer acquisition engines.',
          slug: 'testimonial-3',
          placement: 'home_testimonial',
          status: 'published',
          sort_order: 30,
        },
      }),
    },
    // 痛点与破局优势 (home_advantage)
    ...[
      {
        n: 3,
        slug: 'adv-1',
        zh: {
          name: '瓶颈01-名片站死局',
          t: '只有摆设名片站，改动困难且零自然流',
          d: '外包建站耗时数月，改个产品排期两周；缺乏 SEO/GEO 结构设计，半年收不到一条有效询盘。',
          s: '全能站群中台统一管理，多语言自动路由，秒级静态构建极速交付。',
        },
        en: {
          name: 'Pain 01 - Stagnant Site',
          t: 'Brochure Site Trap: Slow Edits & Zero Traffic',
          d: 'Agency queues take weeks for every catalog change; lack of GEO/SEO structure yields zero organic leads.',
          s: 'Unified multi-site CMS hub with automated multilingual routing and instant static deployments.',
        },
      },
      {
        n: 4,
        slug: 'adv-2',
        zh: {
          name: '瓶颈02-时差漏询盘',
          t: '海外时差断档，夜间高意向询盘大量流失',
          d: '欧美买家活跃时国内正是深夜，静态表单无人响应，线索散落各处，商机转瞬被竞争对手截流。',
          s: '24/7 智能客服依据知识库深度应答，高意向即时通知并转人工。',
        },
        en: {
          name: 'Pain 02 - Timezone Loss',
          t: 'Time-zone Gaps: High-Intent Night Leads Lost',
          d: 'Overseas buyers reach out during off-hours with no real-time response; leads go cold or bounce to rivals.',
          s: '24/7 knowledge-base AI desk responds instantly and escalates qualified leads to live staff.',
        },
      },
      {
        n: 5,
        slug: 'adv-3',
        zh: {
          name: '瓶颈03-技术绑架',
          t: '上线即停更，资产被建站服务商绑架',
          d: '不懂底层运维，服务器托管在第三方建站商名下，年年支付昂贵维护费却无法自主沉淀数字资产。',
          s: '一键向导部署到自有 Cloudflare 账户，企业数据 100% 自主掌控。',
        },
        en: {
          name: 'Pain 03 - Vendor Lock-in',
          t: 'Go-Live Stall & Host Captivity',
          d: 'High dev friction leaves sites abandoned; hosted on third-party servers with recurring annual lock-ins.',
          s: 'Deploy straight to your own Cloudflare account with 100% code, data, and lead ownership.',
        },
      },
    ].map((a) => ({
      languageGroupKey: lgk('blk', a.n),
      locales: L({
        'zh-CN': {
          name: a.zh.name,
          block_type: 'feature',
          title: a.zh.t,
          slug: a.slug,
          placement: 'home_advantage',
          summary: a.zh.d,
          subtitle: a.zh.s,
          status: 'published',
          sort_order: a.n * 10,
        },
        'zh-TW': {
          name: tw(a.zh.name),
          block_type: 'feature',
          title: tw(a.zh.t),
          slug: a.slug,
          placement: 'home_advantage',
          summary: tw(a.zh.d),
          subtitle: tw(a.zh.s),
          status: 'published',
          sort_order: a.n * 10,
        },
        ja: {
          name: a.en.name,
          block_type: 'feature',
          title: a.en.t,
          slug: a.slug,
          placement: 'home_advantage',
          summary: a.en.d,
          subtitle: a.en.s,
          status: 'published',
          sort_order: a.n * 10,
        },
        'en-US': {
          name: a.en.name,
          block_type: 'feature',
          title: a.en.t,
          slug: a.slug,
          placement: 'home_advantage',
          summary: a.en.d,
          subtitle: a.en.s,
          status: 'published',
          sort_order: a.n * 10,
        },
      }),
    })),
    // 真实客户反馈 (home_testimonial)
    ...[
      {
        n: 6,
        slug: 'rev-1',
        zh: {
          name: '陈总 · 营销总监',
          role: '工贸一体机械制造出口企业',
          quote: '过去官网就像死水，现在通过磁帧鱼智能询盘系统，夜间自动接待了 20 多位欧洲意向买家，并直接获取了 WhatsApp 联系方式，转化率提升极其明显！',
          meta: '年出口额 8,000 万+',
        },
        en: {
          name: 'Marcus Chen · VP of Marketing',
          role: 'Industrial Machinery Manufacturer',
          quote: 'Our previous website had almost zero inquiries. With Cizhenyu AI Sales Desk, we automatically engaged 20+ European buyers off-hours and captured their WhatsApp info. Conversion jumped remarkably!',
          meta: '$12M+ Annual Export',
        },
      },
      {
        n: 7,
        slug: 'rev-2',
        zh: {
          name: 'David W. · 创始人',
          role: '跨境硬件品牌独立站出海',
          quote: '站群生成和多语言部署帮我们迅速铺开了 5 个目标语种站点，全静态部署在 Cloudflare 上毫秒级打开，海外客户访问体验非常流畅，AI 搜索推荐量持续上升。',
          meta: '覆盖 12 个海外市场',
        },
        en: {
          name: 'David W. · Founder',
          role: 'Hardware DTC & B2B Brand',
          quote: 'The multi-site generator helped us launch 5 multilingual regional portals in days. Edge caching on Cloudflare loads in milliseconds, delivering incredible user experience and top AI search visibility.',
          meta: 'Present in 12 Global Markets',
        },
      },
      {
        n: 8,
        slug: 'rev-3',
        zh: {
          name: '林经理 · 业务主管',
          role: '外贸建站与数字营销服务商',
          quote: '作为服务商，磁帧鱼的安装包交付极大降低了运维成本。客服同席协助部署，客户资产放在他们自己的云端，双方都极其安心，交付效率提高数倍。',
          meta: '累计交付 40+ 独立站点',
        },
        en: {
          name: 'Grace Lin · Operations Director',
          role: 'Export Agency & Marketing Partner',
          quote: 'Packaging delivery with Cizhenyu drastically reduced client turnaround time. Collaborative install to the client’s own cloud ensures data sovereignty and zero ongoing maintenance headaches.',
          meta: '40+ Portals Delivered',
        },
      },
    ].map((r) => ({
      languageGroupKey: lgk('blk', r.n),
      locales: L({
        'zh-CN': {
          name: r.zh.name,
          block_type: 'testimonial',
          title: r.zh.name,
          eyebrow: r.zh.role,
          slug: r.slug,
          placement: 'home_testimonial',
          summary: r.zh.quote,
          link_label: r.zh.meta,
          status: 'published',
          sort_order: r.n * 10,
        },
        'zh-TW': {
          name: tw(r.zh.name),
          block_type: 'testimonial',
          title: tw(r.zh.name),
          eyebrow: tw(r.zh.role),
          slug: r.slug,
          placement: 'home_testimonial',
          summary: tw(r.zh.quote),
          link_label: tw(r.zh.meta),
          status: 'published',
          sort_order: r.n * 10,
        },
        ja: {
          name: r.en.name,
          block_type: 'testimonial',
          title: r.en.name,
          eyebrow: r.en.role,
          slug: r.slug,
          placement: 'home_testimonial',
          summary: r.en.quote,
          link_label: r.en.meta,
          status: 'published',
          sort_order: r.n * 10,
        },
        'en-US': {
          name: r.en.name,
          block_type: 'testimonial',
          title: r.en.name,
          eyebrow: r.en.role,
          slug: r.slug,
          placement: 'home_testimonial',
          summary: r.en.quote,
          link_label: r.en.meta,
          status: 'published',
          sort_order: r.n * 10,
        },
      }),
    })),
    // 全维对比 (home_comparison)
    ...[
      {
        n: 9,
        slug: 'cmp-1',
        zh: {
          dim: '建站效率与内容改版',
          old: '外包修改排期数周，改版成本高，多语言内容容易错乱覆盖',
          neu: '站群中台统一维护，一键同步多站，全静态秒级发布更新',
        },
        en: {
          dim: 'Build Speed & Content Updates',
          old: 'Queued agency tickets taking weeks; costly revisions and messy translations',
          neu: 'Single multi-site CMS hub; instant static updates published in seconds',
        },
      },
      {
        n: 10,
        slug: 'cmp-2',
        zh: {
          dim: '询盘承接与商机留存',
          old: '静态留言表单等邮件，海外夜间时差造成大量高意向客户流失',
          neu: '24/7 智能客服依据知识库深度应答促单，高意向即时提醒并转人工',
        },
        en: {
          dim: 'Inquiry Capture & Conversion',
          old: 'Static contact forms with email delay; off-hours time zones lose hot leads',
          neu: '24/7 AI desk with knowledge base answers; instant escalation for qualified leads',
        },
      },
      {
        n: 11,
        slug: 'cmp-3',
        zh: {
          dim: '技术门槛与资产归属',
          old: '服务器托管在厂商名下，每年高额续费绑定，无法自由迁移',
          neu: '部署至企业自有 Cloudflare 云账户，资产与数据自主掌控',
        },
        en: {
          dim: 'Ownership & Infrastructure',
          old: 'Locked inside third-party servers with recurring annual host fees',
          neu: 'Deployed straight to your own Cloudflare account; full code & data ownership',
        },
      },
      {
        n: 12,
        slug: 'cmp-4',
        zh: {
          dim: 'SEO / GEO 与长效运营',
          old: '网站上线即停更，缺乏长尾词规划与 AI 搜索结构化数据',
          neu: '内置 GEO 结构化标记与多语言路由，持续跑出搜索复利节奏',
        },
        en: {
          dim: 'GEO / SEO Compounding',
          old: 'Site abandoned post-launch; zero structured data for modern AI engines',
          neu: 'Built-in GEO schema markup, multilingual routing, and ongoing growth ops',
        },
      },
    ].map((c) => ({
      languageGroupKey: lgk('blk', c.n),
      locales: L({
        'zh-CN': {
          name: c.zh.dim,
          block_type: 'feature',
          title: c.zh.dim,
          slug: c.slug,
          placement: 'home_comparison',
          summary: c.zh.old,
          subtitle: c.zh.neu,
          status: 'published',
          sort_order: c.n * 10,
        },
        'zh-TW': {
          name: tw(c.zh.dim),
          block_type: 'feature',
          title: tw(c.zh.dim),
          slug: c.slug,
          placement: 'home_comparison',
          summary: tw(c.zh.old),
          subtitle: tw(c.zh.neu),
          status: 'published',
          sort_order: c.n * 10,
        },
        ja: {
          name: c.en.dim,
          block_type: 'feature',
          title: c.en.dim,
          slug: c.slug,
          placement: 'home_comparison',
          summary: c.en.old,
          subtitle: c.en.neu,
          status: 'published',
          sort_order: c.n * 10,
        },
        'en-US': {
          name: c.en.dim,
          block_type: 'feature',
          title: c.en.dim,
          slug: c.slug,
          placement: 'home_comparison',
          summary: c.en.old,
          subtitle: c.en.neu,
          status: 'published',
          sort_order: c.n * 10,
        },
      }),
    })),
    // 极简 3 步实施 (home_step)
    ...[
      {
        n: 13,
        num: '01',
        slug: 'step-1',
        zh: {
          title: '明确目标市场与核心痛点',
          summary: '梳理目标国家、主推品类及当前询盘痛点（无站/时差漏单/多语言需求）。',
        },
        en: {
          title: 'Diagnose Market & Bottlenecks',
          summary: 'Share target countries, product categories, and current lead leakage points.',
        },
      },
      {
        n: 14,
        num: '02',
        slug: 'step-2',
        zh: {
          title: '灵活选配所需产品模块',
          summary: '按业务成熟度单选或组合：站群生成系统、智能询盘客服、部署运营中台。',
        },
        en: {
          title: 'Select Product Modules',
          summary: 'Pick what fits: Multi-site Generator, AI Inquiry Desk, and Deploy Ops.',
        },
      },
      {
        n: 15,
        num: '03',
        slug: 'step-3',
        zh: {
          title: '下载部署并由客服协作上线',
          summary: '通过向导部署至自有云环境，专业工程客服同席协助首发初始化与联调。',
        },
        en: {
          title: 'Download & Collaborative Install',
          summary: 'Deploy to your cloud account with guided wizard and support onboarding.',
        },
      },
    ].map((s) => ({
      languageGroupKey: lgk('blk', s.n),
      locales: L({
        'zh-CN': {
          name: `步骤${s.num}`,
          block_type: 'feature',
          eyebrow: s.num,
          title: s.zh.title,
          slug: s.slug,
          placement: 'home_step',
          summary: s.zh.summary,
          status: 'published',
          sort_order: s.n * 10,
        },
        'zh-TW': {
          name: tw(`步驟${s.num}`),
          block_type: 'feature',
          eyebrow: s.num,
          title: tw(s.zh.title),
          slug: s.slug,
          placement: 'home_step',
          summary: tw(s.zh.summary),
          status: 'published',
          sort_order: s.n * 10,
        },
        ja: {
          name: `Step ${s.num}`,
          block_type: 'feature',
          eyebrow: s.num,
          title: s.en.title,
          slug: s.slug,
          placement: 'home_step',
          summary: s.en.summary,
          status: 'published',
          sort_order: s.n * 10,
        },
        'en-US': {
          name: `Step ${s.num}`,
          block_type: 'feature',
          eyebrow: s.num,
          title: s.en.title,
          slug: s.slug,
          placement: 'home_step',
          summary: s.en.summary,
          status: 'published',
          sort_order: s.n * 10,
        },
      }),
    })),
  ],
});

writeJson('seed.manifest.json', {
  version: 1,
  themeId: 'default',
  locales: LOCALES,
  seedOrder: [
    'company_info.json',
    'product_category.json',
    'product.json',
    'article.json',
    'faq.json',
    'resource.json',
    'nav_menu.json',
    'page.json',
    'content_block.json',
    'translation_field.json',
    'nav_menu_item.json',
  ],
  requiredByModule: {
    _always: ['company_info.json', 'nav_menu.json', 'nav_menu_item.json', 'page.json', 'content_block.json', 'translation_field.json'],
    products: ['product_category.json', 'product.json'],
    articles: ['article.json'],
    faq: ['faq.json'],
    resources: ['resource.json'],
  },
  notes:
    'Cizhenyu marketing seed: 3 products, nav 首页/产品/帮助/下载/动态/关于/联系. Download CTAs → inquiry. Logo empty for lightning fallback.',
});

fs.writeFileSync(
  path.join(__dirname, '../MARKETING_COPY.md'),
  `# 磁帧鱼 default 主题营销文案

首页叙事以 \`PRD.md\` 为准，四语文案在：

- \`home-content-zh-cn.ts\`
- \`home-content-zh-tw.ts\`
- \`home-content-ja.ts\`
- \`home-content-en.ts\`

产品定位：

1. Cloudflare 前后台建站系统
2. CRM 客户管理与 AI 智能客服
3. SEO / GEO 长期运营方案

重新生成 CMS seed：\`node src/ui/themes/default/seed/build-seed.mjs\`
`,
  'utf8',
);

console.log('✓ default seed regenerated');
