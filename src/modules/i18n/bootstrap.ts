import type { SiteManifest } from '../site';
import { loadLanguages } from './languages';
import { isKnownLocale, resolveLocaleFromPath } from './path';
import { rememberDefaultLocale } from './remember-default';
import type { I18nBootstrap } from './types';

/**
 * 页面级 i18n 启动：CMS 语种 + 路径解析。
 * 默认语种以 CMS isDefault 为准；公开 URL 默认语种无 /语种/ 前缀。
 */
export async function bootstrapI18n(options: {
  pathname: string;
  paramLocale?: string;
  manifest: SiteManifest;
}): Promise<I18nBootstrap> {
  const { languages, warning } = await loadLanguages(options.manifest);
  const fallback = languages.find((item) => item.isDefault)?.code
    || options.manifest.defaultLocale
    || 'en';
  rememberDefaultLocale(fallback);

  const param = String(options.paramLocale || '').trim();
  if (param) {
    const known = isKnownLocale(param, languages);
    return {
      languages,
      currentLocale: known ? param : fallback,
      isDefault: known
        ? Boolean(languages.find((item) => item.code === param)?.isDefault)
        : true,
      isActive: known,
      warning,
    };
  }

  const resolved = resolveLocaleFromPath(options.pathname, languages, fallback);
  return {
    languages,
    currentLocale: resolved.locale,
    isDefault: resolved.isDefault,
    isActive: resolved.isActive,
    warning,
  };
}
