import { loadPageChrome } from '../chrome/load-chrome';
import { getSolution } from '../../modules/industry';
import { toErrorMessage } from '../../modules/cms';

export async function loadSolutionDetailPage(options: {
  locale?: string;
  pathname: string;
  id: string;
}) {
  const chrome = await loadPageChrome({ locale: options.locale, pathname: options.pathname });
  if (!chrome.localeValid || !chrome.site.modules.solutions) {
    return { ...chrome, enabled: false as const, item: null, error: undefined as string | undefined };
  }
  try {
    const item = await getSolution(options.id, { locale: chrome.locale });
    return { ...chrome, enabled: true as const, item, error: undefined as string | undefined };
  } catch (error) {
    return { ...chrome, enabled: true as const, item: null, error: toErrorMessage(error) };
  }
}
