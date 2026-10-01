/**
 * Turmill 首页区块标题等 UI 文案（非内容数据）。
 * 展示内容必须来自 CMS；禁止在此放置产品/案例/图集等兜底假数据。
 */

export function turmillHomeLabels(locale: string) {
  const zh = locale.startsWith('zh');
  const ja = locale === 'ja';
  return {
    productsEyebrow: zh ? '宽敞 · 高效 · 可靠' : ja ? '広々・効率・信頼' : 'Spacious, Efficient, Reliable',
    products: zh ? '探索智能宠物方案' : ja ? 'スマートペット製品' : 'Explore Smart Litter Solutions for Pets',
    productsSub: zh
      ? '自动清洁、省心省力，专为宠物舒适设计'
      : ja
        ? '自動清掃で快適なペットケアを'
        : 'Discover automated, hassle-free litter boxes designed for convenience and pet comfort.',
    articles: zh ? '智能养宠洞察' : ja ? 'スマートペット生活' : 'Insights on Smart Pet Living',
    about: zh ? '关于我们' : ja ? '会社概要' : 'About',
    aboutTitle: zh ? '专注宠物护理卓越' : ja ? 'ペットケアへのこだわり' : 'Committed to Pet Care Excellence',
    cases: zh ? '真实用户故事' : ja ? 'ペットの幸せストーリー' : 'Real Stories of Happy Pets',
    casesSub: zh
      ? '看看智能方案如何改善宠物与主人的生活'
      : 'See how our smart litter boxes improve lives for pets and owners alike.',
    advantages: zh ? '用创新简化养宠' : ja ? 'イノベーションでペットケアを簡単に' : 'Simplifying Pet Care with Innovation',
    advantagesSub: zh
      ? '我们打造智能自动化方案，让养宠更轻松愉快'
      : 'We create smart, automated solutions to make pet ownership easier and more enjoyable.',
    category: zh ? '智能猫砂解决方案' : ja ? 'スマートトイレソリューション' : 'Smart Pet Litter Solutions',
    categorySub: zh
      ? '简单清洁、舒适体验，来自创新自动化'
      : "Turmill's smart litter boxes offer simple cleaning and comfort with innovative automation.",
    testimonials: zh ? '满意养宠人的声音' : ja ? '満足した飼い主の声' : 'Voices of Satisfied Pet Owners',
    testimonialsSub: zh
      ? '听听客户如何评价我们的智能猫砂盆'
      : 'Hear from customers who love our smart litter boxes for their pets.',
    testimonialsEyebrow: zh ? '真实 · 正面 · 启发' : 'Authentic, Positive, Inspiring',
    factory: zh ? '高科技研发制造中心' : ja ? 'ハイテク研究開発・製造拠点' : 'High-Tech R&D & Manufacturing Center',
    factoryEyebrow: zh ? '制造实力' : 'Manufacturing Power',
    factoryArea: '50,000 sqm',
    readMore: zh ? '了解更多' : ja ? '詳しく見る' : 'Learn More',
    aboutCta: zh ? '立即预约' : ja ? '予約する' : 'Get Appointment',
    exploreAll: zh ? '查看全部' : ja ? 'すべて見る' : 'Explore All',
    heroTips: zh ? '让宠物更快乐' : ja ? 'ペットをもっと幸せに' : 'MAKE YOUR PETS HAPPY',
  };
}
