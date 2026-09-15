/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CMS_API_BASE?: string;
  readonly PUBLIC_CMS_API_PREFIX?: string;
  readonly PUBLIC_MEDIA_BASE?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly SITE_KEY?: string;
  readonly REVALIDATE_SECRET?: string;
  /** 开发环境强制开启 HTML 缓存（默认关闭） */
  readonly HTML_CACHE_IN_DEV?: string;
  /** 任意环境关闭 HTML 缓存 */
  readonly DISABLE_HTML_CACHE?: string;
  readonly CF_ZONE_ID?: string;
  readonly CF_API_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
