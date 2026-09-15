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
  | 'backHome';

const EN: Record<UiLabelKey, string> = {
  home: 'Home',
  products: 'Products',
  solutions: 'Solutions',
  caseStudies: 'Case Studies',
  articles: 'Articles',
  resources: 'Resources',
  faq: 'FAQ',
  about: 'About',
  contact: 'Contact',
  language: 'Language',
  emptyProducts: 'No products yet.',
  loadFailed: 'Failed to load.',
  notFound: 'Page not found',
  backHome: 'Back to home',
};

const ZH_CN: Record<UiLabelKey, string> = {
  home: '首页',
  products: '产品',
  solutions: '解决方案',
  caseStudies: '案例',
  articles: '文章',
  resources: '资料',
  faq: '常见问题',
  about: '关于我们',
  contact: '联系我们',
  language: '语言',
  emptyProducts: '暂无产品。',
  loadFailed: '加载失败。',
  notFound: '页面不存在',
  backHome: '返回首页',
};

const ZH_TW: Record<UiLabelKey, string> = {
  home: '首頁',
  products: '產品',
  solutions: '解決方案',
  caseStudies: '案例',
  articles: '文章',
  resources: '資料',
  faq: '常見問題',
  about: '關於我們',
  contact: '聯繫我們',
  language: '語言',
  emptyProducts: '暫無產品。',
  loadFailed: '載入失敗。',
  notFound: '頁面不存在',
  backHome: '返回首頁',
};

const JA: Record<UiLabelKey, string> = {
  home: 'ホーム',
  products: '製品',
  solutions: 'ソリューション',
  caseStudies: '事例',
  articles: '記事',
  resources: '資料',
  faq: 'FAQ',
  about: '会社概要',
  contact: 'お問い合わせ',
  language: '言語',
  emptyProducts: '製品がまだありません。',
  loadFailed: '読み込みに失敗しました。',
  notFound: 'ページが見つかりません',
  backHome: 'ホームへ戻る',
};

const DICTS: Record<string, Record<UiLabelKey, string>> = {
  en: EN,
  'en-US': EN,
  'zh-CN': ZH_CN,
  zh: ZH_CN,
  'zh-TW': ZH_TW,
  ja: JA,
};

export function t(locale: string, key: UiLabelKey): string {
  const dict = DICTS[locale] || DICTS[locale.split('-')[0]] || EN;
  return dict[key] || EN[key] || key;
}
