# turmill 交付种子

格式对齐 `cizhenyu_payload/sites/b2b/data`：

- `collectionSlug` 恒为 `b2b_*`（deploy 注入时改写为 `{siteKey}_*`）
- `items[].languageGroupKey` + `locales`
- 关联用 `__BY_SLUG__:b2b_collection:slug`

`seed.manifest.json` 的 `seedOrder` / `requiredByModule` 控制注入范围。
厂商 `pack-theme` 会把本目录打入 theme zip 的 `seed/`。
