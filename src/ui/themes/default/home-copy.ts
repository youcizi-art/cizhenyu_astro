/**
 * 首页通用 UI Chrome 标签（仅限界面控件与表头提示；业务数据一律由 CMS 注入）
 */
export function defaultHomeLabels(locale: string) {
  const zhHant = locale === 'zh-TW' || locale === 'zh-HK';
  const zh = locale.startsWith('zh');
  const ja = locale === 'ja';

  if (zhHant) {
    return {
      exploreAll: '查看全部產品',
      readMore: '了解詳情',
      downloadCta: '去下載安裝 / 詢盤',
      solveLabel: '解決方案',
      compareDim: '關鍵對比維度',
      compareColOld: '常見傳統模式',
      compareColNew: '本系統方案',
      painEyebrow: '痛點與突圍',
      productsEyebrow: '核心產品套件',
      compareEyebrow: '方案對比',
      stepsEyebrow: '實施路徑',
      testimonialsEyebrow: '客戶真實回饋',
      faqEyebrow: '常見問題',
      heroCtaPrimary: '免費獲取方案',
      heroCtaSecondary: '瀏覽核心產品',
      ctaBtn: '立即諮詢',
      trust1: '模組化可下載 · 支援客服同席協作安裝',
      trust2: '資產部署至企業自有雲端環境',
      trust3: '客製化報價 · 線上提交即時獲取',
    };
  }

  if (zh) {
    return {
      exploreAll: '查看全部产品',
      readMore: '了解详情',
      downloadCta: '去下载安装 / 询盘',
      solveLabel: '解决方案',
      compareDim: '关键对比维度',
      compareColOld: '常见传统模式',
      compareColNew: '本系统方案',
      painEyebrow: '痛点与突围',
      productsEyebrow: '核心产品套件',
      compareEyebrow: '方案对比',
      stepsEyebrow: '实施路径',
      testimonialsEyebrow: '客户真实反馈',
      faqEyebrow: '常见问题',
      heroCtaPrimary: '免费获取方案',
      heroCtaSecondary: '浏览核心产品',
      ctaBtn: '立即咨询',
      trust1: '模块化可下载 · 支持客服同席协作安装',
      trust2: '资产部署至企业自有云账户',
      trust3: '定制化报价 · 在线提交即时获取',
    };
  }

  if (ja) {
    return {
      exploreAll: 'すべての製品',
      readMore: '詳しく見る',
      downloadCta: 'ダウンロード / 相談',
      solveLabel: 'ソリューション',
      compareDim: '比較項目',
      compareColOld: '従来方式',
      compareColNew: '本システム',
      painEyebrow: '課題と解決策',
      productsEyebrow: '主要製品ラインナップ',
      compareEyebrow: '比較分析',
      stepsEyebrow: '導入ステップ',
      testimonialsEyebrow: 'お客様の声',
      faqEyebrow: 'よくある質問',
      heroCtaPrimary: '無料相談 / デモ予約',
      heroCtaSecondary: '製品一覧',
      ctaBtn: 'お問い合わせ',
      trust1: 'ダウンロード導入可能 · 同席導入サポート',
      trust2: '自社クラウドアカウントへ配備',
      trust3: 'お問い合わせ後に個別お見積り',
    };
  }

  return {
    exploreAll: 'View All Products',
    readMore: 'Learn More',
    downloadCta: 'Download / Inquire',
    solveLabel: 'Solution',
    compareDim: 'Dimension',
    compareColOld: 'Traditional Way',
    compareColNew: 'Our Stack',
    painEyebrow: 'Frictions & Solutions',
    productsEyebrow: 'Core Products',
    compareEyebrow: 'Feature Comparison',
    stepsEyebrow: 'How It Works',
    testimonialsEyebrow: 'Customer Reviews',
    faqEyebrow: 'Frequently Asked Questions',
    heroCtaPrimary: 'Get Free Plan / Book Demo',
    heroCtaSecondary: 'Explore Products',
    ctaBtn: 'Inquire Now',
    trust1: 'Downloadable Stack · Live Guided Onboarding',
    trust2: 'Deployed on Your Cloud Account',
    trust3: 'Tailored Pricing via Direct Inquiry',
  };
}
