import type { ReferenceItem } from './types';

function asString(value: unknown): string | undefined {
  if (value == null || value === '') return undefined;
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value !== null && 'url' in value) {
    const url = String((value as { url?: unknown }).url || '').trim();
    return url || undefined;
  }
  return String(value);
}

/**
 * 解析后台 reference 字段。
 * - 存成对象 `{}`：单条
 * - 存成数组 `[]`：多条
 * 统一输出数组，并保留 `wasArray` 供展示策略使用。
 */
export function parseReferenceField(value: unknown): {
  items: ReferenceItem[];
  wasArray: boolean;
} {
  if (value == null || value === '') return { items: [], wasArray: false };

  let raw: unknown = value;
  if (typeof raw === 'string') {
    try {
      raw = JSON.parse(raw);
    } catch {
      return { items: [], wasArray: false };
    }
  }

  const wasArray = Array.isArray(raw);
  const list = wasArray ? raw : [raw];
  const items = (list as unknown[])
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object')
    .filter((item) => item.type !== 'external')
    .map((item) => ({
      type: 'internal' as const,
      title: asString(item.title),
      subtitle: asString(item.subtitle),
      description: asString(item.description),
      image: asString(item.image),
      refType: item.refType != null ? String(item.refType) : undefined,
      refId: item.refId != null ? String(item.refId) : undefined,
    }));

  return { items, wasArray };
}

export function normalizeReferenceValue(value: unknown): ReferenceItem[] {
  return parseReferenceField(value).items;
}
