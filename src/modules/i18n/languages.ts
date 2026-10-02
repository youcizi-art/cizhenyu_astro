import { fetchLanguages, toErrorMessage } from '../cms';
import type { SiteManifest } from '../site';
import type { SiteLanguage } from './types';

function fromManifest(manifest: SiteManifest): SiteLanguage[] {
  return manifest.locales.map((code) => ({
    code,
    name: code,
    isDefault: code === manifest.defaultLocale,
    status: 'active',
  }));
}

function normalizeRow(row: Record<string, unknown>): SiteLanguage | null {
  const code = String(row.code || '').trim();
  if (!code) return null;
  return {
    code,
    name: String(row.name || code),
    isDefault: Boolean(row.isDefault),
    status: String(row.status || 'active'),
  };
}

type LangCache = {
  at: number;
  siteKey: string;
  result: { languages: SiteLanguage[]; warning?: string };
};

let langCache: LangCache | null = null;
/** isolate 内短缓存：middleware 与页面 bootstrap 共用，避免同请求重复打 /languages */
const LANG_TTL_MS = 5 * 60_000;

/** 优先 CMS /languages；失败则回退 manifest.locales（带 warning） */
export async function loadLanguages(manifest: SiteManifest): Promise<{
  languages: SiteLanguage[];
  warning?: string;
}> {
  const siteKey = String(manifest.siteKey || '').trim() || 'default';
  const now = Date.now();
  if (langCache && langCache.siteKey === siteKey && now - langCache.at < LANG_TTL_MS) {
    return langCache.result;
  }

  let result: { languages: SiteLanguage[]; warning?: string };
  try {
    const data = await fetchLanguages();
    const rows = Array.isArray(data.list) ? data.list : [];
    const active = rows
      .map((row) => normalizeRow(row as Record<string, unknown>))
      .filter((row): row is SiteLanguage => Boolean(row))
      .filter((row) => row.status === 'active');

    if (!active.length) {
      result = {
        languages: fromManifest(manifest),
        warning: 'CMS 未返回启用语种，已回退站点清单 locales',
      };
    } else if (!active.some((item) => item.isDefault)) {
      result = {
        languages: active.map((item) => ({
          ...item,
          isDefault: item.code === manifest.defaultLocale,
        })),
      };
    } else {
      result = { languages: active };
    }
  } catch (error) {
    result = {
      languages: fromManifest(manifest),
      warning: toErrorMessage(error, '语种列表加载失败，已回退站点清单'),
    };
  }

  langCache = { at: now, siteKey, result };
  return result;
}
