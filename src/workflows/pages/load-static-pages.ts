import { loadPageChrome } from '../chrome/load-chrome';
import { getPageBySlug } from '../../modules/page';

export async function loadAboutPage(options: { locale?: string }) {
  const chrome = await loadPageChrome(options.locale);
  if (!chrome.site.modules.about) {
    return { ...chrome, enabled: false as const, page: null };
  }
  const page = await getPageBySlug('about', { locale: chrome.locale });
  return { ...chrome, enabled: true as const, page };
}

export async function loadContactPage(options: { locale?: string }) {
  const chrome = await loadPageChrome(options.locale);
  if (!chrome.site.modules.contact) {
    return { ...chrome, enabled: false as const, page: null };
  }
  const page = await getPageBySlug('contact', { locale: chrome.locale });
  return { ...chrome, enabled: true as const, page };
}
