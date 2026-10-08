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
          slogan: '第一次做外贸站群与询盘，也能搭出可交付的获客系统',
          summary:
            '磁帧鱼面向外贸业务员、工厂外贸部与服务商，提供站群与 B2B 站点生成、智能客服询盘、部署运营获客三套可安装产品。资产在您自己的云账户，安装可协作完成。',
          address: '中国',
          phone: '',
          email: 'hello@ycz.me',
          website: 'https://ycz.me',
          logo: { url: '' },
          about_content:
            '<p>磁帧鱼做的不是「又一个模板站」，而是能装到您账户里、能持续改内容、能接住询盘的增长系统。</p><p>三款产品可单独购买、也可组合交付：全能站群 + B2B 前端生成、智能客服询盘、部署运营获客。下载安装可联系客服协作完成；价格与实施方案通过询盘获取。</p>',
          seo_title: '磁帧鱼｜外贸站群 · 询盘 · 部署获客系统',
          seo_description:
            '站群与 B2B 站点生成、智能客服询盘、部署运营获客。提交询盘获取安装与协作方案。',
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
      q: '三款产品必须一起购买吗？可以按需单独安装吗？',
      a: '完全不必捆绑购买。磁帧鱼采用模块化解耦设计，您可以根据当前外贸阶段单独选配「全能站群管理系统」、「智能客服智能询盘系统」或「部署运营获客系统」，后续可随时无缝组合。',
    },
    en: {
      q: 'Must I buy all three products together? Can I install them standalone?',
      a: 'Not at all. Cizhenyu is fully modular. You can stage standalone products (Multi-site CMS, AI Inquiry Desk, or Deploy Ops) based on your current export needs and combine them anytime.',
    },
  },
  {
    n: 2,
    zh: {
      q: '团队没有专业技术人员，能搞定下载和安装部署吗？',
      a: '完全可以。系统提供直观的图形化向导部署，大幅降低了云服务技术门槛；同时我们提供 1v1 专属工程客服同席远程协助，协助您完成域名解析、环境配置和首发上线。',
    },
    en: {
      q: 'We do not have developers. Can we install and deploy successfully?',
      a: 'Absolutely. The setup provides an intuitive guided wizard that minimizes Cloudflare complexity. Plus, our dedicated support team offers 1-on-1 collaborative onboarding to help you launch smoothly.',
    },
  },
  {
    n: 3,
    zh: {
      q: '为什么磁帧鱼强调将资产部署到企业自有的云账户？',
      a: '传统建站常将数据和代码锁死在第三方服务器上，企业每年被动续费。磁帧鱼支持一键部署到您自有的 Cloudflare 等云账户，代码、内容与客户询盘数据 100% 归属于您，安全自主可控。',
    },
    en: {
      q: 'Why does Cizhenyu deploy assets to our own cloud account?',
      a: 'Traditional agencies lock sites onto their servers with recurring host fees. Cizhenyu deploys directly to your Cloudflare account, giving you 100% ownership of your data, code, and customer leads.',
    },
  },
  {
    n: 4,
    zh: {
      q: '智能客服询盘系统如何保证专业度？会不会胡乱回答买家？',
      a: '智能客服严格基于您上传的企业产品知识库（规格书、常见问答、认证资质）进行语义检索与应答，严控幻觉；遇到高价值采购意向或超出知识库的问题，会自动引导买家留资并即时转交人工接管。',
    },
    en: {
      q: 'How does the AI sales desk ensure accuracy without hallucinating?',
      a: 'The AI answers strictly based on your verified product knowledge base (catalogs, spec sheets, certifications). High-intent inquiries automatically trigger contact capture and human handoff.',
    },
  },
  {
    n: 5,
    zh: {
      q: '如何获取具体产品报价与预约系统演示？',
      a: '磁帧鱼为商业 B2B 交付模式，官网不设公开固定套餐价。您可以点击页面任意「免费获取方案 / 预约演示」按钮提交基本需求，我们的出海顾问将在 15 分钟内为您出具针对性方案。',
    },
    en: {
      q: 'Where can I see pricing and book a live demo?',
      a: 'Pricing is tailored via direct inquiry to match your scale. Submit your requirements through any CTA button, and our export consultant will provide a targeted solution and live demo.',
    },
  },
  {
    n: 6,
    zh: {
      q: '品牌 Logo 与企业信息可以随时替换吗？',
      a: '可以。默认 Logo 仅为演示占位，您在后台 CMS 公司信息（Company Info）中上传企业专属 Logo 与图文介绍，即可一键同步替换全站展示。',
    },
    en: {
      q: 'Can we replace the brand logo and company profile anytime?',
      a: 'Yes. The default lightning logo is a placeholder. You can upload your own brand logo and company profile in the CMS to instantly update your global sites.',
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
        question: f.en.q,
        answer: `<p>${f.en.a}</p>`,
        short_answer: f.en.a,
        sort_order: f.n * 10,
        status: 'published',
        seo_title: f.en.q,
        seo_description: f.en.a,
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
          title: '让每一个外贸独立站，都成为 24 小时自主获客的询盘转化中枢',
          slug: 'home-hero',
          placement: 'home_hero',
          eyebrow: '磁帧鱼 · 可安装交付的 B2B 外贸出海获客系统',
          subtitle:
            '彻底告别「名片站零流量、时差漏询盘、内容停更死循环」。站群与 B2B 生成、24/7 智能客服询盘、向导部署与持续获客——三款独立可安装系统，支持客服同席协作上线。',
          summary: '资产 100% 部署至您自有的云账户，源代码与客户数据完全自主可控。',
          link_label: '免费获取方案 / 预约演示',
          link_url: '/zh-CN/contact?intent=inquiry',
          image: { url: img('Hero', 960, 720) },
          extra: {
            stats: [
              { value: '99.2%', label: '海外客情承接率', desc: '24/7 知识库智能秒回' },
              { value: '10x', label: '站群交付速度', desc: '多语种全静态极速上线' },
              { value: '<300ms', label: '全球边缘时延', desc: 'Cloudflare 架构超快加载' },
              { value: '100+', label: '语言与目标市场', desc: '精准契合海外 AI 检索' },
            ],
          },
          status: 'published',
          sort_order: 10,
        },
        'zh-TW': {
          name: '首頁首屏',
          block_type: 'hero',
          title: '讓每一個外貿獨立站，都成為 24 小時自主獲客的詢盤轉化中樞',
          slug: 'home-hero',
          placement: 'home_hero',
          eyebrow: '磁幀魚 · 可安裝交付的 B2B 外貿出海獲客系統',
          subtitle:
            '徹底告別「名片站零流量、時差漏詢盤、內容停更死循環」。站群與 B2B 生成、24/7 智慧客服詢盤、向導部署與持續獲客——三款獨立可安裝系統，支援客服同席協作上線。',
          summary: '資產 100% 部署至您自有的雲端帳戶，原始碼與客戶資料完全自主可控。',
          link_label: '免費獲取方案 / 預約演示',
          link_url: '/zh-TW/contact?intent=inquiry',
          image: { url: img('Hero', 960, 720) },
          extra: {
            stats: [
              { value: '99.2%', label: '海外客情及時承接率', desc: '24/7 知識庫智慧秒回' },
              { value: '10x', label: '站群交付速度', desc: '多語種全靜態極速上線' },
              { value: '<300ms', label: '全球邊緣時延', desc: 'Cloudflare 架構超快載入' },
              { value: '100+', label: '多語言與目標市場', desc: '精準契合海外 AI 檢索' },
            ],
          },
          status: 'published',
          sort_order: 10,
        },
        ja: {
          name: 'ホームヒーロー',
          block_type: 'hero',
          title: 'すべての海外向け独立サイトを、24時間稼働の問い合わせ獲得ハブへ',
          slug: 'home-hero',
          placement: 'home_hero',
          eyebrow: '磁帧鱼 · 導入可能なB2B海外獲得システム',
          subtitle:
            '更新停止、時差によるリード損失、高額な外注依存を解消。サイト群生成、AI問い合わせデスク、導入運用システムの3製品を提供。サポート同席導入にも対応。',
          summary: 'データと資産は自社のクラウド環境へ100%配備。ベンダーロックインなし。',
          link_label: '無料相談 / デモ予約',
          link_url: '/ja/contact?intent=inquiry',
          image: { url: img('Hero', 960, 720) },
          extra: {
            stats: [
              { value: '99.2%', label: 'リード即時対応率', desc: '24時間体制でAI自動初期対応' },
              { value: '10x', label: 'サイト構築スピード', desc: '多言語全静的サイトを即時展開' },
              { value: '<300ms', label: 'グローバル読込速度', desc: 'Cloudflareエッジ高速配信' },
              { value: '100+', label: '多言語マーケット対応', desc: 'AI検索・SEO構造化最適化' },
            ],
          },
          status: 'published',
          sort_order: 10,
        },
        'en-US': {
          name: 'Home Hero',
          block_type: 'hero',
          title: 'Turn Every Export Website into a 24/7 Autonomous Lead Engine',
          slug: 'home-hero',
          placement: 'home_hero',
          eyebrow: 'Cizhenyu · Enterprise-Grade B2B Lead Engine',
          subtitle:
            'Break free from stagnant brochure sites, time-zone lead drops, and slow agency queues. Multi-site CMS generation, 24/7 AI inquiry handling, and wizard deployment with collaborative onboarding.',
          summary: '100% deployed to your own cloud account (Cloudflare). Full data sovereignty, zero lock-in.',
          link_label: 'Get Free Plan / Book Demo',
          link_url: '/en-US/contact?intent=inquiry',
          image: { url: img('Hero', 960, 720) },
          extra: {
            stats: [
              { value: '99.2%', label: 'Lead Response Rate', desc: '24/7 KB-driven instant response' },
              { value: '10x', label: 'Site Rollout Speed', desc: 'High-speed static multilingual sites' },
              { value: '<300ms', label: 'Global Edge Latency', desc: 'Fast Cloudflare Pages architecture' },
              { value: '100+', label: 'Target Market Coverage', desc: 'Structured for AI search & GEO' },
            ],
          },
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
          title: '准备好升级您的外贸获客系统了吗？',
          slug: 'footer-cta',
          placement: 'footer_cta',
          subtitle: '立即预约一对一专属顾问演示，告诉我们您的目标市场与产品品类，我们将为您量身打造出海获客方案。',
          summary: '三款产品可单选或组合交付；支持客服同席协助部署上线。',
          link_label: '免费咨询 / 预约演示',
          link_url: '/zh-CN/contact?intent=consult',
          status: 'published',
          sort_order: 10,
        },
        'zh-TW': {
          name: '頁腳行動號召',
          block_type: 'cta',
          title: '準備好升級您的外貿獲客系統了嗎？',
          slug: 'footer-cta',
          placement: 'footer_cta',
          subtitle: '立即預約一對一專屬顧問演示，告訴我們您的目標市場與產品品類，我們將為您量身打造出海獲客方案。',
          summary: '三款產品可單選或組合交付；支援客服同席協助部署上線。',
          link_label: '免費諮詢 / 預約演示',
          link_url: '/zh-TW/contact?intent=consult',
          status: 'published',
          sort_order: 10,
        },
        ja: {
          name: 'フッターCTA',
          block_type: 'cta',
          title: '海外獲得の仕組みを今すぐアップデートしませんか？',
          slug: 'footer-cta',
          placement: 'footer_cta',
          subtitle: '貴社のターゲット市場と製品に合わせた最適な導入プランをご提案します。',
          summary: '3製品は単体でも組み合わせでも導入可能。サポート同席導入可。',
          link_label: '無料相談 / デモ予約',
          link_url: '/ja/contact?intent=consult',
          status: 'published',
          sort_order: 10,
        },
        'en-US': {
          name: 'Footer CTA',
          block_type: 'cta',
          title: 'Ready to Transform Your Overseas Lead Generation?',
          slug: 'footer-cta',
          placement: 'footer_cta',
          subtitle: 'Schedule a 1-on-1 demo consultation today. Tell us your target markets and we will tailor your deployment strategy.',
          summary: 'Modular install alone or combined. Guided deploy with live onboarding.',
          link_label: 'Free Consultation / Book Demo',
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

writeJson(
  '../MARKETING_COPY.md',
  `# 磁帧鱼 default 主题营销文案（CMS seed）

导航：首页 · 产品 · 帮助 · 下载 · 动态 · 关于 · 联系

产品：
1. 全能站群管理系统 + B2B 前端站点生成系统
2. 智能客服智能询盘系统
3. 部署运营获客系统

重新生成：\`node src/ui/themes/default/seed/build-seed.mjs\`
`,
);

console.log('✓ default seed regenerated');
