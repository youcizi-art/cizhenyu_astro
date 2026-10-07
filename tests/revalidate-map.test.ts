import { describe, expect, it } from 'vitest';
import {
  normalizePurgePathInput,
  pathsForChromePurge,
  pathsForCollections,
  toTemplateCollectionSlug,
} from '../src/modules/cache/revalidate-map';

describe('toTemplateCollectionSlug', () => {
  it('matches bare b2b_ and namespaced slugs', () => {
    expect(toTemplateCollectionSlug('b2b_product')).toBe('b2b_product');
    expect(toTemplateCollectionSlug('ycz_me_product')).toBe('b2b_product');
    expect(toTemplateCollectionSlug('acme_nav_menu_item')).toBe('b2b_nav_menu_item');
    expect(toTemplateCollectionSlug('unknown_thing')).toBe(null);
  });
});

describe('pathsForCollections', () => {
  it('expands ns product slug to locale-aware product paths', () => {
    const paths = pathsForCollections(['ycz_me_product'], ['zh-CN', 'en-US']);
    expect(paths).toContain('/products');
    expect(paths).toContain('/zh-CN/products');
    expect(paths).toContain('/en-US/products');
  });

  it('chrome collections expand major site entries', () => {
    const paths = pathsForCollections(['demo_nav_menu_item'], ['zh-CN']);
    expect(paths).toContain('/');
    expect(paths).toContain('/products');
    expect(paths).toContain('/zh-CN/articles');
  });
});

describe('normalizePurgePathInput', () => {
  it('accepts absolute URL and relative path', () => {
    expect(normalizePurgePathInput('https://www.example.com/products/a?x=1')).toBe(
      '/products/a'
    );
    expect(normalizePurgePathInput('products/b')).toBe('/products/b');
  });
});

describe('pathsForChromePurge', () => {
  it('includes home and product list', () => {
    const paths = pathsForChromePurge(['ja']);
    expect(paths).toContain('/');
    expect(paths).toContain('/ja');
    expect(paths).toContain('/ja/products');
  });
});
