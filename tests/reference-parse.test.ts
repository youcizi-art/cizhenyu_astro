import { describe, expect, it } from 'vitest';
import { parseReferenceField } from '../src/modules/reference/parse';

describe('parseReferenceField', () => {
  it('parses single object as one item', () => {
    const result = parseReferenceField({
      type: 'internal',
      refType: 'b2b_product',
      refId: 'abc',
      title: 'HP-200',
    });
    expect(result.wasArray).toBe(false);
    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.refType).toBe('b2b_product');
    expect(result.items[0]?.title).toBe('HP-200');
  });

  it('parses array as multiple items', () => {
    const result = parseReferenceField([
      { type: 'internal', refType: 'b2b_article', refId: '1' },
      { type: 'internal', refType: 'b2b_resource' },
    ]);
    expect(result.wasArray).toBe(true);
    expect(result.items).toHaveLength(2);
    expect(result.items[1]?.refId).toBeUndefined();
  });

  it('accepts image as media object', () => {
    const result = parseReferenceField({
      type: 'internal',
      refType: 'b2b_product',
      image: { url: 'https://example.com/a.jpg' },
    });
    expect(result.items[0]?.image).toBe('https://example.com/a.jpg');
  });

  it('returns empty for nullish', () => {
    expect(parseReferenceField(null).items).toEqual([]);
    expect(parseReferenceField(undefined).items).toEqual([]);
  });
});
