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
          email: 'hello@ycz.me',
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
          email: 'hello@ycz.me',
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
          email: 'hello@ycz.me',
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
          email: 'hello@ycz.me',
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
      a: '对于经过合理缓存和程序优化的常规 B2B 网站，基础设施成本可以非常低，很多项目主要只需承担域名等基本费用。随着访问量、动态请求和功能增加，再按实际需要升级。最终费用以项目使用的具体服务为准。',
    },
    ja: {
      q: 'この方案で、年間のインフラ費用はどのくらいですか？',
      a: '適切なキャッシュと最適化をした一般的な B2B サイトでは、インフラ費用を非常に低く抑えられ、多くの案件ではドメインなど基本費用が中心になります。アクセスや動的処理、機能が増えたら必要に応じて拡張します。最終費用は利用サービスによります。',
    },
    en: {
      q: 'How much infrastructure cost should I expect per year?',
      a: 'For a typical B2B site with sensible caching and optimization, infrastructure can stay very low—often mostly domain and basic fees. Scale up with traffic, dynamic load, and features as needed. Final cost depends on the services you use.',
    },
  },
  {
    n: 2,
    zh: {
      q: '网站可以服务全球客户吗？',
      a: '可以利用 Cloudflare 全球网络交付网站静态资源，帮助不同地区的访客更高效地访问内容。具体体验仍与页面优化、动态接口和网络环境有关。',
    },
    ja: {
      q: 'サイトは世界中の顧客に対応できますか？',
      a: 'Cloudflare のグローバル配信で静的リソースを届け、地域ごとの訪問をより効率的にできます。体感はページ最適化、動的 API、ネットワーク環境にも依存します。',
    },
    en: {
      q: 'Can the website serve global customers?',
      a: 'Yes—Cloudflare’s global network can deliver static assets so visitors in different regions reach content more efficiently. Actual experience still depends on page optimization, dynamic APIs, and network conditions.',
    },
  },
  {
    n: 3,
    zh: {
      q: '我已经有网站，可以只买 CRM 或 SEO / GEO 吗？',
      a: '可以。三项产品可以独立选择。先评估现有网站与业务流程，再决定需要增加的能力，不必为了使用单项服务而全部重建。',
    },
    ja: {
      q: '既存サイトがあっても、CRM や SEO / GEO だけ購入できますか？',
      a: 'できます。三製品は独立選択可能です。既存サイトと業務フローを評価し、必要な能力だけ追加すればよく、すべてを作り直す必要はありません。',
    },
    en: {
      q: 'I already have a site. Can I buy only CRM or SEO / GEO?',
      a: 'Yes. The three products can be chosen independently. Assess your current site and workflow, then add only the capabilities you need—no full rebuild required.',
    },
  },
  {
    n: 4,
    zh: {
      q: 'SEO / GEO 是否能保证排名或订单？',
      a: '不能保证固定排名、AI 引用或订单数量。运营会围绕关键词、内容质量、页面表现和可获取的数据持续优化，具体效果取决于行业竞争、产品、市场和执行情况。',
    },
    ja: {
      q: 'SEO / GEO は順位や受注を保証しますか？',
      a: '固定順位、AI 引用、受注数は保証しません。キーワード、コンテンツ品質、ページ成果、取得可能なデータに基づき継続改善します。成果は競争、製品、市場、実行次第です。',
    },
    en: {
      q: 'Can SEO / GEO guarantee rankings or orders?',
      a: 'No fixed rankings, AI citations, or order volumes are guaranteed. Work focuses on keywords, content quality, page performance, and measurable signals. Results depend on competition, product, market, and execution.',
    },
  },
  {
    n: 5,
    zh: {
      q: '网站和数据能否由我自己管理？',
      a: '可以根据项目约定部署到客户自己的 Cloudflare 账号，并明确后台权限、代码、数据与备份的管理方式。具体交付边界在项目开始前确认。',
    },
    ja: {
      q: 'サイトとデータは自社で管理できますか？',
      a: 'プロジェクト合意に基づき、お客様自身の Cloudflare アカウントへ導入し、管理画面権限、コード、データ、バックアップの扱いを明確にできます。納品境界は開始前に確認します。',
    },
    en: {
      q: 'Can I manage the site and data myself?',
      a: 'By project agreement, we can deploy to your own Cloudflare account and define admin rights, code, data, and backup ownership. Delivery boundaries are confirmed before kickoff.',
    },
  },
];

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
        seo_description: f.zh.a,
        robots_directive: 'index,follow',
      },
      'zh-TW': {
        question: tw(f.zh.q),
        answer: `<p>${tw(f.zh.a)}</p>`,
        short_answer: tw(f.zh.a),
        sort_order: f.n * 10,
        status: 'published',
        seo_title: tw(f.zh.q),
        seo_description: tw(f.zh.a),
        robots_directive: 'index,follow',
      },
      ja: {
        question: f.ja.q,
        answer: `<p>${f.ja.a}</p>`,
        short_answer: f.ja.a,
        sort_order: f.n * 10,
        status: 'published',
        seo_title: f.ja.q,
        seo_description: f.ja.a,
        robots_directive: 'index,follow',
      },
      'en-US': {
        question: f.en.q,
        answer: `<p>${f.en.a}</p>`,
        short_answer: f.en.a,
        sort_order: f.n * 10,
        status: 'published',
        seo_title: f.en.q,
        seo_description: f.en.a,
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
            '<p>磁帧鱼服务外贸业务员、工厂外贸部与服务商。我们交付三款可下载安装的产品：</p><ol><li>全能站群管理系统 + B2B 前端站点生成系统</li><li>智能客服智能询盘系统</li><li>部署运营获客系统</li></ol><p>默认 Logo 为闪电占位，可在 CMS 公司信息中替换。价格不公示，请通过联系页询盘。</p>',
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
            '<p>磁幀魚交付三款可下載安裝的產品：站群 + B2B 生成、智慧詢盤、部署運營獲客。Logo 可於 CMS 替換。請透過聯繫頁詢盤。</p>',
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
          content: '<p>3製品を提供します。ロゴはCMSで差し替え可能。価格はお問い合わせください。</p>',
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
            '<p>Three products: multi-site + B2B generator, AI inquiry desk, deploy & growth ops. Logo is CMS-replaceable. Pricing via inquiry.</p>',
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
            '<p>请留下行业、目标市场、需要的产品（站群生成 / 智能询盘 / 部署获客），以及是否需要客服协作安装。</p><p>邮箱：<a href="mailto:hello@ycz.me">hello@ycz.me</a> · 官网：<a href="https://ycz.me">ycz.me</a></p><p>在线询盘表单即将接入；当前请使用下方「提交询盘」按钮（预留）或邮件联系。</p>',
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
            '<p>請留下行業與需求產品。郵箱：<a href="mailto:hello@ycz.me">hello@ycz.me</a>。線上表單即將接入。</p>',
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
            '<p>業界と必要な製品をお送りください。<a href="mailto:hello@ycz.me">hello@ycz.me</a>。フォームは後日接続予定です。</p>',
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
            '<p>Share industry, markets, and which products you need. Email <a href="mailto:hello@ycz.me">hello@ycz.me</a>. Online form coming soon — use the inquiry button (reserved) or email.</p>',
          status: 'published',
          seo_title: 'Contact | Cizhenyu',
          seo_description: 'Inquire for install and collaboration.',
          robots_directive: 'index,follow',
          schema_type: 'ContactPage',
          og_image: { url: img('Contact', 1200, 630) },
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
    'nav_menu_item.json',
  ],
  requiredByModule: {
    _always: ['company_info.json', 'nav_menu.json', 'nav_menu_item.json', 'page.json', 'content_block.json'],
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
