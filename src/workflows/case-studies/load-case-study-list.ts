import { loadPageChrome } from '../chrome/load-chrome';
import { listCaseStudies } from '../../modules/case-study';

export async function loadCaseStudyListPage(options: { locale?: string; page?: number }) {
  const chrome = await loadPageChrome(options.locale);
  if (!chrome.site.modules.caseStudies) {
    return { ...chrome, enabled: false as const, items: [], pages: { total: 0, page: 1, pageSize: 12, totalPages: 0 } };
  }
  const page = Math.max(1, Number(options.page || 1) || 1);
  const result = await listCaseStudies({ locale: chrome.locale, page, pageSize: 12 });
  return { ...chrome, enabled: true as const, items: result.items, pages: result.pages };
}
