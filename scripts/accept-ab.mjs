/**
 * 阶段 A/B 出口验收（真实 payload 或 Mock CMS）。
 *
 * 用法：
 *   1) cizhenyu_payload: npm run dev（已 seed）
 *   2) cizhenyu_astro: npm run dev
 *   3) npm run accept:ab
 *
 * 环境变量：
 *   CMS_BASE   默认 http://127.0.0.1:5173
 *   SITE_BASE  默认 http://127.0.0.1:4321
 *   CMS_PREFIX 默认 /api/p
 *   LOCALE_EN  默认 en-US
 *   LOCALE_ZH  默认 zh-CN
 */
const cmsBase = String(process.env.CMS_BASE || 'http://127.0.0.1:5173').replace(/\/$/, '');
const siteBase = String(process.env.SITE_BASE || 'http://127.0.0.1:4321').replace(/\/$/, '');
const prefix = String(process.env.CMS_PREFIX || '/api/p').replace(/\/$/, '');
const localeEn = String(process.env.LOCALE_EN || 'en-US').trim();
const localeZh = String(process.env.LOCALE_ZH || 'zh-CN').trim();

let failed = 0;

function pass(msg) {
  console.log(`PASS  ${msg}`);
}

function fail(msg) {
  failed += 1;
  console.log(`FAIL  ${msg}`);
}

async function getJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  const body = await res.json().catch(() => null);
  return { res, body };
}

async function getHtml(path) {
  const res = await fetch(`${siteBase}${path}`, {
    redirect: 'manual',
    headers: { Accept: 'text/html' },
  });
  const text = res.status < 400 ? await res.text().catch(() => '') : '';
  return { res, text, location: res.headers.get('location') || '' };
}

console.log(`accept:ab CMS=${cmsBase}${prefix} SITE=${siteBase} locales=${localeEn},${localeZh}`);

{
  const { res, body } = await getJson(`${cmsBase}${prefix}/languages`);
  const list = body?.data?.list || [];
  if (res.ok && body?.status === 200 && list.length >= 2) {
    pass(`CMS languages (${list.map((item) => item.code).join(', ')})`);
  } else {
    fail(`CMS languages status=${res.status}`);
  }
}

{
  const { res, body } = await getJson(
    `${cmsBase}${prefix}/data/b2b/products/b2b_product?locale=${encodeURIComponent(localeEn)}&pageSize=12`
  );
  const list = body?.data?.list || [];
  const draftHit = list.some((row) => String(row?.data?.status || '') === 'draft');
  if (res.ok && list.length >= 1 && !draftHit) {
    pass(`CMS product list ${localeEn} count=${list.length} (drafts hidden)`);
  } else {
    fail(`CMS product list ${localeEn} status=${res.status} count=${list.length} draftHit=${draftHit}`);
  }
}

{
  const { res, body } = await getJson(
    `${cmsBase}${prefix}/data/b2b/products/b2b_product?locale=${encodeURIComponent(localeZh)}&pageSize=12`
  );
  const list = body?.data?.list || [];
  const title = String(list[0]?.data?.title || '');
  if (res.ok && list.length >= 1 && /[\u4e00-\u9fff]/.test(title)) {
    pass(`CMS product list ${localeZh} sample="${title}"`);
  } else {
    fail(`CMS product list ${localeZh} status=${res.status} title=${title}`);
  }
}

{
  const { res, body } = await getJson(
    `${cmsBase}${prefix}/data/b2b/products/b2b_product?locale=${encodeURIComponent(localeEn)}&slug=hydraulic-press-hp-200`
  );
  const row = body?.data?.list?.[0];
  const hasImg = Boolean(row?.data?.images?.[0]?.url || row?.data?.images?.[0]);
  const hasBody = String(row?.data?.description || '').includes('<p>');
  if (res.ok && row && hasImg && hasBody) {
    pass('CMS product detail fields (images + description)');
  } else {
    fail(`CMS product slug lookup img=${hasImg} body=${hasBody}`);
  }
}

{
  const { res, body } = await getJson(
    `${cmsBase}${prefix}/data/b2b/settings/b2b_company_info/single?locale=${encodeURIComponent(localeEn)}`
  );
  if (res.ok && body?.data?.data?.company_name) {
    pass(`CMS company single "${body.data.data.company_name}"`);
  } else {
    fail(`CMS company single status=${res.status}`);
  }
}

{
  const home = await getHtml(`/${localeEn}`);
  const langOk = new RegExp(`lang=["']${localeEn}["']`, 'i').test(home.text);
  if (home.res.status === 200 && langOk && /lang-switch|hreflang/i.test(home.text)) {
    pass(`A/B home /${localeEn} has lang + switcher/hreflang`);
  } else {
    fail(`home /${localeEn} status=${home.res.status}`);
  }
}

{
  const page = await getHtml(`/${localeEn}/products`);
  const hasProduct = /Hydraulic Press HP-200|HP-200/i.test(page.text);
  const hasSwitcher = /zh-CN|简体中文/i.test(page.text);
  if (page.res.status === 200 && hasProduct && hasSwitcher) {
    pass(`A exit: /${localeEn}/products shows real product + locale switcher`);
  } else {
    fail(`/${localeEn}/products status=${page.res.status} product=${hasProduct} switcher=${hasSwitcher}`);
  }
}

{
  const page = await getHtml(`/${localeZh}/products`);
  const hasZh = /液压机|离心泵|液壓|離心/.test(page.text);
  const htmlLang = new RegExp(`lang=["']${localeZh}["']`, 'i').test(page.text);
  if (page.res.status === 200 && hasZh && htmlLang) {
    pass(`B exit: /${localeZh}/products locale + Chinese content`);
  } else {
    fail(`/${localeZh}/products status=${page.res.status} zh=${hasZh} lang=${htmlLang}`);
  }
}

{
  const page = await getHtml(`/${localeEn}/products/hydraulic-press-hp-200`);
  const hasImg = /<img[^>]+src=/i.test(page.text);
  const hasBody = /HP-200|tonnage|footprint|changeovers|Power|kW/i.test(page.text);
  if (page.res.status === 200 && hasImg && hasBody) {
    pass('A exit: product detail has image + body');
  } else {
    fail(`product detail status=${page.res.status} img=${hasImg} body=${hasBody}`);
  }
}

{
  const page = await getHtml('/zz-INVALID/products');
  const redirected =
    page.res.status >= 300
    && page.res.status < 400
    && /\/(zh-CN|zh-TW|ja|en-US|en)\/products/.test(page.location);
  if (redirected) {
    pass(`B5 invalid locale → ${page.location}`);
  } else {
    fail(`invalid locale status=${page.res.status} loc=${page.location}`);
  }
}

{
  const page = await getHtml(`/${localeEn}/about`);
  if (page.res.status === 200 && /Demo Industrial|About/i.test(page.text)) {
    pass('about page renders company/content');
  } else {
    fail(`about status=${page.res.status}`);
  }
}

if (failed) {
  console.error(`accept:ab failed: ${failed}`);
  process.exit(1);
}
console.log('accept:ab passed — A/B exit criteria met against current CMS_BASE');
