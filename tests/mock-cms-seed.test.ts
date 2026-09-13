import { describe, expect, it } from 'vitest';
import { collections, languages } from '../mock-cms/seed.mjs';

describe('mock-cms seed', () => {
  it('exposes bilingual active languages matching demo site', () => {
    expect(languages.list.map((item) => item.code)).toEqual(['en', 'zh-CN']);
    expect(languages.list.filter((item) => item.isDefault)).toHaveLength(1);
  });

  it('keeps published products and draft product for visibility tests', () => {
    const rows = collections['b2b/products/b2b_product'];
    const published = rows.filter((row) => row.data.status === 'published');
    const drafts = rows.filter((row) => row.data.status === 'draft');
    expect(published.length).toBeGreaterThanOrEqual(4);
    expect(drafts.length).toBeGreaterThanOrEqual(1);
    expect(published.every((row) => row.data.slug)).toBe(true);
  });

  it('shares language_group_key across locales for press product', () => {
    const rows = collections['b2b/products/b2b_product'].filter(
      (row) => row.data.slug === 'hydraulic-press-hp-200'
    );
    expect(rows).toHaveLength(2);
    expect(rows[0].language_group_key).toBe(rows[1].language_group_key);
  });
});
