# sites/

多 B2B 站点实例目录。每个子目录一份 `site.manifest.json`。

| 站点 | 说明 |
| --- | --- |
| [`demo`](./demo/site.manifest.json) | 蓝系 `theme: default`，联调对照 |
| [`turmill`](./turmill/site.manifest.json) | 客户站绿系 `theme: turmill`（内容仍用 CMS b2b 测试数据） |
| [`_template`](./_template/site.manifest.json) | 新建站点拷贝模板 |

规范：[../docs/SITE_MANIFEST.md](../docs/SITE_MANIFEST.md)

## 切换站点

1. 在 `sites/<siteKey>/` 写好 `site.manifest.json`
2. 把站点注册进 [`src/modules/site/load-site.ts`](../src/modules/site/load-site.ts) 的 `registry`
3. 设置环境变量 `SITE_KEY=<siteKey>`（见 `.env.example`）
4. 重启 `npm run dev`

本地默认示例：`SITE_KEY=turmill`。切回蓝皮肤：`SITE_KEY=demo`。

主题皮肤在 `src/ui/themes/<theme>/tokens.css`，由 `manifest.theme` 映射；`brand.primaryColor` 可覆盖 `--accent`。
