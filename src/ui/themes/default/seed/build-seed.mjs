/**
 * 生成 default theme CMS seed（磁帧鱼真实产品文案）。
 * 运行：node src/ui/themes/default/seed/build-seed.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCALES = ['zh-CN', 'zh-TW', 'ja', 'en-US'];

const img = (seed, w = 800, h = 600) =>
  `https://placehold.co/${w}x${h}/0f172a/5eead4?text=${encodeURIComponent(seed)}`;

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
    .replace(/部署/g, '部署')
    .replace(/询盘/g, '詢盤')
    .replace(/自动化/g, '自動化')
    .replace(/运营/g, '運營')
    .replace(/数据/g, '資料')
    .replace(/内容/g, '內容')
    .replace(/默认/g, '預設')
    .replace(/获取/g, '獲取')
    .replace(/诊断/g, '診斷')
    .replace(/方案/g, '方案')
    .replace(/模块/g, '模組')
    .replace(/知识库/g, '知識庫')
    .replace(/客服/g, '客服')
    .replace(/展示/g, '展示')
    .replace(/一键/g, '一鍵')
    .replace(/成熟/g, '成熟')
    .replace(/流程/g, '流程')
    .replace(/个人/g, '個人')
    .replace(/业务员/g, '業務員')
    .replace(/企业/g, '企業')
    .replace(/工厂/g, '工廠')
    .replace(/服务商/g, '服務商')
    .replace(/独立站/g, '獨立站')
    .replace(/生成式/g, '生成式')
    .replace(/搜索/g, '搜尋')
    .replace(/优化/g, '優化')
    .replace(/多语言/g, '多語言')
    .replace(/账户/g, '帳戶')
    .replace(/价格/g, '價格')
    .replace(/官网/g, '官網')
    .replace(/公示/g, '公示')
    .replace(/提交/g, '提交')
    .replace(/关于/g, '關於')
    .replace(/我们/g, '我們')
    .replace(/联系/g, '聯繫')
    .replace(/资源/g, '資源')
    .replace(/产品/g, '產品')
    .replace(/解决/g, '解決')
    .replace(/问题/g, '問題')
    .replace(/教程/g, '教程')
    .replace(/文章/g, '文章')
    .replace(/占位/g, '佔位')
    .replace(/待补充/g, '待補充');
}

function writeJson(name, data) {
  fs.writeFileSync(path.join(__dirname, name), JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log('wrote', name);
}

// —— company ——
writeJson('company_info.json', {
  collectionSlug: 'b2b_company_info',
  items: [
    {
      languageGroupKey: lgk('c001', 1),
      locales: L({
        'zh-CN': {
          company_name: '磁帧鱼',
          company_type: 'software',
          slogan: '外贸 B2B 增长流水线：建站、部署、询盘、自动化运营',
          summary:
            '磁帧鱼面向个人外贸业务员与中小外贸企业，提供一整套可落地的获客系统：站点后台、SEO/GEO 展示站、一键云部署、询盘 CRM 与 AI 客服，以及本地 Agent 驱动的 SEO/GEO 与社媒自动化。',
          address: '中国',
          phone: '',
          email: 'hello@ycz.me',
          website: 'https://ycz.me',
          logo: { url: img('Cizhenyu', 240, 80) },
          about_content:
            '<p>磁帧鱼不是又一个建站模板市场，而是围绕外贸 B2B 成交链路设计的系统：内容在后台沉淀，站点对搜索与买家友好，部署降低上线门槛，询盘中台守住转化，本地 Agent 把 SEO/GEO 与社媒变成日常可执行动作。</p><p>我们服务懂业务、缺技术班子、也不想被复杂云产品劝退的个人业务员与中小企业主。资产部署在客户自己的 Cloudflare 账户；价格不在官网公示，请提交询盘获取模块组合建议。</p>',
          seo_title: '磁帧鱼｜外贸 B2B 一站式获客与运营系统',
          seo_description:
            '建站、一键部署、询盘 CRM 与 AI 客服、SEO/GEO 与社媒自动化。面向个人业务员与中小企业，提交询盘获取方案。',
          robots_directive: 'index,follow',
          schema_type: 'Organization',
          og_image: { url: img('Cizhenyu', 1200, 630) },
          country: '中国',
          social_profiles: [
            { platform: 'website', url: 'https://ycz.me' },
          ],
        },
        'zh-TW': {
          company_name: '磁幀魚',
          company_type: 'software',
          slogan: '外貿 B2B 增長流水線：建站、部署、詢盤、自動化運營',
          summary:
            '磁幀魚面向個人外貿業務員與中小外貿企業，提供一整套可落地的獲客系統：站點後台、SEO/GEO 展示站、一鍵雲部署、詢盤 CRM 與 AI 客服，以及本地 Agent 驅動的 SEO/GEO 與社媒自動化。',
          address: '中國',
          phone: '',
          email: 'hello@ycz.me',
          website: 'https://ycz.me',
          logo: { url: img('Cizhenyu', 240, 80) },
          about_content:
            '<p>磁幀魚不是又一個建站模板市場，而是圍繞外貿 B2B 成交鏈路設計的系統。資產部署在客戶自己的 Cloudflare 帳戶；價格不在官網公示，請提交詢盤獲取模組組合建議。</p>',
          seo_title: '磁幀魚｜外貿 B2B 一站式獲客與運營系統',
          seo_description:
            '建站、一鍵部署、詢盤 CRM 與 AI 客服、SEO/GEO 與社媒自動化。提交詢盤獲取方案。',
          robots_directive: 'index,follow',
          schema_type: 'Organization',
          og_image: { url: img('Cizhenyu', 1200, 630) },
          country: '中國',
          social_profiles: [{ platform: 'website', url: 'https://ycz.me' }],
        },
        ja: {
          company_name: '磁帧鱼',
          company_type: 'software',
          slogan: '輸出 B2B 成長パイプライン：サイト・導入・問い合わせ・自動化運用',
          summary:
            '磁帧鱼は個人営業と中小輸出企業向けに、CMS・SEO/GEO サイト・ワンクリック導入・CRM/AI 問い合わせ・ローカル Agent による SEO/GEO・SNS 自動化を提供します。',
          address: 'China',
          phone: '',
          email: 'hello@ycz.me',
          website: 'https://ycz.me',
          logo: { url: img('Cizhenyu', 240, 80) },
          about_content:
            '<p>磁帧鱼はテンプレート販売ではなく、輸出 B2B の受注導線向けシステムです。資産はお客様の Cloudflare アカウントへ。価格は公開せず、お問い合わせで構成をご提案します。</p>',
          seo_title: '磁帧鱼｜輸出 B2B 獲得・運用システム',
          seo_description:
            'サイト構築、ワンクリック導入、CRM/AI、SEO/GEO・SNS 自動化。お問い合わせでご提案。',
          robots_directive: 'index,follow',
          schema_type: 'Organization',
          og_image: { url: img('Cizhenyu', 1200, 630) },
          country: 'China',
          social_profiles: [{ platform: 'website', url: 'https://ycz.me' }],
        },
        'en-US': {
          company_name: 'Cizhenyu',
          company_type: 'software',
          slogan: 'B2B export growth pipeline: site, deploy, inquiries, automated ops',
          summary:
            'Cizhenyu helps solo export sellers and SMEs run a practical acquisition stack: CMS, SEO/GEO site, one-click cloud deploy, inquiry CRM with AI support, and a local Agent for SEO/GEO and social ops.',
          address: 'China',
          phone: '',
          email: 'hello@ycz.me',
          website: 'https://ycz.me',
          logo: { url: img('Cizhenyu', 240, 80) },
          about_content:
            '<p>Cizhenyu is not another template marketplace. It is a system designed around B2B export conversion: content in CMS, search-friendly sites, wizard deploy to your Cloudflare account, CRM/AI for inquiries, and local Agent playbooks for SEO/GEO and social. Pricing is not listed publicly — inquire for a module plan.</p>',
          seo_title: 'Cizhenyu | B2B export acquisition & ops stack',
          seo_description:
            'Site, one-click deploy, inquiry CRM & AI, SEO/GEO and social automation. Inquire for a tailored plan.',
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

// —— categories ——
const categories = [
  {
    n: 1,
    slug: 'platform-core',
    zh: {
      name: '核心平台',
      description: '内容后台、SEO/GEO 展示站与一键部署，构成站点交付底座。',
    },
    en: {
      name: 'Platform core',
      description: 'CMS, SEO/GEO site, and one-click deploy — the delivery foundation.',
    },
    ja: {
      name: 'コア基盤',
      description: 'CMS・SEO/GEO サイト・ワンクリック導入の基盤。',
    },
  },
  {
    n: 2,
    slug: 'growth-ops',
    zh: {
      name: '获客运营',
      description: '询盘中台与本地 Agent，承接转化与日常 SEO/GEO、社媒节奏。',
    },
    en: {
      name: 'Growth ops',
      description: 'Inquiry hub and local Agent for conversion plus SEO/GEO & social cadence.',
    },
    ja: {
      name: '獲得オペレーション',
      description: '問い合わせ中台とローカル Agent で転換と SEO/GEO・SNS を回す。',
    },
  },
];

writeJson('product_category.json', {
  collectionSlug: 'b2b_product_category',
  items: categories.map((c) => ({
    languageGroupKey: lgk('cate', c.n),
    locales: L({
      'zh-CN': {
        name: c.zh.name,
        slug: c.slug,
        description: c.zh.description,
        sort_order: c.n * 10,
        status: 'published',
        seo_title: c.zh.name,
        seo_description: c.zh.description,
        robots_directive: 'index,follow',
      },
      'zh-TW': {
        name: tw(c.zh.name),
        slug: c.slug,
        description: tw(c.zh.description),
        sort_order: c.n * 10,
        status: 'published',
        seo_title: tw(c.zh.name),
        seo_description: tw(c.zh.description),
        robots_directive: 'index,follow',
      },
      ja: {
        name: c.ja.name,
        slug: c.slug,
        description: c.ja.description,
        sort_order: c.n * 10,
        status: 'published',
        seo_title: c.ja.name,
        seo_description: c.ja.description,
        robots_directive: 'index,follow',
      },
      'en-US': {
        name: c.en.name,
        slug: c.slug,
        description: c.en.description,
        sort_order: c.n * 10,
        status: 'published',
        seo_title: c.en.name,
        seo_description: c.en.description,
        robots_directive: 'index,follow',
      },
    }),
  })),
});

const products = [
  {
    n: 1,
    slug: 'cizhenyu-cms',
    sku: 'CZ-CMS',
    cat: 'platform-core',
    cover: 'CMS',
    zh: {
      title: '磁帧鱼后台',
      tagline: '站点数据中枢：产品、文章、案例与多语言一处管理',
      summary: '外贸站点的业务后台。改完内容站点自动更新，支撑多站点与日常运营节奏。',
      description:
        '<p><strong>磁帧鱼后台</strong>（cizhenyu_payload）是整套系统的数据中枢。</p><ul><li>动态模型与内容管理，适配 B2B 产品结构</li><li>媒体资源与发布流程</li><li>对接展示站自动刷新</li><li>供部署工具与本地 Agent 共用同一数据源</li></ul><p>解决「改文案找建站公司、多语言内容混乱」的痛点。价格请询盘获取。</p>',
      advantages: [
        { title: '业务人员可改', description: '不必每次找开发排期。' },
        { title: '多语言就绪', description: '按目标市场维护本地化内容。' },
        { title: '联动前台', description: '发布后触发站点刷新。' },
      ],
    },
    en: {
      title: 'Cizhenyu CMS',
      tagline: 'Content hub for products, articles, cases, and locales',
      summary: 'The business backend for your export site. Edit once; the site refreshes.',
      description:
        '<p><strong>Cizhenyu CMS</strong> is the data hub of the stack: dynamic models, media, i18n, and revalidate hooks for the public site. Built for B2B catalogs — not brochure blogs. Pricing via inquiry.</p>',
      advantages: [
        { title: 'Operator-friendly', description: 'Business users can update content.' },
        { title: 'i18n ready', description: 'Maintain locale-specific catalogs.' },
        { title: 'Site sync', description: 'Publish triggers front-end refresh.' },
      ],
    },
    ja: {
      title: '磁帧鱼 CMS',
      tagline: '製品・記事・事例・多言語を一括管理',
      summary: '輸出サイトの業務バックエンド。更新はサイトへ自動反映。',
      description:
        '<p><strong>磁帧鱼 CMS</strong> はスタックのデータ中枢です。B2B カタログ向けの動的モデル、メディア、多言語、再検証フックを提供します。価格はお問い合わせください。</p>',
      advantages: [
        { title: '現場が更新可能', description: '開発待ちを減らす。' },
        { title: '多言語', description: '市場別にコンテンツ管理。' },
        { title: 'サイト連携', description: '公開でフロント更新。' },
      ],
    },
  },
  {
    n: 2,
    slug: 'cizhenyu-site',
    sku: 'CZ-SITE',
    cat: 'platform-core',
    cover: 'Site',
    zh: {
      title: '磁帧鱼展示站',
      tagline: '为搜索与询盘而生的 SEO/GEO 前台',
      summary: 'Astro + Cloudflare Pages 的多语言 B2B 站点结构：产品、方案、FAQ、资源清晰可索引。',
      description:
        '<p><strong>磁帧鱼展示站</strong>（cizhenyu_astro）面向买家检索与生成式引擎引用。</p><ul><li>B2B 信息架构：产品 / 方案 / 案例 / FAQ / 资源</li><li>多语言路由与内容同步</li><li>面向传统搜索 + GEO（生成式引擎优化）的可读结构</li><li>主题可换肤，内容来自后台</li></ul><p>解决「网站漂亮但搜不到、没有答问结构」的问题。</p>',
      advantages: [
        { title: 'SEO 结构', description: '不是 PPT 站，是可索引页面体系。' },
        { title: 'GEO 友好', description: 'FAQ/短答等便于 AI 引用。' },
        { title: '主题交付', description: '官方主题含可导入 seed。' },
      ],
    },
    en: {
      title: 'Cizhenyu Site',
      tagline: 'SEO/GEO front-end built for search and inquiries',
      summary: 'Astro + Cloudflare Pages multi-locale B2B structure: products, solutions, FAQ, resources.',
      description:
        '<p><strong>Cizhenyu Site</strong> is the public face of the stack — structured for classic SEO and generative-engine citation (GEO). Content comes from CMS; themes ship with importable seed.</p>',
      advantages: [
        { title: 'Search structure', description: 'Indexable IA, not a slide deck.' },
        { title: 'GEO-ready', description: 'FAQ/short answers for AI citations.' },
        { title: 'Theme packs', description: 'Official themes include CMS seed.' },
      ],
    },
    ja: {
      title: '磁帧鱼 サイト',
      tagline: '検索と問い合わせのための SEO/GEO フロント',
      summary: 'Astro + Cloudflare Pages の多言語 B2B 構造。',
      description:
        '<p><strong>磁帧鱼 サイト</strong>は従来 SEO と生成エンジン引用（GEO）向けの公開サイトです。コンテンツは CMS、テーマは seed 付きで納品できます。</p>',
      advantages: [
        { title: 'SEO 構造', description: '索引可能な IA。' },
        { title: 'GEO', description: 'FAQ/短答で引用されやすい。' },
        { title: 'テーマ納品', description: 'seed 同梱。' },
      ],
    },
  },
  {
    n: 3,
    slug: 'cizhenyu-deploy',
    sku: 'CZ-DEPLOY',
    cat: 'platform-core',
    cover: 'Deploy',
    zh: {
      title: '磁帧鱼部署',
      tagline: '不用学会 Cloudflare 也能上线',
      summary: '桌面向导在您自有 Cloudflare 账户完成 CMS + 站点交付，降低技术与试错成本。',
      description:
        '<p><strong>磁帧鱼部署</strong>（cizhenyu_deploy）把域名、资源、CMS 与 Pages 交付产品化。</p><ul><li>向导式部署 CMS 与前端站点</li><li>资源创建与域名绑定流程标准化</li><li>更新部署保护线上内容，避免误覆盖业务数据</li><li>适合企业自助，也适合服务商批量交付</li></ul><p>解决「听说 Cloudflare 好，但配置劝退」的痛点。</p>',
      advantages: [
        { title: '向导化', description: '点选即可完成关键步骤。' },
        { title: '资产自有', description: '落在客户自己的云账户。' },
        { title: '安全更新', description: '更新不灌演示数据、不乱绑域名。' },
      ],
    },
    en: {
      title: 'Cizhenyu Deploy',
      tagline: 'Go live without learning Cloudflare first',
      summary: 'Desktop wizard delivers CMS + site on your Cloudflare account.',
      description:
        '<p><strong>Cizhenyu Deploy</strong> productizes domains, resources, CMS, and Pages delivery. Updates protect live content and avoid wrong domain binds. For self-serve SMEs and agencies.</p>',
      advantages: [
        { title: 'Guided', description: 'Wizard covers critical steps.' },
        { title: 'Your account', description: 'Assets stay on customer Cloudflare.' },
        { title: 'Safe updates', description: 'No demo overwrite; no wrong zone binds.' },
      ],
    },
    ja: {
      title: '磁帧鱼 Deploy',
      tagline: 'Cloudflare を学び込まなくても公開',
      summary: 'デスクトップウィザードで自アカウントへ CMS + サイト導入。',
      description:
        '<p><strong>磁帧鱼 Deploy</strong> はドメイン・リソース・CMS・Pages を製品化。更新時は本番データを守り、誤ったドメイン紐付けを避けます。</p>',
      advantages: [
        { title: 'ウィザード', description: '重要手順を案内。' },
        { title: '自アカウント', description: '資産はお客様側。' },
        { title: '安全更新', description: 'デモ上書きや誤バインドを防止。' },
      ],
    },
  },
  {
    n: 4,
    slug: 'cizhenyu-crm',
    sku: 'CZ-CRM',
    cat: 'growth-ops',
    cover: 'CRM',
    zh: {
      title: '磁帧鱼询盘中台',
      tagline: '询盘接得住，线索跟得上',
      summary: '在线客服、CRM 跟进与知识库 AI 应答一体，解决来了询盘却转化不了。',
      description:
        '<p><strong>磁帧鱼询盘中台</strong>（cizhenyu_chatonline）覆盖网站嵌入沟通、CRM 漏斗与知识库 AI。</p><ul><li>嵌入式在线沟通</li><li>线索跟进与复盘</li><li>知识库 + AI 自动应答，可转人工</li><li>为本地营销 Agent 提供数据接口</li></ul><p>解决时差夜间无人回、新人答不上参数、线索散落聊天软件等问题。</p>',
      advantages: [
        { title: '7×24 应答', description: '知识库托底，关键承诺可转人工。' },
        { title: '线索结构化', description: '不再只靠个人微信记忆。' },
        { title: '可扩展', description: '与站点与 Agent 联动。' },
      ],
    },
    en: {
      title: 'Cizhenyu Inquiry Hub',
      tagline: 'Catch inquiries and keep follow-ups on track',
      summary: 'Live chat, CRM, and knowledge-base AI in one edge suite.',
      description:
        '<p><strong>Cizhenyu Inquiry Hub</strong> combines embeddable chat, CRM follow-ups, and KB-powered AI with human handoff — for time-zone gaps and scattered WhatsApp threads.</p>',
      advantages: [
        { title: 'Always-on', description: 'KB answers; humans for commitments.' },
        { title: 'Structured leads', description: 'Not only personal chat memory.' },
        { title: 'Extensible', description: 'Hooks for site & local Agent.' },
      ],
    },
    ja: {
      title: '磁帧鱼 問い合わせ中台',
      tagline: '問い合わせを逃さずフォロー',
      summary: 'チャット・CRM・知識ベース AI を一体に。',
      description:
        '<p><strong>磁帧鱼 問い合わせ中台</strong>は埋め込みチャット、CRM、KB AI（有人引き継ぎ可）を提供。時差やチャット散在の課題向け。</p>',
      advantages: [
        { title: '常時応答', description: 'KB 対応、重要事項は有人。' },
        { title: 'リード整理', description: '個人チャット頼りから脱却。' },
        { title: '拡張', description: 'サイト/Agent と連携。' },
      ],
    },
  },
  {
    n: 5,
    slug: 'cizhenyu-agent',
    sku: 'CZ-AGENT',
    cat: 'growth-ops',
    cover: 'Agent',
    zh: {
      title: '磁帧鱼 Agent',
      tagline: '点点鼠标的 SEO/GEO 与社媒运营',
      summary: '本地 Agent 执行日常运营：成熟一键 SEO/GEO 与社媒方案，AI 自动优化，流程成熟几乎不怎么耗 Token。',
      description:
        '<p><strong>磁帧鱼 Agent</strong>（cizhenyu_agent）是本地「AI 员工」桌面端。</p><ul><li>本地执行任务，关键步骤可人工确认</li><li>内置成熟 SEO/GEO、社媒运营解决方案</li><li>与后台真实产品与站点数据联动</li><li>强调能跑通、低消耗，而不是炫技烧 Token</li></ul><p>解决「知道要做内容/发帖，但没人力坚持」的问题。</p>',
      advantages: [
        { title: '成熟流程', description: '一键动作，少试错。' },
        { title: '低 Token', description: '方案成熟，日常几乎不怎么耗 Token。' },
        { title: '可控', description: '敏感操作可人工闸门。' },
      ],
    },
    en: {
      title: 'Cizhenyu Agent',
      tagline: 'Click-to-run SEO/GEO and social ops',
      summary: 'Local Agent with mature SEO/GEO & social playbooks — low token burn.',
      description:
        '<p><strong>Cizhenyu Agent</strong> is a local desktop “AI employee”: skills/MCP on-machine, human gates for risky steps, wired to real CMS products and site data. Built for consistency, not token theatre.</p>',
      advantages: [
        { title: 'Playbooks', description: 'One-click mature routines.' },
        { title: 'Low tokens', description: 'Stable flows, minimal waste.' },
        { title: 'Human gates', description: 'Approve sensitive actions.' },
      ],
    },
    ja: {
      title: '磁帧鱼 Agent',
      tagline: 'クリックで回す SEO/GEO・SNS 運用',
      summary: 'ローカル Agent。成熟プレイブック、低 Token。',
      description:
        '<p><strong>磁帧鱼 Agent</strong> はローカル実行の AI 従業員。重要操作は人手承認、CMS/サイト実データと連携。派手さより継続性。</p>',
      advantages: [
        { title: 'プレイブック', description: '成熟した一括動作。' },
        { title: '低 Token', description: '無駄な試行を減らす。' },
        { title: '承認ゲート', description: 'リスク操作は人手。' },
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
        spec_data: { module: p.sku, stack: 'Cloudflare' },
        seo_title: `${p.zh.title}｜磁帧鱼`,
        seo_description: p.zh.summary,
        robots_directive: 'index,follow',
        schema_type: 'Product',
        og_image: { url: img(p.cover, 1200, 630) },
        tagline: p.zh.tagline,
        advantages: p.zh.advantages,
        taxonomy_ids: [`__BY_SLUG__:b2b_product_category:${p.cat}`],
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
        spec_data: { module: p.sku, stack: 'Cloudflare' },
        seo_title: `${tw(p.zh.title)}｜磁幀魚`,
        seo_description: tw(p.zh.summary),
        robots_directive: 'index,follow',
        schema_type: 'Product',
        og_image: { url: img(p.cover, 1200, 630) },
        tagline: tw(p.zh.tagline),
        advantages: p.zh.advantages.map((a) => ({ title: tw(a.title), description: tw(a.description) })),
        taxonomy_ids: [`__BY_SLUG__:b2b_product_category:${p.cat}`],
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
        spec_data: { module: p.sku, stack: 'Cloudflare' },
        seo_title: `${p.ja.title}｜磁帧鱼`,
        seo_description: p.ja.summary,
        robots_directive: 'index,follow',
        schema_type: 'Product',
        og_image: { url: img(p.cover, 1200, 630) },
        tagline: p.ja.tagline,
        advantages: p.ja.advantages,
        taxonomy_ids: [`__BY_SLUG__:b2b_product_category:${p.cat}`],
      },
      'en-US': {
        title: p.en.title,
        slug: p.slug,
        sku: p.sku,
        brand: 'Cizhenyu',
        summary: p.en.summary,
        description: p.en.description,
        images: [{ url: img(p.cover, 800, 600) }, { url: img(`${p.cover}+UI`, 800, 600) }],
        availability: 'InStock',
        status: 'published',
        spec_data: { module: p.sku, stack: 'Cloudflare' },
        seo_title: `${p.en.title} | Cizhenyu`,
        seo_description: p.en.summary,
        robots_directive: 'index,follow',
        schema_type: 'Product',
        og_image: { url: img(p.cover, 1200, 630) },
        tagline: p.en.tagline,
        advantages: p.en.advantages,
        taxonomy_ids: [`__BY_SLUG__:b2b_product_category:${p.cat}`],
      },
    }),
  })),
});

// —— nav menus ——
writeJson('nav_menu.json', {
  collectionSlug: 'b2b_nav_menu',
  items: [
    {
      languageGroupKey: lgk('nmen', 1),
      locales: L({
        'zh-CN': { name: '页头导航', slug: 'header', menu_type: 'header' },
        'zh-TW': { name: '頁頭導航', slug: 'header', menu_type: 'header' },
        ja: { name: 'ヘッダーナビ', slug: 'header', menu_type: 'header' },
        'en-US': { name: 'Header Nav', slug: 'header', menu_type: 'header' },
      }),
    },
    {
      languageGroupKey: lgk('nmen', 2),
      locales: L({
        'zh-CN': { name: '页脚导航', slug: 'footer', menu_type: 'footer' },
        'zh-TW': { name: '頁腳導航', slug: 'footer', menu_type: 'footer' },
        ja: { name: 'フッターナビ', slug: 'footer', menu_type: 'footer' },
        'en-US': { name: 'Footer Nav', slug: 'footer', menu_type: 'footer' },
      }),
    },
  ],
});

/** ycz.me 风格：首页 / 产品 / 解决方案 / 资源 / 关于；询盘走 CTA 按钮也可进导航 */
const navItems = [
  { n: 1, slug: 'home', sort: 10, mode: 'link', path: (l) => `/${l}`, zh: '首页', tw: '首頁', ja: 'ホーム', en: 'Home' },
  {
    n: 2,
    slug: 'products',
    sort: 20,
    mode: 'reference',
    refType: 'b2b_product',
    zh: '产品',
    tw: '產品',
    ja: '製品',
    en: 'Products',
  },
  {
    n: 3,
    slug: 'solutions',
    sort: 30,
    mode: 'link',
    path: (l) => `/${l}/solutions`,
    zh: '解决方案',
    tw: '解決方案',
    ja: 'ソリューション',
    en: 'Solutions',
  },
  {
    n: 4,
    slug: 'resources',
    sort: 40,
    mode: 'link',
    path: (l) => `/${l}/articles`,
    zh: '资源',
    tw: '資源',
    ja: 'リソース',
    en: 'Resources',
  },
  {
    n: 5,
    slug: 'about',
    sort: 50,
    mode: 'link',
    path: (l) => `/${l}/about`,
    zh: '关于',
    tw: '關於',
    ja: '会社概要',
    en: 'About',
  },
  {
    n: 6,
    slug: 'contact',
    sort: 60,
    mode: 'link',
    path: (l) => `/${l}/contact`,
    zh: '询盘',
    tw: '詢盤',
    ja: 'お問い合わせ',
    en: 'Inquiry',
  },
];

