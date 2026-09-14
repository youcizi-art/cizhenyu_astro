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

- 阶段 A/B/C/D：**已对接真实 payload 种子数据并验收通过**（`accept:ab` / `accept:cd`）  
- 阶段 E（SEO/导航）与生产 CF CDN purge / webhook 仍待完成  
- 详细审查与排期见：**[docs/BUILD_PLAN.md](./docs/BUILD_PLAN.md)**  

成熟度（生产模板）：约 **6/10**（真实 CMS 可演示；SEO/主题/生产 CDN 仍差）。

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

# 终端 1：真实 CMS（cizhenyu_payload，已 seed）
# cd D:\ycz_me\cizhenyu_payload && npm run dev

# 终端 2：前端（.env 默认指向 http://127.0.0.1:5173）
npm run dev

# 终端 3：出口验收
npm run accept:ab
npm run accept:cd
```

对接说明：

- 默认对接本地 `cizhenyu_payload`（`:5173`）；语种与 CMS 一致：`zh-CN` / `zh-TW` / `ja` / `en-US`
- 回退 Mock：`PUBLIC_CMS_API_BASE=http://127.0.0.1:8787` + `npm run mock:cms`
- 生产 CDN purge：配置 `CF_ZONE_ID` + `CF_API_TOKEN`（见 `docs/CACHE_STRATEGY.md`）
