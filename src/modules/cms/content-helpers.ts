import type { CmsEntity } from './entity';
import { entityData } from './entity';

/** 无 status 字段视为已发布（与公开 API 行为一致） */
export function isPublishedEntity(row: CmsEntity) {
  const status = String(entityData(row).status || '').trim().toLowerCase();
  return !status || status === 'published';
}

export function readSeoFields(data: Record<string, unknown>, fallbackTitle = '', fallbackDescription = '') {
  return {
    seoTitle: String(data.seo_title || fallbackTitle || '').trim(),
    seoDescription: String(data.seo_description || fallbackDescription || '').trim(),
  };
}

/** 将 spec_data（object / array）规范为展示行 */
export function readSpecEntries(raw: unknown): Array<{ key: string; value: string }> {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw
      .map((item) => {
        if (!item || typeof item !== 'object') return null;
        const row = item as Record<string, unknown>;
        const key = String(row.key || row.name || row.label || '').trim();
        const value = String(row.value || row.val || '').trim();
        if (!key && !value) return null;
        return { key: key || '—', value };
      })
      .filter((item): item is { key: string; value: string } => Boolean(item));
  }
  if (typeof raw === 'object') {
    return Object.entries(raw as Record<string, unknown>).map(([key, value]) => ({
      key,
      value: typeof value === 'object' ? JSON.stringify(value) : String(value ?? ''),
    }));
  }
  return [];
}