function navLocale(item, loc, title) {
  const base = {
    nav_menu_ids: ['__BY_SLUG__:b2b_nav_menu:header'],
    title,
    slug: item.slug,
    link_mode: item.mode,
    sort_order: item.sort,
    open_in_new_tab: ['no'],
    status: 'published',
  };
  if (item.mode === 'link') base.link_url = item.path(loc);
  else
    base.target_reference = {
      type: 'internal',
      refType: item.refType,
      title,
      description: title,
    };
  return base;
}

writeJson('nav_menu_item.json', {
  collectionSlug: 'b2b_nav_menu_item',
  items: [
    ...navItems.map((item) => ({
      languageGroupKey: lgk('nmit', item.n),
      locales: L({
        'zh-CN': navLocale(item, 'zh-CN', item.zh),
        'zh-TW': navLocale(item, 'zh-TW', item.tw),
        ja: navLocale(item, 'ja', item.ja),
        'en-US': navLocale(item, 'en-US', item.en),
      }),
    })),
    // footer mirrors key links
    ...[1, 2, 5, 6].map((n, idx) => {
      const item = navItems.find((x) => x.n === n);
      const mk = (loc, title) => {
        const o = navLocale(item, loc, title);
        o.nav_menu_ids = ['__BY_SLUG__:b2b_nav_menu:footer'];
        o.sort_order = (idx + 1) * 10;
        return o;
      };
      return {
        languageGroupKey: lgk('nmif', n),
        locales: L({
          'zh-CN': mk('zh-CN', item.zh),
          'zh-TW': mk('zh-TW', item.tw),
          ja: mk('ja', item.ja),
          'en-US': mk('en-US', item.en),
        }),
      };
    }),
  ],
});

