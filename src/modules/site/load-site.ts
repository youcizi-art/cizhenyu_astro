import { normalizeManifest, type SiteManifest } from './manifest';
import demoManifest from '../../../sites/demo/site.manifest.json';

const registry: Record<string, unknown> = {
  demo: demoManifest,
};

export function getSiteKey() {
  return String(import.meta.env.SITE_KEY || 'demo').trim() || 'demo';
}

export function loadSiteManifest(siteKey = getSiteKey()): SiteManifest {
  const raw = registry[siteKey];
  if (!raw) {
    throw new Error(`未知 SITE_KEY: ${siteKey}。请在 sites/ 下增加清单并注册到 load-site。`);
  }
  const normalized = normalizeManifest(raw as SiteManifest);
  const envBase = String(import.meta.env.PUBLIC_CMS_API_BASE || '').trim();
  if (envBase) {
    normalized.cms.apiBase = envBase.replace(/\/$/, '');
  }
  const envPrefix = String(import.meta.env.PUBLIC_CMS_API_PREFIX || '').trim();
  if (envPrefix) {
    normalized.cms.apiPrefix = envPrefix;
  }
  return normalized;
}
