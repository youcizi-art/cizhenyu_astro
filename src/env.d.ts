/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CMS_API_BASE?: string;
  readonly PUBLIC_CMS_API_PREFIX?: string;
  readonly PUBLIC_MEDIA_BASE?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly SITE_KEY?: string;
  readonly REVALIDATE_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