// —— pages ——
writeJson('page.json', {
  collectionSlug: 'b2b_page',
  items: [
    {
      languageGroupKey: lgk('page', 1),
      locales: L({
        'zh-CN': {
          title: '关于我们',
          slug: 'about',
          summary: '我们只做一件事：让外贸获客可复制',
          content:
            '<p>磁帧鱼围绕外贸 B2B 成交链路提供系统能力：内容在后台沉淀，站点对搜索与买家友好，部署降低上线门槛，询盘中台守住转化，本地 Agent 把 SEO/GEO 与社媒变成日常动作。</p><p><strong>原则：</strong>资产在客户自己的云账户；先解决痛点再谈扩展模块；自动化必须省事、可控、可复盘。价格不在官网公示，请提交询盘。</p>',
          target_reference: [
            { type: 'internal', refType: 'b2b_product', refId: '__BY_SLUG__:cizhenyu-cms', title: '磁帧鱼后台' },
            { type: 'internal', refType: 'b2b_product', refId: '__BY_SLUG__:cizhenyu-deploy', title: '磁帧鱼部署' },
          ],
          status: 'published',
          seo_title: '关于磁帧鱼',
          seo_description: '磁帧鱼外贸 B2B 增长流水线介绍。',
          robots_directive: 'index,follow',
          schema_type: 'AboutPage',
          og_image: { url: img('About', 1200, 630) },
        },
        'zh-TW': {
          title: '關於我們',
          slug: 'about',
          summary: '我們只做一件事：讓外貿獲客可複製',
          content:
            '<p>磁幀魚圍繞外貿 B2B 成交鏈路提供系統能力。資產在客戶自己的雲帳戶；價格不在官網公示，請提交詢盤。</p>',
          target_reference: [
            { type: 'internal', refType: 'b2b_product', refId: '__BY_SLUG__:cizhenyu-cms', title: '磁幀魚後台' },
          ],
          status: 'published',
          seo_title: '關於磁幀魚',
          seo_description: '磁幀魚外貿 B2B 增長流水線介紹。',
          robots_directive: 'index,follow',
          schema_type: 'AboutPage',
          og_image: { url: img('About', 1200, 630) },
        },
        ja: {
          title: '会社概要',
          slug: 'about',
          summary: '輸出獲得を再現可能にする',
          content:
            '<p>磁帧鱼は輸出 B2B の受注導線向けシステムです。資産はお客様のクラウドアカウントへ。価格は公開せずお問い合わせください。</p>',
          target_reference: [
            { type: 'internal', refType: 'b2b_product', refId: '__BY_SLUG__:cizhenyu-cms', title: '磁帧鱼 CMS' },
          ],
          status: 'published',
          seo_title: '磁帧鱼について',
          seo_description: '磁帧鱼の紹介。',
          robots_directive: 'index,follow',
          schema_type: 'AboutPage',
          og_image: { url: img('About', 1200, 630) },
        },
        'en-US': {
          title: 'About',
          slug: 'about',
          summary: 'Make export acquisition repeatable',
          content:
            '<p>Cizhenyu provides a B2B export growth pipeline: CMS, SEO/GEO site, wizard deploy, inquiry hub, and local Agent ops. Assets live on your cloud account. Pricing is not listed — inquire for a plan.</p>',
          target_reference: [
            { type: 'internal', refType: 'b2b_product', refId: '__BY_SLUG__:cizhenyu-cms', title: 'Cizhenyu CMS' },
            { type: 'internal', refType: 'b2b_product', refId: '__BY_SLUG__:cizhenyu-deploy', title: 'Cizhenyu Deploy' },
          ],
          status: 'published',
          seo_title: 'About Cizhenyu',
          seo_description: 'About the Cizhenyu B2B export growth pipeline.',
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
          title: '联系与询盘',
          slug: 'contact',
          summary: '告诉我们您的获客瓶颈——无需先选套餐',
          content:
            '<p>留下行业、目标市场与现状（有无网站 / 询盘渠道 / 是否要做 SEO·GEO 或社媒自动化）。我们回复可行路径与模块组合建议。</p><p>邮箱：<a href="mailto:hello@ycz.me">hello@ycz.me</a> · 官网：<a href="https://ycz.me">ycz.me</a></p><p>官网不公示套餐价格。</p>',
          status: 'published',
          seo_title: '联系与询盘｜磁帧鱼',
          seo_description: '提交外贸获客需求，获取部署与运营方案建议。',
          robots_directive: 'index,follow',
          schema_type: 'ContactPage',
          og_image: { url: img('Contact', 1200, 630) },
        },
        'zh-TW': {
          title: '聯繫與詢盤',
          slug: 'contact',
          summary: '告訴我們您的獲客瓶頸——無需先選套餐',
          content:
            '<p>留下行業、目標市場與現狀。郵箱：<a href="mailto:hello@ycz.me">hello@ycz.me</a>。官網不公示套餐價格。</p>',
          status: 'published',
          seo_title: '聯繫與詢盤｜磁幀魚',
          seo_description: '提交外貿獲客需求，獲取方案建議。',
          robots_directive: 'index,follow',
          schema_type: 'ContactPage',
          og_image: { url: img('Contact', 1200, 630) },
        },
        ja: {
          title: 'お問い合わせ',
          slug: 'contact',
          summary: '課題を教えてください。プラン選択は不要です',
          content:
            '<p>業界・市場・現状をお送りください。<a href="mailto:hello@ycz.me">hello@ycz.me</a>。公開料金表はありません。</p>',
          status: 'published',
          seo_title: 'お問い合わせ｜磁帧鱼',
          seo_description: '輸出獲得のご相談。',
          robots_directive: 'index,follow',
          schema_type: 'ContactPage',
          og_image: { url: img('Contact', 1200, 630) },
        },
        'en-US': {
          title: 'Contact & inquiry',
          slug: 'contact',
          summary: 'Tell us your acquisition bottlenecks — no package pick required',
          content:
            '<p>Share industry, target markets, and current status. Email <a href="mailto:hello@ycz.me">hello@ycz.me</a> · <a href="https://ycz.me">ycz.me</a>. Pricing is not listed publicly.</p>',
          status: 'published',
          seo_title: 'Contact & inquiry | Cizhenyu',
          seo_description: 'Inquire for a deploy and ops plan for export acquisition.',
          robots_directive: 'index,follow',
          schema_type: 'ContactPage',
          og_image: { url: img('Contact', 1200, 630) },
        },
      }),
    },
  ],
});

