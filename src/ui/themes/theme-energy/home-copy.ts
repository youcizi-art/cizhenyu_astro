/**
 * 储能系统与光伏光储充 (Solar & Energy Storage) - 多语言文案字典
 */
export function getHomeLabels(locale: string) {
  const zh = locale.startsWith('zh');
  const ja = locale === 'ja';
  return {
    productsEyebrow: zh ? '核心产品矩阵' : ja ? 'コア製品群' : 'OUR PRODUCTS',
    products: zh ? '全栈能源与设备解决方案' : ja ? '総合エネルギーソリューション' : 'Complete Energy Solutions',
    productsSub: zh
      ? '从高效光伏逆变器到智能储能系统，满足户用、工商业及大型地面电站全场景需求。'
      : 'From solar inverters to energy storage systems, we offer a full range of products to meet diverse needs.',
    viewAllProducts: zh ? '查看全部产品' : ja ? 'すべての製品を見る' : 'View All Products',

    trust1Title: zh ? '清洁与可再生' : 'Clean & Renewable',
    trust1Desc: zh ? '驭自然之力，创绿色明天' : 'Harnessing nature power for a greener tomorrow.',
    trust2Title: zh ? '卓越稳定性能' : 'Reliable Performance',
    trust2Desc: zh ? '工业级稳健设计，经久耐用' : 'Engineered for stability, built for the long term.',
    trust3Title: zh ? '智慧互联互通' : 'Smart & Connected',
    trust3Desc: zh ? '云端精细化能效协同管理' : 'Intelligent management for higher efficiency.',
    trust4Title: zh ? '全球化交付网络' : 'Global Presence',
    trust4Desc: zh ? '服务遍及全球 100+ 国家与地区' : 'Serving customers in 100+ countries and regions.',

    aboutEyebrow: zh ? '关于企业' : 'ABOUT US',
    aboutTitle: zh ? '驱动绿色可持续未来' : 'Powering a Sustainable Future',
    aboutDesc: zh
      ? '作为全球领先的清洁能源科技企业，我们专注于提供安全、可靠、高效的光储充智能解决方案。我们坚信，清洁能源不仅是一种选择，更是一份对未来的责任。'
      : 'A global clean energy technology leader committed to providing innovative and reliable solar and energy storage solutions.',
    learnMore: zh ? '了解更多' : 'Learn More',

    stat1Val: '10+',
    stat1Lab: zh ? '年行业深耕经验' : 'Years of Experience',
    stat2Val: '100+',
    stat2Lab: zh ? '覆盖国家与地区' : 'Countries & Regions',
    stat3Val: '5000+',
    stat3Lab: zh ? '全球核心合作伙伴' : 'Global Partners',
    stat4Val: '1M+',
    stat4Lab: zh ? '清洁能源落地项目' : 'Clean Energy Projects',

    solutionsEyebrow: zh ? '场景化方案' : 'SOLUTIONS',
    solutions: zh ? '满足多元应用场景' : 'For Every Application',
    solutionsSub: zh
      ? '针对不同行业与用电特征提供量身定制的清洁能源方案，助力客户实现能源独立与低碳转型。'
      : 'We provide customized energy solutions for different industries and scenarios, helping achieve energy independence.',
    viewAllSolutions: zh ? '查看全部方案' : 'View All Solutions',

    newsEyebrow: zh ? '新闻动态' : 'LATEST NEWS',
    news: zh ? '行业洞见与企业动态' : 'Insights & Updates',
    newsSub: zh
      ? '紧跟可再生能源行业前沿资讯、技术演进趋势与重大战略突破。'
      : 'Stay informed about our latest products, technologies, and industry trends in the renewable energy sector.',
    viewAllNews: zh ? '查看全部资讯' : 'View All News',

    subscribeTitle: zh ? '订阅行业资讯与最新白皮书' : 'Subscribe to Our Newsletter',
    subscribeDesc: zh ? '获取最新的产品发布动态、技术方案与行业报告。' : 'Get the latest updates on our products and solutions.',
    subscribeBtn: zh ? '立即订阅' : 'Subscribe',
  };
}
