import { loadPageChrome } from '../chrome/load-chrome';
import { listFaqs } from '../../modules/faq';

export async function loadFaqPage(options: { locale?: string }) {
  const chrome = await loadPageChrome(options.locale);
  if (!chrome.site.modules.faq) {
    return { ...chrome, enabled: false as const, items: [] };
  }
  const result = await listFaqs({ locale: chrome.locale, pageSize: 100 });
  return { ...chrome, enabled: true as const, items: result.items };
}
