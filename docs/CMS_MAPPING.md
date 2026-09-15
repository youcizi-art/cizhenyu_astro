# CMS 集合映射（sites/b2b ↔ 前端）

真源：

- `D:\ycz_me\cizhenyu_payload\sites\b2b\b2b-collections.json`
- `D:\ycz_me\cizhenyu_payload\sites\b2b\b2b-models.json`

参考实现（旧 API）：`D:\ycz_me\models\czy_model\src\sdk\b2b\*`

公开 API 前缀：`{PUBLIC_CMS_API_BASE}/api/p`（或 `/v1/p`）

**路径规则（cizhenyu_payload）：**

```text
{action}/{groupPath}/{collectionSlug}
例：data/b2b/products/b2b_product
    data/b2b/settings/b2b_company_info/single
    submit/b2b/business/b2b_inquiry
```

`groupPath` 来自 collections JSON；导入 CMS 后须存在对应导航分组链（`b2b` → `content|products|…`）。

---

## 1. 集合总表

| SDK 模块名（建议） | collection.slug | modelSlug | groupPath | 展示 | 前端用途 |
| --- | --- | --- | --- | --- | --- |
| article | `b2b_article` | article | `b2b/content` | list | 文章列表/详情 |
| inquiry | `b2b_inquiry` | b2b_inquiry | `b2b/business` | list | 产品询盘 submit |
| product | `b2b_product` | b2b_product | `b2b/products` | list | 产品列表/详情 |
| caseStudy | `b2b_case_study` | case_study | `b2b/content` | list | 案例 |
| companyInfo | `b2b_company_info` | company_info | `b2b/settings` | **single_form** | About/Footer |
| contentBlock | `b2b_content_block` | content_block | `b2b/content` | list | 首页/Banner/CTA |
| contentCategory | `b2b_content_category` | content_category | `b2b/content` | list | 内容分类 |
| entity | `b2b_entity` | entity | `b2b/knowledge` | list | 实体/知识 |
| faq | `b2b_faq` | faq | `b2b/content` | list | FAQ |
| industry | `b2b_industry` | industry | `b2b/content` | list | 行业方案 |
| navigation (menu) | `b2b_nav_menu` | nav_menu | `b2b/settings` | list | 导航菜单 |
| navigation (item) | `b2b_nav_menu_item` | nav_menu_item | `b2b/settings` | list | 菜单项 |
| message | `b2b_online_message` | online_message | `b2b/business` | list | 在线留言 submit |
| page | `b2b_page` | page | `b2b/content` | list | 独立页 |
| productCategory | `b2b_product_category` | product_category | `b2b/products` | list | 产品分类 |
| productSpecTemplate | `b2b_product_spec_template` | product_spec_template | `b2b/products` | list | 规格模板 |
| resource | `b2b_resource` | resource | `b2b/content` | list | 资料下载 |
| taxonomy | `b2b_taxonomy` | taxonomy | `b2b/knowledge` | list | 语义标签 |
| translationFields | `b2b_translation_fields` | translation_fields | `b2b/settings` | **single_form** | 翻译字段配置 |

---

## 2. 公开 URL 速查

| SDK | GET list/detail | GET single | POST submit |
| --- | --- | --- | --- |
| product | `/data/b2b/products/b2b_product` | — | — |
| productCategory | `/data/b2b/products/b2b_product_category` | — | — |
| article | `/data/b2b/content/b2b_article` | — | — |
| caseStudy | `/data/b2b/content/b2b_case_study` | — | — |
| industry | `/data/b2b/content/b2b_industry` | — | — |
| faq | `/data/b2b/content/b2b_faq` | — | — |
| page | `/data/b2b/content/b2b_page` | — | — |
| contentBlock | `/data/b2b/content/b2b_content_block` | — | — |
| resource | `/data/b2b/content/b2b_resource` | — | — |
| companyInfo | — | `/data/b2b/settings/b2b_company_info/single` | — |
| translationFields | — | `/data/b2b/settings/b2b_translation_fields/single` | — |
| inquiry | — | — | `/submit/b2b/business/b2b_inquiry` |
| message | — | — | `/submit/b2b/business/b2b_online_message` |

详情：`/data/{groupPath}/{slug}/{entityUuid}`  
列表查询：`page`、`pageSize`、`locale`、`search`、`translationGroup`、`{field}`、`{field}_like`

---

## 3. 与旧前端参考的差异（勿混用）

旧 `czy_model` 使用另一套后端路径与响应形状，**本项目不要实现其客户端**。  
本项目只认：`groupPath/collectionSlug` + `{ status, msg, data }`。

---

## 4. 前端路由建议（多语言）

与参考项目一致，采用 `[...locale]/...`：

| 路由 | Loader 主数据 |
| --- | --- |
| `/[[...locale]]/` | contentBlock + 精选 product/article |
| `/[[...locale]]/products` | product.list |
| `/[[...locale]]/products/[id]` | product.detail（id 或 slug） |
| `/[[...locale]]/products/category/[slug]` | productCategory + filtered products |
| `/[[...locale]]/articles` | article.list |
| `/[[...locale]]/articles/[id]` | article.detail |
| `/[[...locale]]/case-studies` | caseStudy |
| `/[[...locale]]/solutions` | industry |
| `/[[...locale]]/faq` | faq |
| `/[[...locale]]/contact` | page + companyInfo；表单 → message/inquiry |
| `/[[...locale]]/about` | page / companyInfo |

具体 path 段可由导航 CMS 配置覆盖；默认表用于 AI 模板与主题约定。

---

## 5. 字段与契约

- 字段名以 `b2b-models.json` 为准（如 product: `title`、`slug`、`sku`、`cover`…；SEO 区 `_seo` 等扩展区按 CMS 输出）。
- 前端 `entityData()` 会把 `_seo` / `_schema` / `_geo` 扁平合并进业务字段，供 `readSeoFields` 读取。
- 组件 `data.ts`：CMS 行 → Contract props（图片 URL 解析、relation 展开）。
- relation / reference：优先用列表 `include`（若后端支持）或二次请求；逻辑放 SDK，不放 Theme。

模型变更流程：

```text
改 sites/b2b JSON → 导入 CMS → 跑 sync-b2b-catalog → 更新 SDK types / data.ts
```

---

## 6. 生成物（后续脚本）

`scripts/sync-b2b-catalog.mjs` 建议输出：

1. `src/sdk/catalog.ts` — 上表路径常量  
2. （可选）`src/sdk/b2b/_meta.json` — 供 AI 建站读取模块列表  
3. 校验：`groupPath`、`slug` 符合 API 路径字符规则  

人工不得在业务代码里硬编码第二份路径表。