// —— content blocks ——
const pains = [
  {
    n: 10,
    slug: 'pain-slow-site',
    zh: {
      title: '有产品，没有能接单的网站',
      summary: '依赖平台与展会；独立站像宣传册，搜不到、转化弱，渠道一变业绩就抖。',
    },
    en: {
      title: 'Products, but no site that wins orders',
      summary: 'Platform-dependent; brochure sites that do not rank or convert.',
    },
    ja: {
      title: '製品はあるが受注サイトがない',
      summary: 'プラットフォーム依存。パンフサイトでは検索も転換も弱い。',
    },
  },
  {
    n: 11,
    slug: 'pain-cloud-hard',
    zh: {
      title: '技术门槛吃掉业务时间',
      summary: 'Cloudflare、域名、Workers、缓存学不完；项目卡在半成品或被代理商绑架。',
    },
    en: {
      title: 'Tech overhead eats selling time',
      summary: 'Cloudflare complexity stalls launches or locks you to agencies.',
    },
    ja: {
      title: '技術ハードルが営業時間を奪う',
      summary: 'Cloudflare 設定に追われ、半完成のまま止まる。',
    },
  },
  {
    n: 12,
    slug: 'pain-leads',
    zh: {
      title: '询盘进来没人跟、跟了丢线索',
      summary: '时差夜间无人回；参数问答重复；线索散落聊天软件无法复盘。',
    },
    en: {
      title: 'Inquiries arrive — then get lost',
      summary: 'Night gaps, repeated tech Q&A, leads stuck in personal chats.',
    },
    ja: {
      title: '問い合わせが来ても逃す',
      summary: '時差・重複質問・チャット散在でフォロー不能。',
    },
  },
];

