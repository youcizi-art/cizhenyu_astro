export type UiLabelKey =
  | 'home'
  | 'products'
  | 'solutions'
  | 'caseStudies'
  | 'articles'
  | 'resources'
  | 'faq'
  | 'about'
  | 'contact'
  | 'language'
  | 'emptyProducts'
  | 'loadFailed'
  | 'notFound'
  | 'backHome'
  | 'quickLinks'
  | 'testimonials'
  | 'latestNews'
  | 'viewAllNews'
  | 'learnMore'
  | 'exploreServiceFlow'
  | 'inquiry'
  | 'inquiryHint'
  | 'sendEmail';

const EN: Record<UiLabelKey, string> = {
  home: 'Home',
  products: 'Products',
  solutions: 'Solutions',
  caseStudies: 'Case Studies',
  articles: 'News',
  resources: 'Download',
  faq: 'Help',
  about: 'About',
  contact: 'Contact',
  language: 'Language',
  emptyProducts: 'No products yet.',
  loadFailed: 'Failed to load.',
  notFound: 'Page not found',
  backHome: 'Back to home',
  quickLinks: 'Quick Links',
  testimonials: 'Client Reviews',
  latestNews: 'Latest Updates',
  viewAllNews: 'View All News',
  learnMore: 'Learn More',
  exploreServiceFlow: 'Explore Service Workflow',
  inquiry: 'Submit Inquiry',
  inquiryHint: 'Click to open the online smart consultant for instant inquiry, or send us an email directly.',
  sendEmail: 'Send Email',
};

const ZH_CN: Record<UiLabelKey, string> = {
  home: '首页',
  products: '产品',
  solutions: '解决方案',
  caseStudies: '案例',
  articles: '动态',
  resources: '下载',
  faq: '帮助',
  about: '关于',
  contact: '联系',
  language: '语言',
  emptyProducts: '暂无产品。',
  loadFailed: '加载失败。',
  notFound: '页面不存在',
  backHome: '返回首页',
  quickLinks: '快速链接',
  testimonials: '用户反馈',
  latestNews: '行业动态',
  viewAllNews: '查看全部动态',
  learnMore: '了解详情',
  exploreServiceFlow: '了解服务流程',
  inquiry: '提交询盘',
  inquiryHint: '点击即可打开在线智能咨询窗口进行即时沟通，也可直接向我们发送邮件。',
  sendEmail: '发送邮件',
};

const ZH_TW: Record<UiLabelKey, string> = {
  home: '首頁',
  products: '產品',
  solutions: '解決方案',
  caseStudies: '案例',
  articles: '動態',
  resources: '下載',
  faq: '幫助',
  about: '關於',
  contact: '聯繫',
  language: '語言',
  emptyProducts: '暫無產品。',
  loadFailed: '載入失敗。',
  notFound: '頁面不存在',
  backHome: '返回首頁',
  quickLinks: '快速連結',
  testimonials: '用戶反饋',
  latestNews: '行業動態',
  viewAllNews: '查看全部動態',
  learnMore: '了解詳情',
  exploreServiceFlow: '了解服務流程',
  inquiry: '提交詢盤',
  inquiryHint: '點擊即可打開在線智能諮詢窗口進行即時溝通，也可直接向我們發送郵件。',
  sendEmail: '發送郵件',
};

const JA: Record<UiLabelKey, string> = {
  home: 'ホーム',
  products: '製品',
  solutions: 'ソリューション',
  caseStudies: '事例',
  articles: 'ニュース',
  resources: 'ダウンロード',
  faq: 'ヘルプ',
  about: '会社概要',
  contact: 'お問い合わせ',
  language: '言語',
  emptyProducts: '製品がまだありません。',
  loadFailed: '読み込みに失敗しました。',
  notFound: 'ページが見つかりません',
  backHome: 'ホームへ戻る',
  quickLinks: 'クイックリンク',
  testimonials: 'お客様の声',
  latestNews: '最新の動向',
  viewAllNews: 'すべての動向を見る',
  learnMore: '詳細を見る',
  exploreServiceFlow: 'サービスの流れを見る',
  inquiry: 'お問い合わせを送信',
  inquiryHint: 'クリックしてオンラインチャットで相談するか、直接メールを送信してください。',
  sendEmail: 'メールを送信',
};

