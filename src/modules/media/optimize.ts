/**
 * 媒体展示优化：防 CLS + 懒加载；可选 Cloudflare Image Resizing（需套餐支持）。
 * 默认不启用 /cdn-cgi/image/，避免未开通时出破图；设 PUBLIC_CF_IMAGE_RESIZE=1 开启。
 */

import { isAbsoluteMediaUrl } from './resolve';

function resizeEnabled() {
  return String(import.meta.env.PUBLIC_CF_IMAGE_RESIZE || '').trim() === '1';
}

/** 生成 CF Image Resizing URL；失败则回退原地址 */
export function cfResizedUrl(src: string, width: number, quality = 75): string {
  const raw = String(src || '').trim();
  if (!raw || !resizeEnabled()) return raw;
  if (!isAbsoluteMediaUrl(raw) || raw.startsWith('data:') || raw.startsWith('blob:')) return raw;
  const abs = raw.startsWith('//') ? `https:${raw}` : raw;
  if (!/^https?:\/\//i.test(abs)) return raw;
  const w = Math.max(40, Math.min(2400, Math.round(width)));
  return `/cdn-cgi/image/width=${w},quality=${quality},format=auto/${abs}`;
}

export function buildSrcSet(
  src: string,
  widths: number[],
  quality = 75
): string {
  if (!resizeEnabled()) return '';
  return widths
    .map((w) => `${cfResizedUrl(src, w, quality)} ${w}w`)
    .filter((part) => part.trim())
    .join(', ');
}

export type OptimizedImageOptions = {
  src: string;
  width?: number;
  heightsHint?: number;
  widths?: number[];
  quality?: number;
  priority?: boolean;
};

export function resolveOptimizedImage(options: OptimizedImageOptions) {
  const src = String(options.src || '').trim();
  const width = options.width || 800;
  const widths = options.widths || [400, 800, 1200];
  const quality = options.quality ?? 75;
  const primary = resizeEnabled() ? cfResizedUrl(src, width, quality) : src;
  const srcset = buildSrcSet(src, widths, quality);
  return {
    src: primary || src,
    srcset: srcset || undefined,
    loading: options.priority ? ('eager' as const) : ('lazy' as const),
    decoding: 'async' as const,
    fetchpriority: options.priority ? ('high' as const) : undefined,
  };
}
