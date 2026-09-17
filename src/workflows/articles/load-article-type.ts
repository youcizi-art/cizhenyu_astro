import { loadPageChrome } from '../chrome/load-chrome';
import {
  articleContentTypeLabel,
  isArticleContentType,
  listArticles,
  type ArticleContentType,
} from '../../modules/article';
import { toErrorMessage } from '../../modules/cms';
import { t } from '../../modules/i18n';

export async function loadArticleTypePage(options: {
  locale?: string;
  pathname: string;
  type: string;
  page?: number;
}) {
  const chrome = await loadPageChrome({
    locale: options.locale,
    pathname: options.pathname,
  });
  if (!chrome.localeValid || !chrome.site.modules.articles) {
    return {
      ...chrome,
      enabled: false as const,
      contentType: null as ArticleContentType | null,
      typeLabel: '',
      items: [],
      pages: { total: 0, page: 1, pageSize: 12, totalPages: 0 },
      error: undefined as string | undefined,
    };
  }

  const page = Math.max(1, Number(options.page || 1) || 1);
  const type = String(options.type || '').trim();
  if (!isArticleContentType(type)) {
    return {
      ...chrome,
      enabled: true as const,
      contentType: null as ArticleContentType | null,
      typeLabel: '',
      items: [],
      pages: { total: 0, page, pageSize: 12, totalPages: 0 },
      error: undefined as string | undefined,
    };
  }

  try {
    const result = await listArticles({
      locale: chrome.locale,
      page,
      pageSize: 12,
      content_type: type,
      status: 'published',
    });
    return {
      ...chrome,
      enabled: true as const,
      contentType: type,
      typeLabel: articleContentTypeLabel(type, chrome.locale),
      items: result.items,
      pages: result.pages,
      error: undefined as string | undefined,
    };
  } catch (error) {
    return {
      ...chrome,
      enabled: true as const,
      contentType: type,
      typeLabel: articleContentTypeLabel(type, chrome.locale),
      items: [],
      pages: { total: 0, page, pageSize: 12, totalPages: 0 },
      error: toErrorMessage(error, t(chrome.locale, 'loadFailed')),
    };
  }
}
