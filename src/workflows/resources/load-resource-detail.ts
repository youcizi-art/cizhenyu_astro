import { loadPageChrome } from '../chrome/load-chrome';
import { getResource } from '../../modules/resource';

export async function loadResourceDetailPage(options: { locale?: string; id: string }) {
  const chrome = await loadPageChrome(options.locale);
  if (!chrome.site.modules.resources) {
    return { ...chrome, enabled: false as const, item: null };
  }
  const item = await getResource(options.id, { locale: chrome.locale });
  return { ...chrome, enabled: true as const, item };
}
