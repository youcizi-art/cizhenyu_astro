# schemas/

本目录预留给「从 CMS 模型同步到前端」的生成物或说明。

**真源请勿分叉，以 payload 仓库为准：**

- `D:\ycz_me\cizhenyu_payload\sites\b2b\b2b-collections.json`
- `D:\ycz_me\cizhenyu_payload\sites\b2b\b2b-models.json`

映射与公开路径见：`docs/CMS_MAPPING.md`。

落地代码后，由 `scripts/sync-b2b-catalog.mjs` 读取上述 JSON，生成 `src/sdk/catalog.ts`。
