import { normalizeManifest, type SiteManifest } from './manifest';
import demoManifest from '../../../sites/demo/site.manifest.json';
import turmillManifest from '../../../sites/turmill/site.manifest.json';
import templateManifest from '../../../sites/_template/site.manifest.json';

const registry: Record<string, unknown> = {
  demo: demoManifest,
  turmill: turmillManifest,
  _template: templateManifest,
};

/** 交付包默认回退清单：按 THEME / PUBLIC_THEME 选模板 */
function deliveryTemplateKey(): string {
  const theme = String(
    import.meta.env.PUBLIC_THEME || import.meta.env.THEME || 'turmill'
  )
    .trim()
    .toLowerCase();
  if (theme && registry[theme]) return theme;
  if (registry.turmill) return 'turmill';
  return '_template';
}

export function getSiteKey() {
  return String(import.meta.env.SITE_KEY || 'demo').trim() || 'demo';
}

function applyEnvOverrides(manifest: SiteManifest, siteKey: string): SiteManifest {
  const next = { ...manifest, cms: { ...manifest.cms }, brand: { ...(manifest.brand || {}) }, domains: { ...(manifest.domains || {}) } };

  next.siteKey = siteKey;
  // 交付约定：SITE_KEY ≡ collectionNamespace
  next.cms.collectionNamespace = siteKey;

  const envBase = String(import.meta.env.PUBLIC_CMS_API_BASE || '').trim();
  if (envBase) {
    next.cms.apiBase = envBase.replace(/\/$/, '');
  }
  const envPrefix = String(import.meta.env.PUBLIC_CMS_API_PREFIX || '').trim();
  if (envPrefix) {
    next.cms.apiPrefix = envPrefix;
  }

  const displayName = String(import.meta.env.PUBLIC_SITE_DISPLAY_NAME || '').trim();
  if (displayName) next.displayName = displayName;

  const siteUrl = String(import.meta.env.PUBLIC_SITE_URL || '').trim();
  if (siteUrl) {
    try {
      const host = new URL(siteUrl.includes('://') ? siteUrl : `https://${siteUrl}`).host;
      if (host) next.domains = { ...next.domains, www: host };
    } catch {
      next.domains = { ...next.domains, www: siteUrl.replace(/^https?:\/\//, '') };
    }
  }

  const tagline = String(import.meta.env.PUBLIC_BRAND_TAGLINE || '').trim();
  if (tagline) next.brand = { ...next.brand, tagline };

  const primary = String(import.meta.env.PUBLIC_BRAND_PRIMARY_COLOR || '').trim();
  if (primary) next.brand = { ...next.brand, primaryColor: primary };

  const themeOverride = String(import.meta.env.PUBLIC_THEME || import.meta.env.THEME || '').trim();
  if (themeOverride) next.theme = themeOverride;

  const revalidateUrl = String(import.meta.env.PUBLIC_REVALIDATE_URL || '').trim();
  if (revalidateUrl) {
    next.hooks = { ...(next.hooks || {}), revalidateUrl };
  }

  return normalizeManifest(next);
}

/**
 * 加载站点清单。
 * - 已注册 siteKey：直接用 registry
 * - 未知 siteKey（交付多站）：回退 theme 模板，再用 env 覆盖 siteKey/ns/品牌/域名
 */
export function loadSiteManifest(siteKey = getSiteKey()): SiteManifest {
  const raw = registry[siteKey] ?? registry[deliveryTemplateKey()] ?? registry._template;
  if (!raw) {
    throw new Error(`未知 SITE_KEY: ${siteKey}，且无可用 delivery 模板。`);
  }
  return applyEnvOverrides(normalizeManifest(raw as SiteManifest), siteKey);
}

/** 已注册站点（测试/文档用）；不含 delivery 动态站 */
export function listRegisteredSiteKeys() {
  return Object.keys(registry).filter((k) => k !== '_template');
}
