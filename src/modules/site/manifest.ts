export type SiteModules = {
  products: boolean;
  articles: boolean;
  caseStudies: boolean;
  solutions: boolean;
  faq: boolean;
  resources: boolean;
  about: boolean;
  contact: boolean;
};

export type SiteManifest = {
  siteKey: string;
  displayName: string;
  theme: string;
  defaultLocale: string;
  locales: string[];
  modules: SiteModules;
  cms: {
    apiBase: string;
    apiPrefix?: string;
    collectionNamespace?: string;
  };
  cache?: {
    /**
     * 公开 HTML 常态缓存秒数（长缓存）。
     * 默认 48h；最低 24h。内容新鲜度靠 CMS webhook purge，不靠短 TTL。
     */
    revalidateSeconds?: number;
    revalidateSecretEnv?: string;
  };
  hooks?: {
    revalidateUrl?: string;
  };
  brand?: {
    tagline?: string;
    primaryColor?: string;
  };
  domains?: Record<string, string>;
};

/** 常态 HTML 缓存：建议 48h */
export const DEFAULT_HTML_CACHE_TTL_SECONDS = 172_800;
/** 常态 HTML 缓存：最低 24h */
export const MIN_HTML_CACHE_TTL_SECONDS = 86_400;

const DEFAULT_MODULES: SiteModules = {
  products: true,
  articles: true,
  caseStudies: true,
  solutions: true,
  faq: true,
  resources: false,
  about: true,
  contact: true,
};

export function normalizeManifest(input: Partial<SiteManifest> & Pick<SiteManifest, 'siteKey' | 'displayName'>): SiteManifest {
  const defaultLocale = String(input.defaultLocale || 'en').trim() || 'en';
  const locales = Array.isArray(input.locales) && input.locales.length
    ? input.locales.map((item) => String(item).trim()).filter(Boolean)
    : [defaultLocale];
  if (!locales.includes(defaultLocale)) locales.unshift(defaultLocale);

  const ttlRaw = Number(input.cache?.revalidateSeconds);
  const ttl =
    Number.isFinite(ttlRaw) && ttlRaw > 0
      ? ttlRaw
      : DEFAULT_HTML_CACHE_TTL_SECONDS;

  return {
    siteKey: String(input.siteKey).trim(),
    displayName: String(input.displayName || input.siteKey).trim(),
    theme: String(input.theme || 'default').trim() || 'default',
    defaultLocale,
    locales,
    modules: { ...DEFAULT_MODULES, ...(input.modules || {}) },
    cms: {
      apiBase: String(input.cms?.apiBase || '').replace(/\/$/, ''),
      apiPrefix: input.cms?.apiPrefix || '/api/p',
      collectionNamespace: input.cms?.collectionNamespace || 'b2b',
    },
    cache: {
      revalidateSeconds: ttl,
      revalidateSecretEnv: input.cache?.revalidateSecretEnv || 'REVALIDATE_SECRET',
    },
    hooks: input.hooks || {},
    brand: input.brand || {},
    domains: input.domains || {},
  };
}

/** 公开 HTML 常态 TTL：最低 24h，默认 48h（变更靠 purge，不靠短过期） */
export function resolveRevalidateSeconds(manifest: SiteManifest) {
  const value = Number(manifest.cache?.revalidateSeconds);
  const raw =
    Number.isFinite(value) && value > 0 ? value : DEFAULT_HTML_CACHE_TTL_SECONDS;
  return Math.max(MIN_HTML_CACHE_TTL_SECONDS, Math.floor(raw));
}
