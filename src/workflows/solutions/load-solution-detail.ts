import { loadPageChrome } from '../chrome/load-chrome';
import { getSolution } from '../../modules/industry';

export async function loadSolutionDetailPage(options: { locale?: string; id: string }) {
  const chrome = await loadPageChrome(options.locale);
  if (!chrome.site.modules.solutions) {
    return { ...chrome, enabled: false as const, item: null };
  }
  const item = await getSolution(options.id, { locale: chrome.locale });
  return { ...chrome, enabled: true as const, item };
}
