/**
 * 首页通用 UI Chrome 标签（界面控件；业务叙事见 home-content.ts）
 */
export function defaultHomeLabels(locale: string) {
  const zhHant = locale === 'zh-TW' || locale === 'zh-HK';
  const zh = locale.startsWith('zh');
  const ja = locale === 'ja';

  if (zhHant) {
    return {
      exploreAll: '查看全部產品',
      readMore: '了解詳情',
      faqEyebrow: '常見問題',
      ctaBtn: '立即諮詢',
      productPrefix: 'Cloudflare 前後台建站系統',
      productPrefixCrm: 'CRM 客戶管理與 AI 智慧客服',
      productPrefixSeo: 'SEO / GEO 長期運營方案',
      compareHighlight: '推薦',
    };
  }

  if (zh) {
    return {
      exploreAll: '查看全部产品',
      readMore: '了解详情',
      faqEyebrow: '常见问题',
      ctaBtn: '立即咨询',
      productPrefix: 'Cloudflare 前后台建站系统',
      productPrefixCrm: 'CRM 客户管理与 AI 智能客服',
      productPrefixSeo: 'SEO / GEO 长期运营方案',
      compareHighlight: '推荐',
    };
  }

  if (ja) {
    return {
      exploreAll: 'すべての製品',
      readMore: '詳しく見る',
      faqEyebrow: 'よくある質問',
      ctaBtn: 'お問い合わせ',
      productPrefix: 'Cloudflare 前後台サイトシステム',
      productPrefixCrm: 'CRM と AI カスタマーサポート',
      productPrefixSeo: 'SEO / GEO 長期運用プラン',
      compareHighlight: 'おすすめ',
    };
  }

  return {
    exploreAll: 'View all products',
    readMore: 'Learn more',
    faqEyebrow: 'FAQ',
    ctaBtn: 'Contact us',
    productPrefix: 'Cloudflare site system',
    productPrefixCrm: 'CRM & AI support',
    productPrefixSeo: 'SEO / GEO growth plan',
    compareHighlight: 'Recommended',
  };
}

export function productSectionTitle(locale: string, index: string) {
  const labels = defaultHomeLabels(locale);
  if (index === '01') return `01 / ${labels.productPrefix}`;
  if (index === '02') return `02 / ${labels.productPrefixCrm}`;
  return `03 / ${labels.productPrefixSeo}`;
}
