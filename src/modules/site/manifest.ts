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
      revalidateSeconds: Number(input.cache?.revalidateSeconds || 120) || 120,
      revalidateSecretEnv: input.cache?.revalidateSecretEnv || 'REVALIDATE_SECRET',
    },
    hooks: input.hooks || {},
    brand: input.brand || {},
    domains: input.domains || {},
  };
}

export function resolveRevalidateSeconds(manifest: SiteManifest) {
  const value = Number(manifest.cache?.revalidateSeconds || 120) || 120;
  return Math.min(300, Math.max(60, value));
}
