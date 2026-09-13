import { loadPageChrome } from '../chrome/load-chrome';
import { getArticle } from '../../modules/article';
import { toErrorMessage } from '../../modules/cms';

export async function loadArticleDetailPage(options: {
  locale?: string;
  pathname: string;
  id: string;
}) {
  const chrome = await loadPageChrome({ locale: options.locale, pathname: options.pathname });
  if (!chrome.localeValid || !chrome.site.modules.articles) {
    return { ...chrome, enabled: false as const, article: null, error: undefined as string | undefined };
  }
  try {
    const article = await getArticle(options.id, { locale: chrome.locale });
    return { ...chrome, enabled: true as const, article, error: undefined as string | undefined };
  } catch (error) {
    return { ...chrome, enabled: true as const, article: null, error: toErrorMessage(error) };
  }
}