writeJson('content_block.json', {
  collectionSlug: 'b2b_content_block',
  items: [
    {
      languageGroupKey: lgk('blok', 1),
      locales: L({
        'zh-CN': {
          name: '首页首屏',
          slug: 'home-hero',
          block_type: 'hero',
          placement: 'home_hero',
          eyebrow: '外贸 B2B 增长流水线',
          title: '从建站到询盘成交，一套系统跑通获客',
          subtitle:
            '面向个人业务员与中小外贸企业。站点建设、SEO/GEO、智能询盘客服、社媒与日常运营自动化——成熟方案，少折腾、快上线。',
          summary: '一键部署到自有 Cloudflare · 数据自有 · 支持多语言',
          content: '',
          link_label: '免费获取方案诊断',
          link_url: '/zh-CN/contact',
          image: { url: img('Pipeline', 1600, 900) },
          status: 'published',
          sort_order: 1,
        },
        'zh-TW': {
          name: '首頁首屏',
          slug: 'home-hero',
          block_type: 'hero',
          placement: 'home_hero',
          eyebrow: '外貿 B2B 增長流水線',
          title: '從建站到詢盤成交，一套系統跑通獲客',
          subtitle:
            '面向個人業務員與中小外貿企業。站點建設、SEO/GEO、智能詢盤客服、社媒與日常運營自動化。',
          summary: '一鍵部署到自有 Cloudflare · 資料自有 · 支援多語言',
          content: '',
          link_label: '免費獲取方案診斷',
          link_url: '/zh-TW/contact',
          image: { url: img('Pipeline', 1600, 900) },
          status: 'published',
          sort_order: 1,
        },
        ja: {
          name: 'ホームヒーロー',
          slug: 'home-hero',
          block_type: 'hero',
          placement: 'home_hero',
          eyebrow: '輸出 B2B 成長パイプライン',
          title: 'サイトから問い合わせ成約まで、一本の流れで',
          subtitle:
            '個人営業と中小輸出企業向け。構築・SEO/GEO・AI 問い合わせ・SNS/日常運用の自動化。',
          summary: '自 Cloudflare へ導入 · データは自社 · 多言語',
          content: '',
          link_label: '無料診断を依頼',
          link_url: '/ja/contact',
          image: { url: img('Pipeline', 1600, 900) },
          status: 'published',
          sort_order: 1,
        },
        'en-US': {
          name: 'Home Hero',
          slug: 'home-hero',
          block_type: 'hero',
          placement: 'home_hero',
          eyebrow: 'B2B export growth pipeline',
          title: 'From site launch to closed inquiries — one runnable stack',
          subtitle:
            'For solo sellers and SMEs: site, SEO/GEO, inquiry AI/CRM, and automated social/ops playbooks.',
          summary: 'Deploy to your Cloudflare · your data · multi-locale',
          content: '',
          link_label: 'Get a free diagnosis',
          link_url: '/en-US/contact',
          image: { url: img('Pipeline', 1600, 900) },
          status: 'published',
          sort_order: 1,
        },
      }),
    },
    {
      languageGroupKey: lgk('blok', 2),
      locales: L({
        'zh-CN': {
          name: '页脚 CTA',
          slug: 'footer-cta',
          block_type: 'cta',
          placement: 'footer_cta',
          title: '先谈您的获客瓶颈，再谈系统怎么配',
          summary: '留下行业与目标市场，获取模块组合建议。价格不在线公示。',
          link_label: '提交询盘',
          link_url: '/zh-CN/contact',
          background_image: { url: img('CTA', 1600, 600) },
          status: 'published',
          sort_order: 2,
        },
        'zh-TW': {
          name: '頁腳 CTA',
          slug: 'footer-cta',
          block_type: 'cta',
          placement: 'footer_cta',
          title: '先談您的獲客瓶頸，再談系統怎麼配',
          summary: '留下行業與目標市場，獲取模組組合建議。價格不在線公示。',
          link_label: '提交詢盤',
          link_url: '/zh-TW/contact',
          background_image: { url: img('CTA', 1600, 600) },
          status: 'published',
          sort_order: 2,
        },
        ja: {
          name: 'フッター CTA',
          slug: 'footer-cta',
          block_type: 'cta',
          placement: 'footer_cta',
          title: 'まずは課題から。構成はあとで',
          summary: '業界と市場を共有してください。公開料金表はありません。',
          link_label: '問い合わせる',
          link_url: '/ja/contact',
          background_image: { url: img('CTA', 1600, 600) },
          status: 'published',
          sort_order: 2,
        },
        'en-US': {
          name: 'Footer CTA',
          slug: 'footer-cta',
          block_type: 'cta',
          placement: 'footer_cta',
          title: 'Talk bottlenecks first, stack second',
          summary: 'Share industry and markets for a module plan. Pricing not listed.',
          link_label: 'Send inquiry',
          link_url: '/en-US/contact',
          background_image: { url: img('CTA', 1600, 600) },
          status: 'published',
          sort_order: 2,
        },
      }),
    },
    ...pains.map((p) => ({
      languageGroupKey: lgk('blok', p.n),
      locales: L({
        'zh-CN': {
          name: p.zh.title,
          slug: p.slug,
          block_type: 'feature',
          placement: 'home_advantage',
          title: p.zh.title,
          summary: p.zh.summary,
          status: 'published',
          sort_order: p.n,
        },
        'zh-TW': {
          name: tw(p.zh.title),
          slug: p.slug,
          block_type: 'feature',
          placement: 'home_advantage',
          title: tw(p.zh.title),
          summary: tw(p.zh.summary),
          status: 'published',
          sort_order: p.n,
        },
        ja: {
          name: p.ja.title,
          slug: p.slug,
          block_type: 'feature',
          placement: 'home_advantage',
          title: p.ja.title,
          summary: p.ja.summary,
          status: 'published',
          sort_order: p.n,
        },
        'en-US': {
          name: p.en.title,
          slug: p.slug,
          block_type: 'feature',
          placement: 'home_advantage',
          title: p.en.title,
          summary: p.en.summary,
          status: 'published',
          sort_order: p.n,
        },
      }),
    })),
  ],
});

