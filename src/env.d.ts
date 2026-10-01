/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CMS_API_BASE?: string;
  readonly PUBLIC_CMS_API_PREFIX?: string;
  readonly PUBLIC_MEDIA_BASE?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly SITE_KEY?: string;
  readonly REVALIDATE_SECRET?: string;
  /** http（默认）| service（Cloudflare Service Binding） */
  readonly CMS_TRANSPORT?: string;
  /** Service Binding 变量名，默认 CMS */
  readonly CMS_SERVICE_BINDING?: string;
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

declare namespace App {
  interface Locals {
    /** middleware 语种路由已处理（防止 rewrite 二次进入形成 302 死循环） */
    localeRoutingDone?: boolean;
  }
}

interface CmsServiceFetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

declare module 'cloudflare:workers' {
  export const env: {
    CMS?: CmsServiceFetcher;
    [key: string]: unknown;
  };
}

declare namespace Cloudflare {
  interface Env {
    CMS?: CmsServiceFetcher;
    [key: string]: unknown;
  }
}
