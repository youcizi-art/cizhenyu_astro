# Revalidate：集合 → 路径映射

CMS webhook / 管理端「刷新缓存」传入 `collections[]`（collection.slug）时，前端按本表失效路径前缀。  
所有路径含可选 `locale` 前缀（默认语种可无前缀，与路由实现一致时两边都清）。

---

## 1. 默认映射

| collection.slug | 建议失效 path 前缀（示意） |
| --- | --- |
| `b2b_product` | `/products`, `/products/*` |
| `b2b_product_category` | `/products`, `/products/category/*` |
| `b2b_article` | `/articles`, `/articles/*` |
| `b2b_case_study` | `/case-studies`, `/case-studies/*` |
| `b2b_industry` | `/solutions`, `/solutions/*` |
| `b2b_faq` | `/faq` |
| `b2b_page` | `/about`, `/contact`, 及 page.slug 对应路径 |
| `b2b_company_info` | `/`, `/about`, `/contact`（页脚/关于依赖） |
| `b2b_content_block` | `/` 及使用区块的列表顶 Ban 页 |
| `b2b_nav_menu` / `b2b_nav_menu_item` | `/` 与全站（或 `purge: chrome`） |
| `b2b_resource` | `/resources`, `/resources/*` |
| `b2b_inquiry` / `b2b_online_message` | **通常不失效公开页**（仅后台线索） |
| `b2b_translation_fields` | 全站或 chrome |

实现时可增加特殊指令：

```json
{ "collections": [], "paths": ["/*"], "purge": "all" }
```

导航 / 公司信息变更：优先 `purge: "chrome"` → 清所有已缓存页的公共头尾（若适配器不支持，则退化为更短 revalidate 或清 `/` + 主要列表）。

---

## 2. webhook 与本地手动

```http
POST /api/revalidate
Content-Type: application/json

{
  "secret": "…",
  "siteKey": "acme",
  "collections": ["b2b_product"],
  "paths": []
}
```

`paths` 非空时与 collections 解析结果**合并**去重。  
`siteKey` 必须与当前部署 `SITE_KEY` 一致，否则 403。

---

## 3. 落地注意

- Cloudflare Pages / Astro 适配器的 on-demand API 以实际适配器文档为准；本表只定**业务映射**。  
- 宁可多清（列表+首页）也不要只清详情导致列表仍旧。  
- 免费档不要求秒级全局一致；目标是 **有 hook 则尽快失效相关路径；无 hook 则保持长缓存直至 TTL（默认 48h）或手动刷新**。