// —— FAQ ——
const faqs = [
  {
    n: 1,
    zh: ['一定要买全套吗？', '不必。可按阶段上线：先站与后台，再询盘与自动化运营。'],
    en: ['Must I buy everything?', 'No. Stage it: site+CMS first, then inquiry hub and Agent ops.'],
    ja: ['フルセット必須？', 'いいえ。サイト+CMS から段階導入できます。'],
  },
  {
    n: 2,
    zh: ['会不会绑定你们的服务器？', '部署目标是您自己的 Cloudflare 账户，资产与账号归您。'],
    en: ['Do you host and lock my data?', 'Deploy targets your Cloudflare account — assets stay yours.'],
    ja: ['御社サーバーにロック？', 'お客様の Cloudflare アカウントへ導入します。'],
  },
  {
    n: 3,
    zh: ['不懂技术能用吗？', '部署向导与日常改内容面向业务人员；复杂定制可再评估。'],
    en: ['Can non-engineers use it?', 'Wizards and CMS edits are operator-friendly; custom work is optional.'],
    ja: ['非エンジニアでも？', 'ウィザードと CMS 更新は現場向け。高度要件は別途。'],
  },
  {
    n: 4,
    zh: ['支持多语言吗？', '展示站与后台按多语言 B2B 场景设计，可按目标市场开启。'],
    en: ['Multi-locale?', 'Yes — site and CMS are designed for multi-locale B2B.'],
    ja: ['多言語は？', 'サイトと CMS は多言語 B2B 向けです。'],
  },
  {
    n: 5,
    zh: ['AI 客服会乱承诺价格或交期吗？', '应答基于您维护的知识库；关键承诺可配置转人工。'],
    en: ['Will AI invent prices?', 'Answers use your KB; commitments can require human handoff.'],
    ja: ['AI が価格を勝手に？', 'KB ベース。重要約束は有人引き継ぎ可能。'],
  },
  {
    n: 6,
    zh: ['Agent 会不会很耗 Token？', '方案强调成熟流程与一键动作，目标是少试错、低消耗地完成日常运营。'],
    en: ['Will Agent burn tokens?', 'Playbooks prioritize mature one-click flows to keep daily burn low.'],
    ja: ['Token を大量消費？', '成熟プレイブックで無駄な試行を減らします。'],
  },
  {
    n: 7,
    zh: ['价格在哪里看？', '因模块组合与行业差异，价格不在官网公示。请提交询盘或预约演示。'],
    en: ['Where is pricing?', 'Not listed publicly due to module mix — inquire or book a demo.'],
    ja: ['価格は？', '構成により異なるため非公開。お問い合わせください。'],
  },
  {
    n: 8,
    zh: ['多久能上线第一版站点？', '视域名与内容准备情况而定；部署流程已产品化，演示时可按现状估算。'],
    en: ['How fast to v1?', 'Depends on domain/content readiness; deploy is productized — estimate in a demo.'],
    ja: ['初版公開まで？', 'ドメインとコンテンツ次第。デモで見積可能。'],
  },
];

