import { loadPageChrome } from '../chrome/load-chrome';
import { getPageBySlug } from '../../modules/page';
import { toErrorMessage } from '../../modules/cms';
import { t } from '../../modules/i18n';

export async function loadAboutPage(options: { locale?: string; pathname: string }) {
  const chrome = await loadPageChrome({
    locale: options.locale,
    pathname: options.pathname,
  });
  const labels = { about: t(chrome.locale, 'about') };
  if (!chrome.localeValid || !chrome.site.modules.about) {
    return {
      ...chrome,
      enabled: false as const,
      page: null,
      error: undefined as string | undefined,
      labels,
    };
  }

  try {
    const page = await getPageBySlug('about', { locale: chrome.locale });
    return {
      ...chrome,
      enabled: true as const,
      page,
      error: undefined as string | undefined,
      labels,
    };
  } catch (error) {
    return {
      ...chrome,
      enabled: true as const,
      page: null,
      error: toErrorMessage(error, t(chrome.locale, 'loadFailed')),
      labels,
    };
  }
}

export async function loadContactPage(options: { locale?: string; pathname: string }) {
  const chrome = await loadPageChrome({
    locale: options.locale,
    pathname: options.pathname,
  });
  const labels = { contact: t(chrome.locale, 'contact') };
  if (!chrome.localeValid || !chrome.site.modules.contact) {
    return {
      ...chrome,
      enabled: false as const,
      page: null,
      error: undefined as string | undefined,
      labels,
    };
  }

  try {
    const page = await getPageBySlug('contact', { locale: chrome.locale });
    return {
      ...chrome,
      enabled: true as const,
      page,
      error: undefined as string | undefined,
      labels,
    };
  } catch (error) {
    return {
      ...chrome,
      enabled: true as const,
      page: null,
      error: toErrorMessage(error, t(chrome.locale, 'loadFailed')),
      labels,
    };
  }
}
