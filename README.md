# cizhenyu_astro · B2B 站群前端（对接 cizhenyu_payload）

本仓库是 **`cizhenyu_payload` 的 B2B 类站点对接项目**：新建通用 Astro 平台，可实例化多个 B2B 站，并支持后续 AI 一键建站。

| 角色 | 路径 |
| --- | --- |
| CMS 后端 | `D:\ycz_me\cizhenyu_payload` |
| B2B 模型真源 | `D:\ycz_me\cizhenyu_payload\sites\b2b\*.json` |
| 本前端 | `D:\ycz_me\models\cizhenyu_astro` |
| 设计参考（非依赖、非迁移源） | `D:\ycz_me\models\czy_model`（旧 `cizhenyu` 前端，仅可参考交互/信息架构） |

**不是** `czy_model` 的迁移或 fork。后端与公开 API 均以 `cizhenyu_payload` 为准。编码遵循根目录 [AGENTS.md](./AGENTS.md)。

---

## 目标

1. 多站点：`sites/<siteKey>/site.manifest.json` 实例化  
2. 对接 payload 公开 API（分组路径 + 信封）  
3. 免费档约 1 万日 UV：页面缓存在 Pages，CMS 发变更通知  
4. 后续 AI 一键建站（manifest + 种子，不生成乱结构）

---

## 代码结构（对齐 AGENTS.md）

```text
src/
├── modules/          # 业务模块（cms / product / site …）
├── workflows/        # 跨模块页面组装
├── ui/               # 布局与展示组件
└── pages/            # Astro 路由薄壳（框架要求）
sites/                # 站点清单实例
docs/                 # 对接与缓存说明
scripts/              # catalog 同步等
```

---

## 文档

| 文档 | 内容 |
| --- | --- |
| [docs/FRONTEND_PLATFORM.md](./docs/FRONTEND_PLATFORM.md) | 总方案 |
| [docs/SITE_MANIFEST.md](./docs/SITE_MANIFEST.md) | 站点清单 |
| [docs/CMS_MAPPING.md](./docs/CMS_MAPPING.md) | 集合 ↔ 路径 |
| [docs/CACHE_STRATEGY.md](./docs/CACHE_STRATEGY.md) | 缓存与 UV |
| [docs/REVALIDATE_MAP.md](./docs/REVALIDATE_MAP.md) | 失效映射 |
| [docs/BACKEND_INTEGRATION.md](./docs/BACKEND_INTEGRATION.md) | API 契约 |
| [docs/AI_ONE_CLICK.md](./docs/AI_ONE_CLICK.md) | AI 建站 |
| [docs/REFERENCE_NOTES.md](./docs/REFERENCE_NOTES.md) | 参考项目说明（非迁移） |

---

## 开发命令

```bash
cp .env.example .env
npm install
npm run sync:catalog
npm run test
npm run dev
```

- 默认 `SITE_KEY=demo`（`sites/demo/site.manifest.json`）
- 路由（均在 `/[locale]/...`）：products、articles、case-studies、solutions、faq、resources、about、contact
- 询盘/留言表单暂未接入（Contact 仅展示公司联系方式）
- 失效：`POST /api/revalidate`
- `PUBLIC_CMS_API_BASE` 指向可访问的 `cizhenyu_payload` API 域名