writeJson('faq.json', {
  collectionSlug: 'b2b_faq',
  items: faqs.map((f) => ({
    languageGroupKey: lgk('faq0', f.n),
    locales: L({
      'zh-CN': {
        question: f.zh[0],
        answer: `<p>${f.zh[1]}</p>`,
        status: 'published',
        sort_order: f.n * 10,
        seo_title: f.zh[0],
        short_answer: f.zh[1],
      },
      'zh-TW': {
        question: tw(f.zh[0]),
        answer: `<p>${tw(f.zh[1])}</p>`,
        status: 'published',
        sort_order: f.n * 10,
        seo_title: tw(f.zh[0]),
        short_answer: tw(f.zh[1]),
      },
      ja: {
        question: f.ja[0],
        answer: `<p>${f.ja[1]}</p>`,
        status: 'published',
        sort_order: f.n * 10,
        seo_title: f.ja[0],
        short_answer: f.ja[1],
      },
      'en-US': {
        question: f.en[0],
        answer: `<p>${f.en[1]}</p>`,
        status: 'published',
        sort_order: f.n * 10,
        seo_title: f.en[0],
        short_answer: f.en[1],
      },
    }),
  })),
});

// —— articles (placeholders) ——
const articles = [
  {
    n: 1,
    slug: 'b2b-site-vs-marketplace',
    zh: '外贸独立站和 B2B 平台，到底该怎么分工？',
    en: 'How should export sites and B2B marketplaces split roles?',
    ja: '自社サイトと B2B プラットフォームの役割分担',
  },
  {
    n: 2,
    slug: 'what-is-geo-for-exporters',
    zh: '什么是 GEO（生成式引擎优化），外贸站为什么要布局？',
    en: 'What is GEO for exporters, and why it matters',
    ja: '輸出サイトのための GEO とは',
  },
  {
    n: 3,
    slug: 'low-token-seo-ops',
    zh: '低 Token 消耗的自动化运营，靠的是流程还是模型？',
    en: 'Low-token SEO ops: playbooks beat prompt theatre',
    ja: '低 Token 運用はモデルより手順',
  },
];

