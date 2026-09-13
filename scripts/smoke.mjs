/**
 * HTTP 冒烟：对关键路径做可达性检查（不要求 CMS 有数据）。
 * 用法：先 npm run dev，再 npm run smoke
 */
const base = String(process.env.SMOKE_BASE_URL || 'http://127.0.0.1:4321').replace(/\/$/, '');
const locale = String(process.env.SMOKE_LOCALE || 'en').trim() || 'en';

const paths = [
  '/',
  `/${locale}`,
  `/${locale}/products`,
  `/${locale}/about`,
  `/${locale}/__invalid_locale_should_redirect__/products`.replace(
    '__invalid_locale_should_redirect__',
    'zz-INVALID'
  ),
];

let failed = 0;
for (const path of paths) {
  const url = `${base}${path}`;
  try {
    const res = await fetch(url, { redirect: 'manual' });
    const ok = res.status < 500;
    const loc = res.headers.get('location') || '';
    console.log(`${ok ? 'OK' : 'FAIL'} ${res.status} ${path}${loc ? ` → ${loc}` : ''}`);
    if (!ok) failed += 1;
  } catch (error) {
    failed += 1;
    console.log(`FAIL 000 ${path} (${error instanceof Error ? error.message : error})`);
  }
}

if (failed) {
  console.error(`smoke failed: ${failed}`);
  process.exit(1);
}
console.log('smoke passed');
