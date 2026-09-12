import { loadPageChrome } from '../chrome/load-chrome';
import { getCaseStudy } from '../../modules/case-study';

export async function loadCaseStudyDetailPage(options: { locale?: string; id: string }) {
  const chrome = await loadPageChrome(options.locale);
  if (!chrome.site.modules.caseStudies) {
    return { ...chrome, enabled: false as const, item: null };
  }
  const item = await getCaseStudy(options.id, { locale: chrome.locale });
  return { ...chrome, enabled: true as const, item };
}
