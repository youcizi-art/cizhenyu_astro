# default 主题种子（磁帧鱼）

格式对齐 turmill / `cizhenyu_payload` b2b data：

- `collectionSlug` 恒为 `b2b_*`（deploy 注入时改写为 `{siteKey}_*`）
- `items[].languageGroupKey` + `locales`
- 关联用 `__BY_SLUG__:b2b_collection:slug`

## 内容说明

- **产品**：5 个真实模块（后台 / 展示站 / 部署 / 询盘中台 / Agent）
- **文章**：SEO 选题占位，正文标注「占位」
- **导航**：首页 · 产品 · 解决方案 · 资源 · 关于 · 询盘（对齐 ycz.me 信息架构）
- **价格**：文案引导询盘，不写套餐价

重新生成：

```bash
node src/ui/themes/default/seed/build-seed.mjs
```
