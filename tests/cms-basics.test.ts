import { describe, expect, it } from 'vitest';
import { unwrapEnvelope } from '../src/modules/cms/envelope';
import { pathsForCollections } from '../src/modules/cache/revalidate-map';
import { normalizeManifest } from '../src/modules/site/manifest';
import { catalog } from '../src/modules/cms/catalog';

describe('cms envelope', () => {
  it('unwraps ok payload', () => {
    expect(unwrapEnvelope({ status: 200, msg: 'ok', data: { a: 1 } })).toEqual({ a: 1 });
  });

  it('throws on error status', () => {
    expect(() => unwrapEnvelope({ status: 404, msg: 'missing', data: null })).toThrow(/missing/);
  });
});

describe('catalog', () => {
  it('maps product to grouped public path', () => {
    expect(catalog.product.dataPath).toBe('b2b/products/b2b_product');
    expect(catalog.companyInfo.presentation).toBe('single_form');
  });
});

describe('revalidate map', () => {
  it('expands collection to locale paths', () => {
    const paths = pathsForCollections(['b2b_product'], ['en', 'zh-CN']);
    expect(paths).toContain('/products');
    expect(paths).toContain('/en/products');
    expect(paths).toContain('/zh-CN/products');
  });
});

describe('site manifest', () => {
  it('clamps defaults', () => {
    const m = normalizeManifest({
      siteKey: 'demo',
      displayName: 'Demo',
      cms: { apiBase: 'https://api.example.com/' },
    });
    expect(m.cms.apiBase).toBe('https://api.example.com');
    expect(m.locales).toContain(m.defaultLocale);
  });
});

describe('localePath', () => {
  it('prefixes locale without trailing slash on home', async () => {
    const { localePath } = await import('../src/modules/cms/entity');
    expect(localePath('en', '/')).toBe('/en');
    expect(localePath('en', '/articles')).toBe('/en/articles');
  });
});
