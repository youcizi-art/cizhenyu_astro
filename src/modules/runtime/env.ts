/**
 * 运行时环境变量：优先 Cloudflare Pages/Workers env，其次 import.meta.env（本地 / 构建兜底）。
 * 交付构建勿依赖本机 .env 烤进 PUBLIC_*；线上以 Pages 变量为准。
 */

type EnvBag = Record<string, unknown>;

let cachedRuntimeEnv: EnvBag | null | undefined;

async function loadCloudflareEnv(): Promise<EnvBag | null> {
  if (cachedRuntimeEnv !== undefined) return cachedRuntimeEnv;
  try {
    const mod = await import('cloudflare:workers');
    const env = (mod as { env?: EnvBag }).env;
    cachedRuntimeEnv = env && typeof env === 'object' ? env : null;
  } catch {
    cachedRuntimeEnv = null;
  }
  return cachedRuntimeEnv;
}

function fromImportMeta(name: string): string {
  const bag = import.meta.env as Record<string, unknown>;
  const v = bag?.[name];
  return v == null ? '' : String(v).trim();
}

/** 同步读取（仅 import.meta / 已缓存的 CF env）；构建期与本地可用 */
export function envSync(name: string): string {
  if (cachedRuntimeEnv && typeof cachedRuntimeEnv[name] === 'string') {
    return String(cachedRuntimeEnv[name]).trim();
  }
  return fromImportMeta(name);
}

/** 异步：先拉取 CF runtime env，再读键 */
export async function envAsync(name: string): Promise<string> {
  const cf = await loadCloudflareEnv();
  if (cf && typeof cf[name] === 'string') {
    const v = String(cf[name]).trim();
    if (v) return v;
  }
  return fromImportMeta(name);
}

export async function getCmsTransport(): Promise<'http' | 'service'> {
  const raw = (await envAsync('CMS_TRANSPORT')).toLowerCase() || 'http';
  return raw === 'service' ? 'service' : 'http';
}

export async function getCmsServiceBindingName(): Promise<string> {
  return (await envAsync('CMS_SERVICE_BINDING')) || 'CMS';
}

export async function getCmsApiBase(): Promise<string> {
  const configured = (await envAsync('PUBLIC_CMS_API_BASE')).replace(/\/$/, '');
  if (configured) return configured;
  if ((await getCmsTransport()) === 'service') return 'https://cms.internal';
  return '';
}

export async function getCmsApiPrefix(): Promise<string> {
  const raw = (await envAsync('PUBLIC_CMS_API_PREFIX')) || '/api/p';
  const trimmed = raw.trim();
  return trimmed.startsWith('/') ? trimmed.replace(/\/$/, '') : `/${trimmed.replace(/\/$/, '')}`;
}

export async function getSiteKeyEnv(): Promise<string> {
  return (await envAsync('SITE_KEY')) || fromImportMeta('SITE_KEY') || 'demo';
}

/** 预热 CF env 缓存（中间件 / 入口可调用） */
export async function warmRuntimeEnv() {
  await loadCloudflareEnv();
}

export async function getCloudflareEnv(): Promise<EnvBag | null> {
  return loadCloudflareEnv();
}
