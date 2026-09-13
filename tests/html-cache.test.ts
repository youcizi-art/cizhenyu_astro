import { describe, expect, it } from 'vitest';
import { getCachedHtml, purgeHtmlPaths, putCachedHtml } from '../src/modules/cache/html-cache';

describe('html-cache purge', () => {
  it('stores and returns HIT entry, then purge deletes it', async () => {
    const url = new URL('http://127.0.0.1:4321/en/products');
    await putCachedHtml(
      url,
      new Response('<html>products</html>', {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      })
    );
    const hit = await getCachedHtml(url);
    expect(hit?.body).toContain('products');

    const result = await purgeHtmlPaths({
      paths: ['/en/products'],
      locales: ['en', 'zh-CN'],
      siteOrigin: 'http://localhost:4321',
    });
    expect(result.deleted).toBeGreaterThan(0);
    expect(await getCachedHtml(url)).toBeNull();
  });
});
