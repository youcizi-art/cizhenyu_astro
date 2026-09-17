import { loadPageChrome } from '../chrome/load-chrome';
import { enrichCaseStudyDetail, getCaseStudy } from '../../modules/case-study';
import { toErrorMessage } from '../../modules/cms';

export async function loadCaseStudyDetailPage(options: {
  locale?: string;
  pathname: string;
  id: string;
}) {
  const chrome = await loadPageChrome({ locale: options.locale, pathname: options.pathname });
  if (!chrome.localeValid || !chrome.site.modules.caseStudies) {
    return { ...chrome, enabled: false as const, item: null, error: undefined as string | undefined };
  }
  try {
    let item = await getCaseStudy(options.id, { locale: chrome.locale });
    if (item) item = await enrichCaseStudyDetail(item, chrome.locale);
    return { ...chrome, enabled: true as const, item, error: undefined as string | undefined };
  } catch (error) {
    return { ...chrome, enabled: true as const, item: null, error: toErrorMessage(error) };
  }
}
