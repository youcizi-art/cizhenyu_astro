import { describe, expect, it } from 'vitest';
import { unwrapEnvelope } from '../src/modules/cms/envelope';
import { pathsForCollections } from '../src/modules/cache/revalidate-map';
import { normalizeManifest } from '../src/modules/site/manifest';
import { loadSiteManifest, listRegisteredSiteKeys } from '../src/modules/site/load-site';
import { catalog } from '../src/modules/cms/catalog';
import { CmsError, isCmsError } from '../src/modules/cms/errors';
import { localePath, entityData } from '../src/modules/cms/entity';
import { resolveMediaUrl, resolveMediaUrls } from '../src/modules/media';
import { toProductDetail } from '../src/modules/product/types';
import { resolveLocaleFromPath, switchLocalePath, t } from '../src/modules/i18n';
import { buildAlternateLinks } from '../src/modules/seo/urls';
import { readSeoFields, toPageSeo } from '../src/modules/seo/types';
import { resolveTheme } from '../src/ui/themes/load-theme';
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

describe('theme resolve', () => {
  it('falls back unknown theme to default', () => {
    expect(resolveTheme({ theme: 'nope' }).themeId).toBe('default');
    expect(resolveTheme({ theme: 'turmill', primaryColor: '#4d8f65' })).toEqual({
      themeId: 'turmill',
      primaryColor: '#4d8f65',
    });
  });
});

describe('site registry', () => {
  it('registers demo and turmill', () => {
    expect(listRegisteredSiteKeys()).toEqual(expect.arrayContaining(['demo', 'turmill']));
    expect(loadSiteManifest('turmill').theme).toBe('turmill');
    expect(loadSiteManifest('demo').theme).toBe('default');
  });
});

describe('localePath', () => {
  it('prefixes locale without trailing slash on home', () => {
    expect(localePath('en', '/')).toBe('/en');
    expect(localePath('en', '/articles')).toBe('/en/articles');
  });
});

describe('cms errors', () => {
  it('marks cms errors', () => {
    const err = new CmsError('boom', { status: 503, code: 'network' });
    expect(isCmsError(err)).toBe(true);
    expect(err.status).toBe(503);
  });
});

describe('media resolve', () => {
  it('resolves absolute and object urls', () => {
    expect(resolveMediaUrl('https://cdn.example.com/a.jpg')).toBe('https://cdn.example.com/a.jpg');
    expect(resolveMediaUrl({ url: 'https://cdn.example.com/b.jpg' })).toBe('https://cdn.example.com/b.jpg');
    expect(resolveMediaUrls([{ src: 'https://cdn.example.com/1.jpg' }, { src: 'https://cdn.example.com/2.jpg' }])).toEqual([
      'https://cdn.example.com/1.jpg',
      'https://cdn.example.com/2.jpg',
    ]);
  });
});

describe('i18n path + labels', () => {
  it('switches locale prefix and keeps rest of path', () => {
    const langs = [
      { code: 'en', name: 'English', isDefault: true, status: 'active' },
      { code: 'zh-CN', name: '简体中文', isDefault: false, status: 'active' },
    ];
    expect(switchLocalePath('/en/products/press', 'zh-CN', langs)).toBe('/zh-CN/products/press');
    expect(switchLocalePath('/zh-CN/about', 'en', langs)).toBe('/en/about');
    expect(resolveLocaleFromPath('/zh-CN/products', langs, 'en')).toMatchObject({
      locale: 'zh-CN',
      hasPrefix: true,
      isActive: true,
    });
  });

  it('translates nav labels by locale', () => {
    expect(t('zh-CN', 'products')).toBe('产品');
    expect(t('en', 'language')).toBe('Language');
  });
});

describe('product mapping', () => {
  it('maps images and description from entity data', () => {
    const detail = toProductDetail({
      id: '11111111-1111-4111-8111-111111111111',
      data: {
        title: 'Press',
        slug: 'press',
        sku: 'P-1',
        summary: 'S',
        description: '<p>Body</p>',
        images: [{ url: 'https://cdn.example.com/p.jpg' }],
        status: 'published',
        seo_title: 'SEO Press',
        spec_data: { tonnage: '200 ton' },
      },
    }, 'en');
    expect(detail.href).toBe('/en/products/press');
    expect(detail.coverUrl).toBe('https://cdn.example.com/p.jpg');
    expect(detail.descriptionHtml).toBe('<p>Body</p>');
    expect(detail.seoTitle).toBe('SEO Press');
    expect(detail.specs).toEqual([{ key: 'tonnage', value: '200 ton' }]);
  });

  it('reads SEO from public API extension regions', () => {
    const detail = toProductDetail({
      id: '22222222-2222-4222-8222-222222222222',
      data: {
        title: 'Pump',
        slug: 'pump',
        summary: 'Flow',
        images: [{ url: 'https://cdn.example.com/pump.jpg' }],
        status: 'published',
      },
      _seo: {
        seo_title: 'Pump SEO',
        seo_description: 'Pump desc',
        robots_directive: 'index,follow',
        og_image: { url: 'https://cdn.example.com/og-pump.jpg' },
      },
      _schema: {
        schema_type: 'Product',
      },
    }, 'zh-CN');
    expect(detail.seoTitle).toBe('Pump SEO');
    expect(detail.seo.description).toBe('Pump desc');
    expect(detail.seo.schemaType).toBe('Product');
    expect(detail.seo.ogImage).toBe('https://cdn.example.com/og-pump.jpg');
    expect(detail.seo.robots).toBe('index,follow');
  });
});

describe('entityData extension regions', () => {
  it('flattens _seo/_schema/_geo onto business data', () => {
    const data = entityData({
      id: '1',
      data: { title: 'T', slug: 't' },
      _seo: { seo_title: 'SEO T', robots_directive: 'noindex,follow' },
      _schema: { schema_type: 'WebPage' },
      _geo: { geo_latitude: '29.8', geo_longitude: '121.5' },
    });
    expect(data.title).toBe('T');
    expect(data.seo_title).toBe('SEO T');
    expect(data.schema_type).toBe('WebPage');
    expect(data.geo_latitude).toBe('29.8');
    const fields = readSeoFields(data, 'T', '');
    expect(toPageSeo(fields).robots).toBe('noindex,follow');
  });
});

describe('hreflang alternates', () => {
  it('adds x-default when defaultLocale is provided', () => {
    const links = buildAlternateLinks(
      [
        { code: 'zh-CN', href: '/zh-CN/products' },
        { code: 'en-US', href: '/en-US/products' },
      ],
      { defaultLocale: 'zh-CN' }
    );
    expect(links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ hreflang: 'zh-CN' }),
        expect.objectContaining({ hreflang: 'en-US' }),
        expect.objectContaining({ hreflang: 'x-default', href: expect.stringContaining('/zh-CN/products') }),
      ])
    );
  });
});