writeJson('article.json', {
  collectionSlug: 'b2b_article',
  items: articles.map((a) => ({
    languageGroupKey: lgk('arti', a.n),
    locales: L({
      'zh-CN': {
        title: a.zh,
        slug: a.slug,
        author: '磁帧鱼',
        summary: `【占位文章】关于「${a.zh}」的说明将持续补充。当前用于站点结构与 SEO 占位。`,
        excerpt: a.zh,
        cover: { url: img(`Article${a.n}`, 960, 540) },
        content: `<p>【占位】正文待补充。</p><p>主题：${a.zh}</p><p>欢迎通过询盘告诉我们您最关心的行业场景，我们优先完善对应教程。</p>`,
        status: 'published',
        featured: a.n === 1 ? ['1'] : [],
        reading_time: 4,
        seo_title: a.zh,
        seo_description: `占位文章：${a.zh}`,
        robots_directive: 'index,follow',
        schema_type: 'Article',
        og_image: { url: img(`Article${a.n}`, 1200, 630) },
        content_type: 'guide',
        short_answer: `核心结论（占位）：${a.zh}——完整正文将陆续发布。`,
        related_product_ids: ['__BY_SLUG__:b2b_product:cizhenyu-site'],
      },
      'zh-TW': {
        title: tw(a.zh),
        slug: a.slug,
        author: '磁幀魚',
        summary: `【佔位文章】關於「${tw(a.zh)}」的說明將持續補充。`,
        excerpt: tw(a.zh),
        cover: { url: img(`Article${a.n}`, 960, 540) },
        content: `<p>【佔位】正文待補充。</p><p>主題：${tw(a.zh)}</p>`,
        status: 'published',
        featured: a.n === 1 ? ['1'] : [],
        reading_time: 4,
        seo_title: tw(a.zh),
        seo_description: `佔位文章：${tw(a.zh)}`,
        robots_directive: 'index,follow',
        schema_type: 'Article',
        og_image: { url: img(`Article${a.n}`, 1200, 630) },
        content_type: 'guide',
        short_answer: `核心結論（佔位）：${tw(a.zh)}`,
        related_product_ids: ['__BY_SLUG__:b2b_product:cizhenyu-site'],
      },
      ja: {
        title: a.ja,
        slug: a.slug,
        author: '磁帧鱼',
        summary: `【プレースホルダー】「${a.ja}」の本文は今後追記します。`,
        excerpt: a.ja,
        cover: { url: img(`Article${a.n}`, 960, 540) },
        content: `<p>【プレースホルダー】本文準備中。</p><p>テーマ：${a.ja}</p>`,
        status: 'published',
        featured: a.n === 1 ? ['1'] : [],
        reading_time: 4,
        seo_title: a.ja,
        seo_description: `プレースホルダー：${a.ja}`,
        robots_directive: 'index,follow',
        schema_type: 'Article',
        og_image: { url: img(`Article${a.n}`, 1200, 630) },
        content_type: 'guide',
        short_answer: `要約（仮）：${a.ja}`,
        related_product_ids: ['__BY_SLUG__:b2b_product:cizhenyu-site'],
      },
      'en-US': {
        title: a.en,
        slug: a.slug,
        author: 'Cizhenyu',
        summary: `[Placeholder] Full guide for “${a.en}” will be expanded. Used for IA/SEO scaffolding.`,
        excerpt: a.en,
        cover: { url: img(`Article${a.n}`, 960, 540) },
        content: `<p>[Placeholder] Body forthcoming.</p><p>Topic: ${a.en}</p><p>Tell us your industry via inquiry and we will prioritize the matching tutorial.</p>`,
        status: 'published',
        featured: a.n === 1 ? ['1'] : [],
        reading_time: 4,
        seo_title: a.en,
        seo_description: `Placeholder article: ${a.en}`,
        robots_directive: 'index,follow',
        schema_type: 'Article',
        og_image: { url: img(`Article${a.n}`, 1200, 630) },
        content_type: 'guide',
        short_answer: `Placeholder takeaway: ${a.en}`,
        related_product_ids: ['__BY_SLUG__:b2b_product:cizhenyu-site'],
      },
    }),
  })),
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
    'nav_menu.json',
    'page.json',
    'content_block.json',
    'nav_menu_item.json',
  ],
  requiredByModule: {
    _always: [
      'company_info.json',
      'nav_menu.json',
      'nav_menu_item.json',
      'page.json',
      'content_block.json',
    ],
    products: ['product_category.json', 'product.json'],
    articles: ['article.json'],
    faq: ['faq.json'],
  },
  notes:
    'Cizhenyu real product seed for default theme. b2b_* slugs rewritten to {ns}_* on deploy inject. Articles marked placeholder.',
});

fs.writeFileSync(
  path.join(__dirname, 'README.md'),
  `# default 主题种子（磁帧鱼）

格式对齐 turmill / \`cizhenyu_payload\` b2b data：

- \`collectionSlug\` 恒为 \`b2b_*\`（deploy 注入时改写为 \`{siteKey}_*\`）
- \`items[].languageGroupKey\` + \`locales\`
- 关联用 \`__BY_SLUG__:b2b_collection:slug\`

## 内容说明

- **产品**：5 个真实模块（后台 / 展示站 / 部署 / 询盘中台 / Agent）
- **文章**：SEO 选题占位，正文标注「占位」
- **导航**：首页 · 产品 · 解决方案 · 资源 · 关于 · 询盘（对齐 ycz.me 信息架构）
- **价格**：文案引导询盘，不写套餐价

重新生成：

\`\`\`bash
node src/ui/themes/default/seed/build-seed.mjs
\`\`\`
`,
  'utf8',
);
console.log('wrote README.md');
console.log('done');
