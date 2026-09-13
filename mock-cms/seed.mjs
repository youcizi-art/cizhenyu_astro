/**
 * Mock CMS 种子数据：字段对齐 sites/b2b 模型，信封形状对齐 /api/p。
 * 切换真实后端时只需改 PUBLIC_CMS_API_BASE，无需改前端代码。
 */

const now = 1_700_000_000_000;

/** @param {string} id @param {string} locale @param {string} group @param {Record<string, unknown>} data */
function row(id, locale, group, data) {
  return {
    id,
    locale,
    language_group_key: group,
    data,
    created_at: now,
    updated_at: now,
  };
}

const IMG = {
  press: 'https://picsum.photos/seed/cizhenyu-press/800/600',
  pump: 'https://picsum.photos/seed/cizhenyu-pump/800/600',
  logo: 'https://picsum.photos/seed/cizhenyu-logo/200/80',
  hero: 'https://picsum.photos/seed/cizhenyu-hero/1400/700',
};

export const languages = {
  list: [
    { code: 'en', name: 'English', isDefault: true, status: 'active', sortOrder: 0 },
    { code: 'zh-CN', name: '简体中文', isDefault: false, status: 'active', sortOrder: 1 },
  ],
};

/** path → entity rows（双语共享 language_group_key） */
export const collections = {
  'b2b/settings/b2b_company_info': [
    row('11111111-1111-4111-8111-111111111101', 'en', 'g-company', {
      company_name: 'Demo Industrial Co.',
      slogan: 'Reliable B2B manufacturing partner',
      summary: 'We design and export industrial components for global buyers.',
      address: '88 Harbor Road, Ningbo, China',
      phone: '+86-574-0000-0000',
      email: 'sales@demo-industrial.example',
      website: 'https://www.example.com',
      logo: { url: IMG.logo },
      about_content: '<p>Founded for export buyers who need stable quality and clear specs.</p>',
    }),
    row('11111111-1111-4111-8111-111111111102', 'zh-CN', 'g-company', {
      company_name: '演示工业有限公司',
      slogan: '可靠的 B2B 制造伙伴',
      summary: '面向全球采购商的工业零部件设计与出口。',
      address: '中国宁波港湾路 88 号',
      phone: '+86-574-0000-0000',
      email: 'sales@demo-industrial.example',
      website: 'https://www.example.com',
      logo: { url: IMG.logo },
      about_content: '<p>专注出口采购场景：稳定质量、清晰规格、可追踪交期。</p>',
    }),
  ],

  'b2b/products/b2b_product': [
    row('22222222-2222-4222-8222-222222222201', 'en', 'g-product-press', {
      title: 'Hydraulic Press HP-200',
      slug: 'hydraulic-press-hp-200',
      sku: 'HP-200',
      brand: 'DemoForce',
      summary: 'Compact hydraulic press for small-batch metal forming.',
      description: '<p>The <strong>HP-200</strong> delivers stable tonnage with a small footprint.</p><p>Ideal for OEM lines that need quick changeovers.</p>',
      images: [{ url: IMG.press }, { url: 'https://picsum.photos/seed/cizhenyu-press-2/800/600' }],
      price: 12800,
      price_currency: 'USD',
      availability: 'InStock',
      status: 'published',
      spec_data: {
        tonnage: '200 ton',
        footprint: '2.4m x 1.8m',
        power: '15 kW',
      },
      seo_title: 'Hydraulic Press HP-200 | Demo Industrial',
      seo_description: 'Compact hydraulic press for OEM metal forming.',
    }),
    row('22222222-2222-4222-8222-222222222202', 'zh-CN', 'g-product-press', {
      title: '液压机 HP-200',
      slug: 'hydraulic-press-hp-200',
      sku: 'HP-200',
      brand: 'DemoForce',
      summary: '面向小批量金属成型的紧凑型液压机。',
      description: '<p><strong>HP-200</strong> 以较小占地面积提供稳定吨位。</p><p>适合需要快速换型的 OEM 产线。</p>',
      images: [{ url: IMG.press }, { url: 'https://picsum.photos/seed/cizhenyu-press-2/800/600' }],
      price: 12800,
      price_currency: 'USD',
      availability: 'InStock',
      status: 'published',
      spec_data: {
        tonnage: '200 吨',
        footprint: '2.4m x 1.8m',
        power: '15 kW',
      },
      seo_title: '液压机 HP-200 | 演示工业',
      seo_description: '面向 OEM 金属成型的紧凑型液压机。',
    }),
    row('22222222-2222-4222-8222-222222222203', 'en', 'g-product-pump', {
      title: 'Centrifugal Pump CP-50',
      slug: 'centrifugal-pump-cp-50',
      sku: 'CP-50',
      brand: 'DemoFlow',
      summary: 'Industrial centrifugal pump for process cooling loops.',
      description: '<p>Stainless wet parts, IE3 motor option, easy seal service.</p>',
      images: [{ url: IMG.pump }],
      price: 3200,
      price_currency: 'USD',
      availability: 'InStock',
      status: 'published',
      seo_title: 'Centrifugal Pump CP-50',
      seo_description: 'Process cooling pump with stainless wet parts.',
    }),
    row('22222222-2222-4222-8222-222222222204', 'zh-CN', 'g-product-pump', {
      title: '离心泵 CP-50',
      slug: 'centrifugal-pump-cp-50',
      sku: 'CP-50',
      brand: 'DemoFlow',
      summary: '用于工艺冷却回路的工业离心泵。',
      description: '<p>过流件不锈钢，可选 IE3 电机，密封维护便捷。</p>',
      images: [{ url: IMG.pump }],
      price: 3200,
      price_currency: 'USD',
      availability: 'InStock',
      status: 'published',
      seo_title: '离心泵 CP-50',
      seo_description: '过流件不锈钢工艺冷却泵。',
    }),
    // draft：公开 API 应隐藏
    row('22222222-2222-4222-8222-222222222299', 'en', 'g-product-draft', {
      title: 'Draft Only Product',
      slug: 'draft-only-product',
      status: 'draft',
      summary: 'Should not appear in public list',
      description: '<p>hidden</p>',
      images: [],
    }),
  ],

  'b2b/content/b2b_content_block': [
    row('33333333-3333-4333-8333-333333333301', 'en', 'g-hero', {
      name: 'Home Hero',
      slug: 'home-hero',
      block_type: 'hero',
      placement: 'home_hero',
      eyebrow: 'Industrial export',
      title: 'Build trust with clear product pages',
      subtitle: 'Demo B2B site powered by cizhenyu_payload',
      summary: 'Browse products, case studies, and company facts in two languages.',
      content: '',
      link_label: 'View products',
      link_url: '/en/products',
      status: 'published',
      image: { url: IMG.hero },
      sort_order: 1,
    }),
    row('33333333-3333-4333-8333-333333333302', 'zh-CN', 'g-hero', {
      name: '首页首屏',
      slug: 'home-hero',
      block_type: 'hero',
      placement: 'home_hero',
      eyebrow: '工业出口',
      title: '用清晰的产品页建立信任',
      subtitle: '基于 cizhenyu_payload 的演示 B2B 站',
      summary: '双语浏览产品、案例与公司信息。',
      content: '',
      link_label: '查看产品',
      link_url: '/zh-CN/products',
      status: 'published',
      image: { url: IMG.hero },
      sort_order: 1,
    }),
  ],

  'b2b/content/b2b_article': [
    row('44444444-4444-4444-8444-444444444401', 'en', 'g-article-1', {
      title: 'How we qualify OEM suppliers',
      slug: 'qualify-oem-suppliers',
      author: 'Demo Editorial',
      summary: 'A practical checklist for first-round factory audits.',
      excerpt: 'A practical checklist for first-round factory audits.',
      cover: { url: 'https://picsum.photos/seed/cizhenyu-article/900/500' },
      content: '<p>Start with process capability, then packaging, then after-sales response time.</p>',
      status: 'published',
      seo_title: 'Qualify OEM suppliers',
      seo_description: 'Factory audit checklist for buyers.',
    }),
    row('44444444-4444-4444-8444-444444444402', 'zh-CN', 'g-article-1', {
      title: '我们如何审核 OEM 供应商',
      slug: 'qualify-oem-suppliers',
      author: '演示编辑部',
      summary: '首轮工厂审核实用清单。',
      excerpt: '首轮工厂审核实用清单。',
      cover: { url: 'https://picsum.photos/seed/cizhenyu-article/900/500' },
      content: '<p>先看过程能力，再看包装，再看售后响应时效。</p>',
      status: 'published',
      seo_title: '审核 OEM 供应商',
      seo_description: '采购商工厂审核清单。',
    }),
  ],

  'b2b/content/b2b_page': [
    row('55555555-5555-4555-8555-555555555501', 'en', 'g-page-about', {
      title: 'About Us',
      slug: 'about',
      summary: 'Company overview for buyers.',
      content: '<p>We export hydraulic and fluid systems with documented QC.</p>',
      status: 'published',
    }),
    row('55555555-5555-4555-8555-555555555502', 'zh-CN', 'g-page-about', {
      title: '关于我们',
      slug: 'about',
      summary: '面向采购商的公司概览。',
      content: '<p>我们出口液压与流体系统，并提供可追溯质检记录。</p>',
      status: 'published',
    }),
    row('55555555-5555-4555-8555-555555555503', 'en', 'g-page-contact', {
      title: 'Contact',
      slug: 'contact',
      summary: 'Talk to sales.',
      content: '<p>Email sales@demo-industrial.example</p>',
      status: 'published',
    }),
    row('55555555-5555-4555-8555-555555555504', 'zh-CN', 'g-page-contact', {
      title: '联系我们',
      slug: 'contact',
      summary: '联系销售。',
      content: '<p>邮箱 sales@demo-industrial.example</p>',
      status: 'published',
    }),
  ],

  'b2b/content/b2b_case_study': [
    row('66666666-6666-4666-8666-666666666601', 'en', 'g-case-1', {
      title: 'Press line upgrade for EU buyer',
      slug: 'press-line-upgrade-eu',
      industry: 'Metal forming',
      client_name: 'Nordic Parts GmbH',
      summary: 'Replaced aging presses with HP-200 cells.',
      challenge: '<p>Throughput bottleneck and spare-parts delay.</p>',
      solution: '<p>Two HP-200 cells with shared tooling cart.</p>',
      results: '<p>Cycle time -18% in three months.</p>',
      content: '<p>Full project notes available on request.</p>',
      status: 'published',
    }),
    row('66666666-6666-4666-8666-666666666602', 'zh-CN', 'g-case-1', {
      title: '欧洲采购商产线升级',
      slug: 'press-line-upgrade-eu',
      industry: '金属成型',
      client_name: 'Nordic Parts GmbH',
      summary: '用 HP-200 单元替换老旧压机。',
      challenge: '<p>产能瓶颈与备件延误。</p>',
      solution: '<p>两台 HP-200 单元 + 共用换模车。</p>',
      results: '<p>三个月内节拍提升约 18%。</p>',
      content: '<p>完整项目说明可按需提供。</p>',
      status: 'published',
    }),
  ],

  'b2b/content/b2b_industry': [
    row('77777777-7777-4777-8777-777777777701', 'en', 'g-industry-1', {
      name: 'Metal Forming',
      slug: 'metal-forming',
      summary: 'Solutions for stamping and hydraulic forming lines.',
      pain_points: '<p>Unstable tonnage and long changeovers.</p>',
      solutions: '<p>Modular presses with shared tooling.</p>',
      content: '<p>We support OEM integrators across APAC and EU.</p>',
    }),
    row('77777777-7777-4777-8777-777777777702', 'zh-CN', 'g-industry-1', {
      name: '金属成型',
      slug: 'metal-forming',
      summary: '面向冲压与液压成型产线的方案。',
      pain_points: '<p>吨位不稳、换型时间长。</p>',
      solutions: '<p>模块化压机与共用工装。</p>',
      content: '<p>服务亚太与欧洲 OEM 集成商。</p>',
    }),
  ],

  'b2b/content/b2b_faq': [
    row('88888888-8888-4888-8888-888888888801', 'en', 'g-faq-1', {
      question: 'What is the MOQ for HP-200?',
      answer: '<p>Standard MOQ is 1 unit for sample validation, 3 units for production pricing.</p>',
      status: 'published',
      sort_order: 1,
    }),
    row('88888888-8888-4888-8888-888888888802', 'zh-CN', 'g-faq-1', {
      question: 'HP-200 的起订量是多少？',
      answer: '<p>样品验证通常 1 台起订；量产报价通常 3 台起。</p>',
      status: 'published',
      sort_order: 1,
    }),
  ],

  'b2b/content/b2b_resource': [
    row('99999999-9999-4999-8999-999999999901', 'en', 'g-resource-1', {
      title: 'HP-200 datasheet',
      slug: 'hp-200-datasheet',
      resource_type: 'datasheet',
      summary: 'PDF specs for hydraulic press HP-200.',
      description: '<p>Includes dimensions, tonnage curve, and utility requirements.</p>',
      cover: { url: 'https://picsum.photos/seed/cizhenyu-datasheet/600/400' },
      download_file: { url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      file_format: 'pdf',
      status: 'published',
      seo_title: 'HP-200 datasheet PDF',
      seo_description: 'Download hydraulic press specifications.',
    }),
    row('99999999-9999-4999-8999-999999999902', 'zh-CN', 'g-resource-1', {
      title: 'HP-200 规格书',
      slug: 'hp-200-datasheet',
      resource_type: 'datasheet',
      summary: '液压机 HP-200 PDF 规格。',
      description: '<p>含外形尺寸、吨位曲线与公用工程要求。</p>',
      cover: { url: 'https://picsum.photos/seed/cizhenyu-datasheet/600/400' },
      download_file: { url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      file_format: 'pdf',
      status: 'published',
      seo_title: 'HP-200 规格书 PDF',
      seo_description: '下载液压机规格文件。',
    }),
  ],
};

export function listKnownPaths() {
  return Object.keys(collections);
}
