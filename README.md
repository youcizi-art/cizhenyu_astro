# cizhenyu_astro · B2B 站群前端（对接 cizhenyu_payload）

本仓库是 **`cizhenyu_payload` 的 B2B 类站点对接模板**：独立新建，可实例化多个 B2B 站。

| 角色 | 路径 |
| --- | --- |
| CMS 后端 | `D:\ycz_me\cizhenyu_payload` |
| B2B 模型真源 | `D:\ycz_me\cizhenyu_payload\sites\b2b\*.json` |
| 本前端 | `D:\ycz_me\models\cizhenyu_astro` |
| 能力参考（非迁移源） | `D:\ycz_me\models\czy_model` |

编码遵循 [AGENTS.md](./AGENTS.md)。

---

## 当前真实状态（请先读）

**本仓库目前是半成品脚手架，不能当作可用 B2B 模板。**

- 阶段 A/B：**Mock 出口已勾选**（`accept:ab`）  
- 阶段 C/D：**实现已落地**，以 `accept:cd` 勾选（页面深度 + 可观测 HTML purge）  
- 阶段 E（SEO/导航）与真实 payload / CF CDN purge 仍待完成  
- 详细审查与排期见：**[docs/BUILD_PLAN.md](./docs/BUILD_PLAN.md)**  

成熟度（生产模板）：约 **5/10**（Mock 可演示核心页与缓存失效；SEO/主题/真实 CDN 仍差）。

---

## 目标

1. 多站点：`sites/<siteKey>/site.manifest.json`  
2. 对接 payload 公开 API  
3. 免费档约 1 万日 UV（Pages HTML 缓存为主）  
4. 后续 AI 一键建站  

---

## 文档

| 文档 | 内容 |
| --- | --- |
| **[docs/BUILD_PLAN.md](./docs/BUILD_PLAN.md)** | **审查结论 + 分阶段构建计划（必读）** |
| [docs/FRONTEND_PLATFORM.md](./docs/FRONTEND_PLATFORM.md) | 总方案（实现以 BUILD_PLAN 为准） |
| [docs/CACHE_STRATEGY.md](./docs/CACHE_STRATEGY.md) | 缓存目标（实现未完成） |
| [docs/CMS_MAPPING.md](./docs/CMS_MAPPING.md) | 集合路径 |
| [docs/BACKEND_INTEGRATION.md](./docs/BACKEND_INTEGRATION.md) | API 契约 |
| [docs/REFERENCE_NOTES.md](./docs/REFERENCE_NOTES.md) | 参考项目说明 |

---

## 开发命令

```bash
cp .env.example .env
npm install
npm run sync:catalog
npm run test

# 终端 1：Mock CMS（契约对齐 /api/p，数据对齐 sites/b2b）
npm run mock:cms

# 终端 2：前端（.env 默认指向 http://127.0.0.1:8787）
npm run dev

# 终端 3：出口验收
npm run accept:ab
npm run accept:cd
```

对接真实 `cizhenyu_payload`：只改 `.env` 的 `PUBLIC_CMS_API_BASE`，再跑验收脚本。  
生产 CDN purge：配置 `CF_ZONE_ID` + `CF_API_TOKEN`（见 `docs/CACHE_STRATEGY.md`）。  
注意真实后端语种可能是 `en-US`（非 `en`），需与 `sites/<site>/site.manifest.json` 的 `locales` 对齐。
