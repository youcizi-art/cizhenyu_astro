# AI 一键建站方案

> 状态：设计文档。依赖平台 P1～P4 骨架与 CMS 导入能力就绪后再实现脚本。

目标：输入品牌与行业意图 → 产出**可部署的站点清单 + 主题选择 + CMS 种子内容**，而不是生成不可维护的整站乱代码。

---

## 1. 边界

| AI 可以做 | AI 禁止做 |
| --- | --- |
| 写/改 `site.manifest.json` | 发明不存在的 CMS 字段 |
| 选已有 `theme` | 绕过 Page/Component Contract |
| 生成种子 JSON（公司、导航、首页区块、样例产品） | 把每页改成直接 `fetch` 杂乱字段 |
| 建议 `modules` 开关 | 把常态 HTML TTL 设低于 24h |
| 输出主题 token（主色、圆角） | Fork 出第二套 API SDK |

模型与集合 schema **只读**自：

`cizhenyu_payload/sites/b2b/b2b-models.json`  
`cizhenyu_payload/sites/b2b/b2b-collections.json`

---

## 2. 输入（Build Brief）

```jsonc
{
  "siteKey": "acme",
  "displayName": "Acme Industrial",
  "industry": "industrial-machinery",
  "locales": ["en", "zh-CN"],
  "defaultLocale": "en",
  "theme": "turmill",          // 或 "auto"
  "modules": {
    "products": true,
    "articles": true,
    "caseStudies": true,
    "solutions": true,
    "faq": true,
    "resources": false,
    "about": true,
    "contact": true
  },
  "cms": {
    "apiBase": "https://api.example.com"
  },
  "brand": {
    "tagline": "Precision for global buyers",
    "primaryColor": "#0B3D91"
  },
  "seed": {
    "productCount": 5,
    "articleCount": 3
  }
}
```

---

## 3. 流水线

```text
Brief
  │
  ├─① validate-brief      对照 modules 白名单、locale、theme 列表
  ├─② emit-manifest       → sites/<siteKey>/site.manifest.json
  ├─③ emit-seed           → sites/<siteKey>/seed/*.json（按 b2b 字段）
  ├─④ import-seed         → 调 CMS 管理导入 / 批量 API（后端就绪后）
  ├─⑤ register-hook       → 把 hooks.revalidateUrl 写回 CMS 站点配置
  ├─⑥ deploy-pages        → 设置 SITE_KEY / secrets，触发部署
  └─⑦ smoke               → 首页、产品列表、company single、inquiry options
```

脚本目录（预留）：`scripts/ai/`

| 脚本 | 职责 |
| --- | --- |
| `validate-brief.mjs` | 校验 Brief |
| `emit-manifest.mjs` | Brief → manifest |
| `emit-seed.mjs` | LLM 或模板 → 种子（字段必须 ∈ models.json） |
| `import-seed.mjs` | 推送到 CMS |
| `smoke.mjs` | HTTP 冒烟 |

---

## 4. 种子内容最小集

按 `CMS_MAPPING.md` 集合写入（字段名与 models 一致）：

1. `b2b_company_info`（single）— 名称、地址、联系方式  
2. `b2b_nav_menu` + `b2b_nav_menu_item` — Header 基础链  
3. `b2b_content_block` — 首页 Hero / CTA 各至少 1  
4. `b2b_product` × N — 含 `title`、`slug`、封面（可占位图）  
5. 可选：`b2b_page` about/contact、`b2b_faq` 3 条  

种子 JSON 示例形状（示意）：

```json
{
  "collection": "b2b_product",
  "locale": "en",
  "data": {
    "title": "Hydraulic Press HP-200",
    "slug": "hydraulic-press-hp-200",
    "sku": "HP-200",
    "summary": "..."
  }
}
```

---

## 5. 主题与视觉

- `theme: "auto"` → 按行业映射表选预设（如 industrial → `turmill`）。  
- `brand.primaryColor` → 写入主题 CSS 变量文件（如 `themes/<name>/tokens.generated.css`），**不**改组件结构。  
- 无合适主题时失败并提示「仅可从已有主题选择」，不自动生成第三套布局体系。

---

## 6. 缓存相关默认

AI 写出的 manifest 必须：

- `cache.revalidateSeconds` ≥ 86400（默认/建议 `172800` = 48h）——这是**常态长缓存**  
- 内容新鲜度靠部署后的 `hooks.revalidateUrl` = `https://{站点域}/api/revalidate`（CMS 增删改时 purge）  
- **禁止**用 60～300 秒短 TTL 冒充更新策略  

与 [CACHE_STRATEGY.md](./CACHE_STRATEGY.md) 一致。

---

## 7. 验收

- [ ] `sites/<siteKey>/site.manifest.json` 通过校验  
- [ ] 种子字段均可在对应 model 中找到  
- [ ] 部署后首页 200、产品列表非空（若 seed 成功）  
- [ ] 未出现旧路径 `/api/v1/p/b2b/data/product`  
- [ ] 未新增游离「AI 专用」页面绕过 Contract  

---

## 8. 实现优先级

在 **P4 多站点清单** 跑通之后再做本流水线；P1～P3 用手工 manifest + 手工内容即可。
