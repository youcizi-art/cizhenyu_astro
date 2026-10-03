import { normalizeManifest, type SiteManifest } from './manifest';
import { envSync } from '../runtime/env';
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
  const theme = String(envSync('PUBLIC_THEME') || envSync('THEME') || 'default')
    .trim()
    .toLowerCase();
  // default 主题交付站使用 demo 清单作模板，再由 SITE_KEY/env 覆盖
  if (theme === 'default' && registry.demo) return 'demo';
  if (theme && registry[theme]) return theme;
  if (registry.demo) return 'demo';
  if (registry.turmill) return 'turmill';
  return '_template';
}

export function getSiteKey() {
  return String(envSync('SITE_KEY') || 'demo').trim() || 'demo';
}

function applyEnvOverrides(manifest: SiteManifest, siteKey: string): SiteManifest {
  const next = {
    ...manifest,
    cms: { ...manifest.cms },
    brand: { ...(manifest.brand || {}) },
    domains: { ...(manifest.domains || {}) },
  };

  next.siteKey = siteKey;
  // 交付约定：SITE_KEY ≡ collectionNamespace
  next.cms.collectionNamespace = siteKey;

  const envBase = envSync('PUBLIC_CMS_API_BASE');
  if (envBase) {
    next.cms.apiBase = envBase.replace(/\/$/, '');
  }
  const envPrefix = envSync('PUBLIC_CMS_API_PREFIX');
  if (envPrefix) {
    next.cms.apiPrefix = envPrefix;
  }

  const displayName = envSync('PUBLIC_SITE_DISPLAY_NAME');
  if (displayName) next.displayName = displayName;

  const siteUrl = envSync('PUBLIC_SITE_URL');
  if (siteUrl) {
    try {
      const host = new URL(siteUrl.includes('://') ? siteUrl : `https://${siteUrl}`).host;
      if (host) next.domains = { ...next.domains, www: host };
    } catch {
      next.domains = { ...next.domains, www: siteUrl.replace(/^https?:\/\//, '') };
    }
  }

  const tagline = envSync('PUBLIC_BRAND_TAGLINE');
  if (tagline) next.brand = { ...next.brand, tagline };

  const primary = envSync('PUBLIC_BRAND_PRIMARY_COLOR');
  if (primary) next.brand = { ...next.brand, primaryColor: primary };

  const themeOverride = envSync('PUBLIC_THEME') || envSync('THEME');
  if (themeOverride) next.theme = themeOverride;

  const revalidateUrl = envSync('PUBLIC_REVALIDATE_URL');
  if (revalidateUrl) {
    next.hooks = { ...(next.hooks || {}), revalidateUrl };
  }

  return normalizeManifest(next);
}

/**
 * 加载站点清单。
 * - 已注册 siteKey：直接用 registry
 * - 未知 siteKey（交付多站）：回退 theme 模板，再用 env 覆盖 siteKey/ns/品牌/域名
 * 注意：生产请先 warmRuntimeEnv()，以便读到 Pages 运行时变量。
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
