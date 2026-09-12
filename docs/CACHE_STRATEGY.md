# 双项目缓存与容量策略

> 目标：免费 Cloudflare 架构下，B2B 站群约 **1 万日 UV**。  
> 原则：**页面缓存在前端；后端发变更信号；不把 UV 压力堆在 Workers。**

相关项目：

- 前端：`cizhenyu_astro`（本仓库，Pages）
- 后端：`cizhenyu_payload`（Workers）

---

## 1. 为什么主缓存在前端

免费 Workers 日请求量级约 **10 万次**。  
若 1 万 UV × 数个页面 × 每页多次 API，请求会轻易打满。

`caches.default`（Worker 内 Cache API）**不能**显著节省「请求次数」——请求仍进入 Worker。  
因此：

| 层 | 承担 | 不承担 |
| --- | --- | --- |
| **Astro / Pages HTML（ISR + on-demand）** | 绝大多数访客流量 | — |
| **CMS 公开 API** | miss / 发布后回源、表单 submit | 日常 PV |
| Zone Tag / API 24h CDN | 可选增强 | 1 万 UV 主方案 |

---

## 2. 推荐链路

```text
【读】
访客 → Pages
         ├─ HTML 命中 → 结束（不打 CMS）
         └─ miss / 到期 → SSR fetch CMS → 写回页面缓存

【写】
编辑保存 → CMS D1 成功
              → POST 站点 hooks.revalidateUrl
              → Pages 只失效相关路径
              → 下一访客得新页

【兜底】
无 webhook 或失败 → 页面 revalidateSeconds（建议 60～300）内自然更新
```

产品意义上的「主动推送缓存」= **CMS 通知前端清页面缓存**，不是运营去清 Worker/Zone。

---

## 3. 前端职责（本仓库）

1. 默认 `revalidate` / ISR：**120 秒**（站点 manifest 可改，上限建议 300 以满足「≤5 分钟」）。  
2. 实现 `POST /api/revalidate`：校验 `secret`，按 `collections` / `paths` 失效。  
3. 同一页面渲染合并 SDK 请求；可保留请求内短缓存防并发放大（参考 `czy_model` requestCache）。  
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
4. 历史文档中「免费无 Tag 权限」已过时（2025-04 起全套餐可 Tag purge）；即便可用，也 **不替代** 前端页面缓存。

---

## 5. 容量粗算（验收口径）

假设：1 万 UV，人均 4 个页面，ISR 命中率 90%：

- 页面请求 ≈ 4 万（Pages）  
- SSR 回源页 ≈ 4 千  
- 每页平均 3 次 API → Worker ≈ **1.2 万**（远低于 10 万）

若无页面缓存、每页都 SSR+API：Worker 易到 **数万～十万+**，不安全。

验收：生产观察 **Worker 日请求 ≪ 页面 PV**。

---

## 6. 明确不做（本阶段）

- 指望后端 Cache API 扛 1 万 UV  
- 无 webhook、又把 revalidate 设成数小时（违反 5 分钟可见）  
- 把多站点 HTML 缓存在 CMS Worker 上  

---

## 7. 与文档的关系

- 平台总方案：`FRONTEND_PLATFORM.md`  
- API 细节：`BACKEND_INTEGRATION.md`  
- 集合路径：`CMS_MAPPING.md`
