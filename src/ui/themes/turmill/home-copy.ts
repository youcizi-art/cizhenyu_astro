/**
 * Turmill 首页营销文案与缺省内容 —— 仅本主题使用。
 * 通用 load-home 不得依赖此文件。
 */

const HERO_IMAGE =
  'https://admin.turmill.com/storage/default/20250325/banner-cat0bee60bee6c3f3de7a6c807012bb1c7038d1ba0dddc5e.png';

export const turmillHeroFallbackImage = HERO_IMAGE;

export const turmillHeroThumbs = [
  {
    src: 'https://admin.turmill.com/storage/default/20250325/product-free2c4c46f8e0252a4678b176c7a0cbf97683c8df12521.png',
    free: true,
    alt: 'Accessory',
  },
  {
    src: 'https://admin.turmill.com/storage/default/20250325/product-free1424224380469d72c02052cb8c5ab561aa6876fcee9.png',
    free: true,
    alt: 'Accessory',
  },
  {
    src: 'https://admin.turmill.com/storage/default/20250325/product1d2184ccd2184cc18133efcf2f8778942b3b6518e51106a9.png',
    free: false,
    alt: 'Smart litter box',
  },
];

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

export function turmillAdvantageFallback() {
  return [
    {
      title: 'Designing Smart Pet Solutions',
      description: 'We craft innovative products for easy pet care and cleaner homes.',
    },
    {
      title: 'Enhancing Pet Owner Convenience',
      description: 'Automation simplifies cleanup for busy owners without compromising safety.',
    },
    {
      title: 'Prioritizing Pet Comfort',
      description: 'Spacious, quiet designs help pets feel at ease every day.',
    },
  ];
}

export function turmillTestimonialFallback() {
  return [
    {
      name: 'Sarah Jenkins',
      role: 'Cat Owner & Breeder',
      quote:
        'The smart litter box completely transformed our multi-cat household. Zero odor and cleanup takes minutes a week.',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      meta: 'Owner of 3 British Shorthairs',
      rating: 5,
    },
    {
      name: 'David Miller',
      role: 'Veterinary Technician',
      quote:
        'Safety is my top priority. Infrared anti-pinch sensors give me total peace of mind for my pets.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      meta: 'Owner of 2 Rescue Cats',
      rating: 5,
    },
    {
      name: 'Elena Rostova',
      role: 'Pet Care Blogger',
      quote:
        'The design is sleek enough for modern homes, and wholesale support for custom orders was excellent.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      meta: 'Owner of Ragdoll & Persian',
      rating: 5,
    },
  ];
}

export function turmillFactoryFallback() {
  return [
    {
      title: 'Automated Assembly Line',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Smart Sensor Testing Lab',
      imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'Wholesale Warehouse',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80',
    },
    {
      title: 'R&D Design Workshop',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    },
  ];
}

export function turmillCompanyStats(locale: string) {
  const zh = locale.startsWith('zh');
  return [
    { label: zh ? '成立' : 'Founded', value: '2018' },
    { label: zh ? '员工' : 'Employees', value: '200+' },
    { label: zh ? '厂房' : 'Factory', value: '50,000 sqm' },
    { label: zh ? '出口' : 'Export', value: '40+ countries' },
  ];
}

/** 首页品类条缺省（CMS 无 solutions 时） */
export function turmillCategoryFallback(locale: string, productsHref: string) {
  const zh = locale.startsWith('zh');
  return [
    {
      id: 'tm-cat-1',
      slug: 'auto-litter',
      title: zh ? '一键自动清洁猫砂盆' : 'One-Click Auto-Cleaning Litter Box',
      href: productsHref,
      summary: zh ? '全自动清扫，保持家居洁净' : 'Automated cleaning for a cleaner home',
      coverUrl:
        'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'tm-cat-2',
      slug: 'pet-robot',
      title: zh ? '智能宠物伴侣机器人' : 'Smart Pet Companion Robot',
      href: productsHref,
      summary: zh ? '互动陪伴与智能监测' : 'Interactive care and smart monitoring',
      coverUrl:
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'tm-cat-3',
      slug: 'oem-wholesale',
      title: zh ? 'OEM / 批发定制' : 'OEM & Wholesale Custom',
      href: productsHref,
      summary: zh ? '支持品牌定制与批量供货' : 'Brand customization and bulk supply',
      coverUrl:
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=600&q=80',
    },
  ];
}
