import { loadPageChrome } from '../chrome/load-chrome';
import { getArticle } from '../../modules/article';

export async function loadArticleDetailPage(options: { locale?: string; id: string }) {
  const chrome = await loadPageChrome(options.locale);
  if (!chrome.site.modules.articles) {
    return { ...chrome, enabled: false as const, article: null };
  }
  const article = await getArticle(options.id, { locale: chrome.locale });
  return { ...chrome, enabled: true as const, article };
}
