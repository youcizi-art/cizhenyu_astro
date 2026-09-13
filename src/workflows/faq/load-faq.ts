import { loadPageChrome } from '../chrome/load-chrome';
import { listFaqs } from '../../modules/faq';
import { toErrorMessage } from '../../modules/cms';

export async function loadFaqPage(options: { locale?: string; pathname: string }) {
  const chrome = await loadPageChrome({ locale: options.locale, pathname: options.pathname });
  if (!chrome.localeValid || !chrome.site.modules.faq) {
    return { ...chrome, enabled: false as const, items: [], error: undefined as string | undefined };
  }
  try {
    const result = await listFaqs({ locale: chrome.locale, pageSize: 100 });
    return { ...chrome, enabled: true as const, items: result.items, error: undefined as string | undefined };
  } catch (error) {
    return { ...chrome, enabled: true as const, items: [], error: toErrorMessage(error) };
  }
}
