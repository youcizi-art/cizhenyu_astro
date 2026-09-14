/**
 * 阶段 C/D 出口验收（真实 payload 或 Mock）。
 *
 * 前提：payload 已 seed；astro npm run dev
 */
const cmsBase = String(process.env.CMS_BASE || 'http://127.0.0.1:5173').replace(/\/$/, '');
const siteBase = String(process.env.SITE_BASE || 'http://127.0.0.1:4321').replace(/\/$/, '');
const prefix = String(process.env.CMS_PREFIX || '/api/p').replace(/\/$/, '');
const secret = String(process.env.REVALIDATE_SECRET || 'dev-revalidate-secret').trim();
const locale = String(process.env.LOCALE_EN || 'en-US').trim();

let failed = 0;
function pass(msg) { console.log(`PASS  ${msg}`); }
function fail(msg) { failed += 1; console.log(`FAIL  ${msg}`); }

async function html(path) {
  const res = await fetch(`${siteBase}${path}`, { headers: { Accept: 'text/html' } });
  const text = await res.text();
  return { res, text, cache: res.headers.get('x-html-cache') || '' };
}

console.log(`accept:cd SITE=${siteBase} CMS=${cmsBase}${prefix} locale=${locale}`);

{
  const { res, text } = await html(`/${locale}/products/hydraulic-press-hp-200`);
  const hasSpecs = /Specifications|power|weight|footprint|kW/i.test(text);
  const hasGallery = /<img[^>]+src=/i.test(text);
  if (res.ok && hasSpecs && hasGallery) pass('C product detail: gallery + specs');
  else fail(`C product detail ok=${res.ok} specs=${hasSpecs} gallery=${hasGallery}`);
}

{
  const { res, text } = await html(`/${locale}/articles/qualify-oem-suppliers`);
  const hasCover = /picsum\.photos\/seed\/(b2b-a1|cizhenyu-article)/i.test(text);
  const hasBody = /on-site|packaging|Practical|process capability|pitfalls/i.test(text);
  if (res.ok && hasCover && hasBody) pass('C article detail: cover + body');
  else fail(`C article detail ok=${res.ok} cover=${hasCover} body=${hasBody}`);
}

{
  const { res, text } = await html(`/${locale}/resources/hp-200-datasheet`);
  const hasDownload = /Download/i.test(text) && /dummy\.pdf/i.test(text);
  if (res.ok && hasDownload) pass('C resource detail: download link');
  else fail(`C resource detail ok=${res.ok} download=${hasDownload}`);
}

{
  const { res, text } = await html(`/${locale}/case-studies/press-line-upgrade-eu`);
  const deep = /Challenge|Solution|Results/i.test(text);
  if (res.ok && deep) pass('C case study readable sections');
  else fail(`C case study ok=${res.ok} deep=${deep}`);
}

{
  const { res, text } = await html(`/${locale}/articles`);
  const pager = /Page\s+\d+\s+\/\s+\d+/i.test(text);
  if (res.ok && pager) pass('C article list pagination UI');
  else fail(`C article list pager ok=${res.ok}`);
}

{
  const { res, text } = await html(`/${locale}`);
  const cover = /card-media|picsum\.photos\/seed\/(b2b-p|cizhenyu-press)/i.test(text);
  if (res.ok && cover) pass('C home shows product covers');
  else fail(`C home covers ok=${res.ok}`);
}

{
  const first = await html(`/${locale}/products`);
  const second = await html(`/${locale}/products`);
  if (first.res.ok && second.res.ok && second.cache === 'HIT') {
    pass(`D HTML cache HIT after warm (first=${first.cache || 'MISS'})`);
  } else {
    fail(`D cache warm first=${first.cache} second=${second.cache}`);
  }

  const rev = await fetch(`${siteBase}/api/revalidate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret,
      collections: ['b2b_product'],
      paths: [`/${locale}/products`],
    }),
  });
  const revBody = await rev.json().catch(() => null);
  if (rev.ok && revBody?.ok && (revBody?.purged?.deleted > 0 || revBody?.purged?.mode)) {
    pass(`D revalidate purged deleted=${revBody.purged.deleted} mode=${revBody.purged.mode}`);
  } else {
    fail(`D revalidate status=${rev.status} body=${JSON.stringify(revBody)}`);
  }

  const third = await html(`/${locale}/products`);
  if (third.res.ok && third.cache === 'MISS') {
    pass('D after purge next fetch is MISS');
  } else {
    fail(`D after purge cache=${third.cache}`);
  }

  const status = await fetch(`${siteBase}/api/revalidate`);
  const statusBody = await status.json().catch(() => null);
  if (status.ok && statusBody?.lastPurge?.at) {
    pass('D GET /api/revalidate exposes lastPurge');
  } else {
    fail('D lastPurge missing');
  }
}

{
  const res = await fetch(`${cmsBase}${prefix}/data/b2b/products/b2b_product?locale=${encodeURIComponent(locale)}`);
  const body = await res.json().catch(() => null);
  if (res.ok && body?.data?.list?.length) pass('CMS still serving product list');
  else fail('CMS product list failed');
}

if (failed) {
  console.error(`accept:cd failed: ${failed}`);
  process.exit(1);
}
console.log('accept:cd passed — Phase C depth + D purge observable');
