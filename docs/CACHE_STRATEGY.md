# 双项目缓存与容量策略

> 目标：免费 Cloudflare 架构下，B2B 站群约 **1 万日 UV**。  
> 原则：**公开页长缓存落在 Pages 边缘；CMS 变更时精准失效；MISS 时并行回源，不把 UV 压力堆在 Workers。**

相关项目：

- 前端：`cizhenyu_astro`（本仓库，Pages）
- 后端：`cizhenyu_payload`（Workers）
- 规则操作说明书：[CACHE_RULES.md](./CACHE_RULES.md)

---

## 1. 为什么主缓存在前端边缘

免费 Workers 日请求量级约 **10 万次**。  
若 1 万 UV × 数个页面 × 每页多次 API，请求会轻易打满。

因此：

| 层 | 承担 | 不承担 |
| --- | --- | --- |
| **Pages 边缘 HTML（部署自动写 Cache Rules + on-demand purge）** | 绝大多数访客 GET | — |
| **Pages Function SSR** | MISS / purge 后回源 | 日常重复 PV |
| **CMS 公开 API** | SSR 回源、表单 submit | 日常 PV |
| Worker 内 Cache API | 仅 Function 已执行时的同 colo 回落 | 不可冒充「Pages 缓存完成」 |

---

## 2. 正确链路

```text
【读 · 常态】
访客 → Cloudflare 边缘
         ├─ HIT（默认 48h，最低 24h）→ 直接返回 HTML（不进 Function，不打 CMS）
         └─ MISS → Pages Function SSR（接口并行）→ 写回边缘长缓存
              └─（若仍进 Function）Worker Cache API 回落，避免重复打 CMS

【写 · 数据更新】
编辑保存 → CMS D1 成功
              → POST 站点 hooks.revalidateUrl（/api/revalidate，no-store）
              → Zone Purge 相关绝对 URL + 清 Worker 回落缓存
              → 下一访客对该路径 MISS → SSR → 再写入 48h

【兜底】
无 webhook 或缺 CF_API_TOKEN → 管理端可手动刷新；页面保持长缓存直至成功 purge 或 TTL
```

**禁止**把「变更后尽快可见」实现成「全站每 2～5 分钟自然过期」。

---

## 3. 前端职责

1. 常态 HTML TTL：`cache.revalidateSeconds` 默认 **172800（48h）**，最低 **86400（24h）**。  
2. 响应头：`Cache-Control: public, s-maxage=…` + `CDN-Cache-Control: public, max-age=…` + `Cache-Tag`。  
3. `POST /api/revalidate`：`private, no-store`；校验 secret；Zone Purge + 本地/Cache API 删除。  
4. 同一页面渲染：**无依赖接口并行**（产品详情：enrich ∥ hreflang）。  
5. 自定义域：部署/改绑时自动写 Cache Rules；设置页只补权限；前端站点列表可一键「同步边缘缓存」

### revalidate 载荷

见 [REVALIDATE_MAP.md](./REVALIDATE_MAP.md)。

---

## 4. 后端职责（payload，最小）

1. 实体增删改成功后 `waitUntil(notifySiteRevalidate)` → `SITE_REVALIDATE_URL`。  
2. 管理端「刷新站点缓存」= 重发 webhook。  
3. **不以** CMS Worker Cache 作为 UV 方案。

---

## 5. 容量粗算

假设：1 万 UV，人均 4 个页面，边缘命中率 ≥90%：

- 页面请求 ≈ 4 万（边缘）  
- Function SSR ≈ 4 千（首次、purge、冷边缘）  
- CMS Worker ≪ 日限额  

验收：生产 **`cf-cache-status: HIT` 为主**，且 **Pages Function 调用 ≪ 页面 PV**。  
仅有 `X-HTML-Cache: HIT` 而 Function 仍涨 = 只命中 Worker 回落，边缘未达标。

---

## 6. 明确不做

- 指望 Worker 内 Cache API 扛 1 万 UV  
- 用 60～300 秒短 TTL 冒充新鲜度  
- 把多站点 HTML 缓存在 CMS Worker  
- MISS 时无依赖接口串行 await  

---

## 7. 当前实现状态

已落地：

1. **边缘意图头**：`s-maxage` + `CDN-Cache-Control`（默认 48h）  
2. **API no-store**：`/api/revalidate`  
3. **Worker Cache API 回落**：middleware；`X-HTML-Cache` + `X-HTML-Cache-Layer=worker-cache|ssr`；写入不阻塞 TTFB  
4. **Zone Purge**：运行时读 `CF_ZONE_ID` + `CF_API_TOKEN`（部署写入 Pages secret）  
5. **产品详情 MISS**：enrich ∥ hreflang；去掉 FAQ 全表兜底  
6. **Cache Rule 操作说明**：`docs/CACHE_RULES.md`  

部署侧（`cizhenyu_deploy`）：

- Pages 写入 `CF_ZONE_ID`（plain）+ `CF_API_TOKEN`（secret_text）  
- `REVALIDATE_SECRET` 亦为 secret  

### 生产必做

1. 用 `cizhenyu_deploy` 重新部署前端（绑定域名时自动写 purge 凭证 + Cache Rules）  
2. 若提示 Cache Rules 权限不足：在「设置 → 边缘 HTML 缓存 · 权限」粘贴带 Cache Rules Edit 的 API Token（账户级一次），再到「前端站点」点「同步边缘缓存」  
3. 用 `cf-cache-status` + Function 调用量验收，不以 Worker 内 HIT 为完成标准  
