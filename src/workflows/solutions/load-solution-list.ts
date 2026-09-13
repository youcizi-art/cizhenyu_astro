import { loadPageChrome } from '../chrome/load-chrome';
import { listSolutions } from '../../modules/industry';
import { toErrorMessage } from '../../modules/cms';

export async function loadSolutionListPage(options: {
  locale?: string;
  pathname: string;
  page?: number;
}) {
  const chrome = await loadPageChrome({ locale: options.locale, pathname: options.pathname });
  if (!chrome.localeValid || !chrome.site.modules.solutions) {
    return { ...chrome, enabled: false as const, items: [], pages: { total: 0, page: 1, pageSize: 12, totalPages: 0 }, error: undefined as string | undefined };
  }
  const page = Math.max(1, Number(options.page || 1) || 1);
  try {
    const result = await listSolutions({ locale: chrome.locale, page, pageSize: 12 });
    return { ...chrome, enabled: true as const, items: result.items, pages: result.pages, error: undefined as string | undefined };
  } catch (error) {
    return { ...chrome, enabled: true as const, items: [], pages: { total: 0, page, pageSize: 12, totalPages: 0 }, error: toErrorMessage(error) };
  }
}
