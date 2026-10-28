/**
 * 重型机械与工程液压 (Heavy Machinery & Hydraulics) - 多语言文案字典
 */
export function theme_machineryHomeLabels(locale: string) {
  const zh = locale.startsWith('zh');
  const ja = locale === 'ja';
  return {
    products: zh ? '核心产品与设备' : ja ? '主要製品・設備' : 'Featured Products & Equipment',
    articles: zh ? '技术文献与行业指南' : ja ? '技術文献・業界情報' : 'Technical Insights & Guides',
    about: zh ? '制造实力与工厂资质' : ja ? '製造体制・工場認証' : 'Manufacturing & Capabilities',
    cases: zh ? '全球工程与合作案例' : ja ? 'グローバル導入事例' : 'Global Project Showcase',
    contact: zh ? '即刻索取技术方案与报价' : ja ? '仕様・お見積もりのご相談' : 'Request Specifications & Quote',
    readMore: zh ? '了解详情' : ja ? '詳しく見る' : 'Learn More',
  };
}
