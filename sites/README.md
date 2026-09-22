# sites/ — 多前端站清单（平台通用，非某一客户专用）

每个可部署前端站一份 `site.manifest.json`。

| 站点 | theme | 默认 collectionNamespace | 说明 |
| --- | --- | --- | --- |
| [`demo`](./demo/site.manifest.json) | `default` | `b2b` | 本地联调 / 蓝系对照 |
| [`turmill`](./turmill/site.manifest.json) | `turmill` | 过渡 `b2b` → 上线改 `turmill` | 主题样例 |
| [`_template`](./_template/site.manifest.json) | `default` | `b2b` | 新建站拷贝模板 |

规范：[../docs/SITE_MANIFEST.md](../docs/SITE_MANIFEST.md)  
开站 / 多客户部署：`D:\ycz_me\objct\cizhenyu_create`

## 切换站点（本地）

1. 准备 `sites/<siteKey>/site.manifest.json`（`cms.collectionNamespace` = 内容 ns）
2. 注册进 [`src/modules/site/load-site.ts`](../src/modules/site/load-site.ts)
3. `.env` 设 `SITE_KEY=<siteKey>`（见 `.env.example`）
4. 确认 CMS 已导入对应 `{ns}-collections`（本地 demo 用 `b2b`）
5. `npm run dev`

约定：**SITE_KEY ≡ collectionNamespace ≡ CMS frontend_sites.siteKey**。  
跨客户换 `PUBLIC_CMS_API_BASE`；同客户多站只换 `SITE_KEY`。