const ES: Record<UiLabelKey, string> = {
  home: 'Inicio',
  products: 'Productos',
  solutions: 'Soluciones',
  caseStudies: 'Casos',
  articles: 'Noticias',
  resources: 'Descargas',
  faq: 'Ayuda',
  about: 'Nosotros',
  contact: 'Contacto',
  language: 'Idioma',
  emptyProducts: 'Aún no hay productos.',
  loadFailed: 'Error al cargar.',
  notFound: 'Página no encontrada',
  backHome: 'Volver al inicio',
  quickLinks: 'Enlaces rápidos',
  testimonials: 'Opiniones de clientes',
  latestNews: 'Últimas novedades',
  viewAllNews: 'Ver todas las noticias',
  learnMore: 'Más información',
  exploreServiceFlow: 'Explorar el flujo de servicio',
  inquiry: 'Enviar consulta',
  inquiryHint: 'Haga clic para abrir el consultor en línea, o envíenos un correo directamente.',
  sendEmail: 'Enviar correo',
};

const PT: Record<UiLabelKey, string> = {
  home: 'Início',
  products: 'Produtos',
  solutions: 'Soluções',
  caseStudies: 'Casos',
  articles: 'Notícias',
  resources: 'Downloads',
  faq: 'Ajuda',
  about: 'Sobre',
  contact: 'Contato',
  language: 'Idioma',
  emptyProducts: 'Ainda não há produtos.',
  loadFailed: 'Falha ao carregar.',
  notFound: 'Página não encontrada',
  backHome: 'Voltar ao início',
  quickLinks: 'Links rápidos',
  testimonials: 'Depoimentos',
  latestNews: 'Últimas novidades',
  viewAllNews: 'Ver todas as notícias',
  learnMore: 'Saiba mais',
  exploreServiceFlow: 'Explorar o fluxo de serviço',
  inquiry: 'Enviar consulta',
  inquiryHint: 'Clique para abrir o consultor online, ou envie-nos um e-mail diretamente.',
  sendEmail: 'Enviar e-mail',
};

const AR: Record<UiLabelKey, string> = {
  home: 'الرئيسية',
  products: 'المنتجات',
  solutions: 'الحلول',
  caseStudies: 'دراسات الحالة',
  articles: 'الأخبار',
  resources: 'التنزيلات',
  faq: 'المساعدة',
  about: 'من نحن',
  contact: 'اتصل بنا',
  language: 'اللغة',
  emptyProducts: 'لا توجد منتجات بعد.',
  loadFailed: 'فشل التحميل.',
  notFound: 'الصفحة غير موجودة',
  backHome: 'العودة إلى الرئيسية',
  quickLinks: 'روابط سريعة',
  testimonials: 'آراء العملاء',
  latestNews: 'آخر التحديثات',
  viewAllNews: 'عرض كل الأخبار',
  learnMore: 'اعرف المزيد',
  exploreServiceFlow: 'استكشف مسار الخدمة',
  inquiry: 'إرسال استفسار',
  inquiryHint: 'انقر لفتح المستشار الذكي عبر الإنترنت، أو راسلنا بالبريد مباشرة.',
  sendEmail: 'إرسال بريد',
};

const DICTS: Record<string, Record<UiLabelKey, string>> = {
  en: EN,
  'en-US': EN,
  'zh-CN': ZH_CN,
  zh: ZH_CN,
  'zh-TW': ZH_TW,
  ja: JA,
  es: ES,
  pt: PT,
  ar: AR,
};

export function t(locale: string, key: UiLabelKey): string {
  const dict = DICTS[locale] || DICTS[locale.split('-')[0]] || EN;
  return dict[key] || EN[key] || key;
}
