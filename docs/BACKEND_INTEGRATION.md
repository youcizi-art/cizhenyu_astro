# 公开 API 对接说明（cizhenyu_payload）

面向 `cizhenyu_astro`。缓存策略以 [CACHE_STRATEGY.md](./CACHE_STRATEGY.md) 为准（**页面缓存在 Pages，本文件只描述 API 契约**）。

集合路径真源：[CMS_MAPPING.md](./CMS_MAPPING.md) ← `sites/b2b/*.json`。

---

## 1. 域名

| 槽位 | 用途 | 前端 |
| --- | --- | --- |
| `api_domain` | `/api/p`、`/v1/p` | `PUBLIC_CMS_API_BASE` |
| `member_domain` | 会员 | 不进公开 HTML 长缓存 |
| `admin_domain` | 后台 | 前端不调用 |
| 媒体域 | R2/图片 | 字段内 URL 或 `PUBLIC_MEDIA_BASE` |

```bash
PUBLIC_CMS_API_BASE=https://api.example.com
PUBLIC_CMS_API_PREFIX=/api/p
SITE_KEY=acme
REVALIDATE_SECRET=...
```

---

## 2. 基路径

- `https://{api_domain}/api/p`
- `https://{api_domain}/v1/p`（等价，建议统一 `/api/p`）

### 端点

| 方法 | 路径 | 缓存（API 层） |
| --- | --- | --- |
| `GET` | `/schema/{collectionPath}` | 可短缓存 |
| `GET` | `/data/{collectionPath}` | 可短缓存 |
| `GET` | `/data/{collectionPath}/{uuid}` | 可短缓存 |
| `GET` | `/data/{collectionPath}/single` | 可短缓存 |
| `POST` | `/submit/{collectionPath}` | **禁止** |
| `GET` | `/languages` | 短缓存 |
| `GET` | `/translations?locale=` | 视场景 |

`{collectionPath}` = `groupPath/collectionSlug`，例如 `b2b/products/b2b_product`。  
**不是**旧版 `/b2b/data/product` 短路径。

---

## 3. 响应信封

```ts
type PublicEnvelope<T> = {
  status: number;
  msg: string;
  data: T | null;
};
```

列表：

```ts
{
  list: Array<Record<string, unknown>>;
  pages: { total: number; page: number; pageSize: number; totalPages: number };
  path: string;
}
```

SDK 必须解包 `data`；不要假设 `czy_model` 旧响应根级 `list`。

---

## 4. 列表查询

| 参数 | 说明 |
| --- | --- |
| `page` | 从 1 |
| `pageSize` / `limit` | 默认 20，最大 100 |
| `search` | JSON 全文模糊 |
| `locale` | 语种 |
| `translationGroup` | 同文多语组（兼 `languageGroupKey`） |
| `{field}` | 精确 |
| `{field}_like` | 包含 |

示例：

```http
GET /api/p/data/b2b/products/b2b_product?locale=en&page=1&pageSize=12
GET /api/p/data/b2b/products/b2b_product?slug=widget-x
GET /api/p/data/b2b/settings/b2b_company_info/single?locale=en
POST /api/p/submit/b2b/business/b2b_inquiry
```

---

## 5. CORS 与调用位置

- **SSR（推荐）**：Astro 服务端 `fetch` API，不受浏览器 CORS 限制。  
- **浏览器直打**：仅 submit / 少量客户端交互；集合策略需放行站点 Origin。  
- 站群主路径：**页面在 Pages 缓存，SSR 回源时再打 API**。

---

## 6. 变更通知（前端依赖）

CMS 写入成功后应通知站点（后端待实现，契约先定）：

```http
POST {hooks.revalidateUrl}
Content-Type: application/json

{
  "secret": "<REVALIDATE_SECRET>",
  "siteKey": "acme",
  "collections": ["b2b_product"],
  "paths": []
}
```

前端 `/api/revalidate` 校验 secret 后失效对应 ISR 路径。  
详情与容量：[CACHE_STRATEGY.md](./CACHE_STRATEGY.md)。

---

## 7. 联调清单

- [ ] `GET /api/p/languages`
- [ ] `GET /api/p/schema/b2b/products/b2b_product`
- [ ] `GET /api/p/data/b2b/products/b2b_product?locale=`
- [ ] `GET .../b2b_company_info/single`
- [ ] `POST .../b2b_inquiry`
- [ ] 发布后 webhook 或 ISR 窗口内页面更新
- [ ] Worker 日请求显著低于页面 PV

---

## 8. 变更同步

后端公开契约或 `sites/b2b` 集合路径变更时：更新 `CMS_MAPPING.md`，重新生成 `catalog`，删除前端旧路径假设。
