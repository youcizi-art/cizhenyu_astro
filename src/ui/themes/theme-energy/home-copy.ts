/**
 * 储能系统与光伏光储充 (Solar & Energy Storage) - 多语言文案字典
 */
export function theme_energyHomeLabels(locale: string) {
  const zh = locale.startsWith('zh');
  const ja = locale === 'ja';
  return {
    products: zh ? '高效光储逆变器与电池系统' : ja ? '高効率PVインバータ・蓄電システム' : 'Smart PV Inverters & Energy Storage Systems',
    solutions: zh ? '全场景智慧能源解决方案' : ja ? 'スマートエネルギーソリューション' : 'Smart Energy & Storage Solutions',
    articles: zh ? '前沿技术与全球并网法规' : ja ? '系統連系技術・業界ニュース' : 'Grid-Tie Insights & Industry News',
    about: zh ? '智慧制造中心与全球服务网络' : ja ? 'スマート生産拠点・グローバルサポート' : 'Smart Manufacturing & Global Service',
    cases: zh ? '全球落地光伏与储能电站案例' : ja ? '世界各地の導入実績' : 'Global Commercial & Residential Case Studies',
    contact: zh ? '获取定制化光储配置与B2B采购报价' : ja ? 'ソリューション提案・お見積もり依頼' : 'Request Storage Architecture & Quotation',
    readMore: zh ? '探索方案' : ja ? '詳細を見る' : 'Explore Solution',
  };
}
