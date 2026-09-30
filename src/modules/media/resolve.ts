/**
 * 媒体地址解析（最小集）：兼容 string / 数组 / {url|src|path}。
 */

import { envSync } from '../runtime/env';

function mediaBase() {
  const imageBase = envSync('PUBLIC_MEDIA_BASE');
  if (imageBase) return imageBase.replace(/\/+$/, '');
  return envSync('PUBLIC_CMS_API_BASE').replace(/\/+$/, '');
}

export function isAbsoluteMediaUrl(src: string) {
  const raw = String(src || '').trim();
  if (!raw) return false;
  return /^(https?:)?\/\//i.test(raw) || /^(data|blob):/i.test(raw);
}

export function extractMediaPath(value?: unknown): string {
  if (value == null) return '';

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      try {
        return extractMediaPath(JSON.parse(trimmed));
      } catch {
        return trimmed;
      }
    }
    return trimmed;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = extractMediaPath(item);
      if (found) return found;
    }
    return '';
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    return extractMediaPath(
      obj.url ?? obj.src ?? obj.path ?? obj.image ?? obj.fileUrl ?? obj.file_url
    );
  }

  return String(value).trim();
}

export function resolveMediaUrl(value?: unknown): string {
  const raw = extractMediaPath(value);
  if (!raw) return '';
  if (isAbsoluteMediaUrl(raw)) {
    return raw.startsWith('//') ? `https:${raw}` : raw;
  }
  const path = raw.startsWith('/') ? raw : `/${raw}`;
  const base = mediaBase();
  return base ? `${base}${path}` : path;
}

export function resolveMediaUrls(value?: unknown): string[] {
  if (value == null || value === '') return [];

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.startsWith('[')) {
      try {
        return resolveMediaUrls(JSON.parse(trimmed));
      } catch {
        const one = resolveMediaUrl(trimmed);
        return one ? [one] : [];
      }
    }
    const one = resolveMediaUrl(trimmed);
    return one ? [one] : [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveMediaUrl(item)).filter(Boolean);
  }

  const one = resolveMediaUrl(value);
  return one ? [one] : [];
}
