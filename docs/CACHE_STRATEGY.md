# 双项目缓存与容量策略

> 目标：免费 Cloudflare 架构下，B2B 站群约 **1 万日 UV**。  
> 原则：**公开页长缓存；CMS 变更时精准失效；MISS 时并行回源，不把 UV 压力堆在 Workers。**

相关项目：

- 前端：`cizhenyu_astro`（本仓库，Pages）
- 后端：`cizhenyu_payload`（Workers）

---

## 1. 为什么主缓存在前端

免费 Workers 日请求量级约 **10 万次**。  
若 1 万 UV × 数个页面 × 每页多次 API，请求会轻易打满。

因此：

| 层 | 承担 | 不承担 |
| --- | --- | --- |
| **Astro / Pages HTML（长缓存 + on-demand purge）** | 绝大多数访客流量 | — |
| **CMS 公开 API** | miss / 发布后回源、表单 submit | 日常 PV |
| Zone Tag / API CDN | 可选增强 | 不可替代前端 HTML 缓存 |

---

## 2. 推荐链路（正确模型）

```text
【读 · 常态】
访客 → Pages
         ├─ HTML HIT（默认 48h，最低 24h）→ 直接返回，不打 CMS
         └─ MISS / 被 purge → SSR（接口并行）→ 写回长缓存

【写 · 数据更新缓存】
编辑保存 → CMS D1 成功
              → POST 站点 hooks.revalidateUrl
              → Pages 只失效相关路径（不是缩短全站 TTL）
              → 下一访客对该路径 MISS → SSR 拉新数据 → 再写入 48h

【兜底】
无 webhook 或失败 → 管理端可手动刷新；页面仍保持长缓存直至到期或成功 purge
```

**禁止**把「变更后尽快可见」实现成「全站每 2～5 分钟自然过期」。  
短窗口只属于 **增删改后的失效/重建**，不是整体缓存策略。

产品意义上的「主动推送缓存」= **CMS 通知前端清页面缓存**，不是运营去清 Worker/Zone。

---

## 3. 前端职责（本仓库）

1. 常态 HTML TTL：`cache.revalidateSeconds` 默认 **172800（48h）**，最低 **86400（24h）**。  
2. 实现 `POST /api/revalidate`：校验 `secret`，按 `collections` / `paths` 失效。  
3. 同一页面渲染：**无依赖接口全部并行**；可保留请求内短缓存防并发放大。  
4. 会员页、带 Cookie 的响应用 `private, no-store`。  
5. 询盘/留言：量小，可浏览器直打 `api_domain` 的 `/submit/...`。

### revalidate 载荷（与后端约定）

见 [REVALIDATE_MAP.md](./REVALIDATE_MAP.md)。摘要：

```json
{
  "secret": "...",
  "siteKey": "acme",
  "collections": ["b2b_product", "b2b_article"],
  "paths": ["/en/products"]
}
```

粗粒度按集合映射到路径前缀即可。

---

## 4. 后端职责（payload，最小）

1. 实体创建/更新/删除成功后，读取站点登记的 `revalidateUrl`，异步 POST。  
2. 管理端提供「刷新站点缓存」= 重发 webhook。  
3. API 层可选短缓存仅防击穿；**不以** Cache API / Zone Tag 作为 UV 方案。  

---

## 5. 容量粗算（验收口径）

假设：1 万 UV，人均 4 个页面，长缓存命中率 ≥90%：

- 页面请求 ≈ 4 万（Pages）  
- SSR 回源页 ≈ 4 千（主要来自首次、purge 后、冷边缘）  
- 每页平均数次并行 API → Worker 远低于日限额  

若无页面缓存、每页都 SSR+串行 API：Worker 与 TTFB 都会失控。

验收：生产观察 **Worker 日请求 ≪ 页面 PV**，且 `X-HTML-Cache` 以 **HIT** 为主。

---

## 6. 明确不做

- 指望后端 Cache API 扛 1 万 UV  
- 用 60～300 秒短 TTL 冒充「内容新鲜度」  
- 把多站点 HTML 缓存在 CMS Worker 上  
- MISS 时把无依赖接口串行 await（延迟叠加）

---

## 7. 当前实现状态

已落地（本仓库）：

1. **Middleware HTML cache**：公开 GET HTML → 内存（本地）/ `caches.default`（Workers，按站点真实 origin 建键）  
2. **常态 TTL**：响应 `s-maxage` 默认 48h（最低 24h）  
3. **数据更新**：`POST /api/revalidate` 按 collections/paths **删除**缓存；可选 CF Zone Purge  
4. **DEV 默认 BYPASS**（`X-HTML-Cache: BYPASS`）；验收缓存时设 `HTML_CACHE_IN_DEV=1`  
5. **并行回源**：chrome（company∥nav）、导航 reference、首页区块/列表/SEO page 同批 `Promise.all`  
6. 响应头：`Cache-Control: s-maxage=…` + `Cache-Tag` + `X-HTML-Cache: HIT|MISS|BYPASS`

后端（payload）已接：

- 实体增删改后 `waitUntil(notifySiteRevalidate)` → `SITE_REVALIDATE_URL`

验收：`npm run accept:cd`（需先 `mock:cms` 或真实 CMS + `dev`）。

### 生产 revalidate 配置（必做）

部署前端时写入 Pages 变量：`REVALIDATE_SECRET`；CMS 侧配置对应站点的 `revalidateUrl`。  
未配置时保存内容仍成功，仅跳过通知；页面保持长缓存直至手动 purge 或 TTL 到期。
