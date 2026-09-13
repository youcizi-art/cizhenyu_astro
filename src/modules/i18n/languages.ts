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

/** 优先 CMS /languages；失败则回退 manifest.locales（带 warning） */
export async function loadLanguages(manifest: SiteManifest): Promise<{
  languages: SiteLanguage[];
  warning?: string;
}> {
  try {
    const data = await fetchLanguages();
    const rows = Array.isArray(data.list) ? data.list : [];
    const active = rows
      .map((row) => normalizeRow(row as Record<string, unknown>))
      .filter((row): row is SiteLanguage => Boolean(row))
      .filter((row) => row.status === 'active');

    if (!active.length) {
      return {
        languages: fromManifest(manifest),
        warning: 'CMS 未返回启用语种，已回退站点清单 locales',
      };
    }

    // 若 CMS 未标 default，用 manifest.defaultLocale
    if (!active.some((item) => item.isDefault)) {
      return {
        languages: active.map((item) => ({
          ...item,
          isDefault: item.code === manifest.defaultLocale,
        })),
      };
    }
    return { languages: active };
  } catch (error) {
    return {
      languages: fromManifest(manifest),
      warning: toErrorMessage(error, '语种列表加载失败，已回退站点清单'),
    };
  }
}
