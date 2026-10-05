# default 主题种子（磁帧鱼）

导航：**首页 · 产品 · 帮助 · 下载 · 动态 · 关于 · 联系**

产品（3）：
1. 全能站群管理系统 + B2B 前端站点生成系统（`cizhenyu-sites`）
2. 智能客服智能询盘系统（`cizhenyu-inquiry`）
3. 部署运营获客系统（`cizhenyu-growth`）

约定：
- `collectionSlug` 为 `b2b_*`（deploy 注入改写为 `{siteKey}_*`）
- Logo 留空 → 前端闪电图标；CMS 上传可替换
- 下载 CTA → 联系/询盘（表单预留）
- 价格不公示，文案引导询盘

重新生成：

```bash
node src/ui/themes/default/seed/build-seed.mjs
```
