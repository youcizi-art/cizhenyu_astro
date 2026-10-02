# 站点清单（site.manifest）规范

每个可部署 B2B 站对应一份清单：`sites/<siteKey>/site.manifest.json`。  
构建 / 预览 / 部署时通过环境变量 `SITE_KEY` 选中该站。

模板见：[`../sites/_template/site.manifest.json`](../sites/_template/site.manifest.json)

---

## 1. 字段说明

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `siteKey` | string | 是 | 小写短横线或下划线；与目录名一致 |
| `displayName` | string | 是 | 后台/文档展示名 |
| `theme` | string | 是 | `src/themes/<theme>` 已有主题 id |
| `defaultLocale` | string | 是 | 默认语种，如 `en`、`zh-CN` |
| `locales` | string[] | 是 | 启用语种；须含 `defaultLocale` |
| `modules` | object | 是 | 功能开关，见下表 |
| `cms.apiBase` | string | 是 | 含协议，无尾斜杠 |
| `cms.apiPrefix` | string | 否 | 默认 `/api/p` |
| `cms.collectionNamespace` | string | 否 | 默认 `b2b`（与 collections 前缀一致） |
| `cache.revalidateSeconds` | number | 否 | **常态 HTML 长缓存秒数**；默认 `172800`（48h），最低 `86400`（24h）。内容新鲜度靠 CMS webhook purge，不靠短 TTL |
| `cache.revalidateSecretEnv` | string | 否 | 读环境变量名，默认 `REVALIDATE_SECRET` |
| `hooks.revalidateUrl` | string | 否 | 完整 URL；供 CMS webhook；本地可空 |
| `brand` | object | 否 | 色板/口号等，供主题 token，不替代 CMS 公司信息 |
| `domains` | object | 否 | 文档与部署备注用 |

### modules 开关

与路由 / loader 对齐（`false` 则不注册路由、不拉数）：

| key | 对应能力 |
| --- | --- |
| `products` | 产品列表/详情/分类 |
| `articles` | 文章 |
| `caseStudies` | 案例 |
| `solutions` | 行业方案（industry） |
| `faq` | FAQ |
| `resources` | 资料下载 |
| `about` | About（可用 page/companyInfo） |
| `contact` | Contact + 留言/询盘入口 |

询盘 submit 随 `products` / `contact` 开启，不单独占模块也可在 P1 写死可用。

---

## 2. 环境变量覆盖

清单里的 `cms.apiBase` 可被部署环境覆盖（密钥与多环境）：

| 环境变量 | 覆盖 |
| --- | --- |
| `SITE_KEY` | 选哪份 manifest |
| `PUBLIC_CMS_API_BASE` | `cms.apiBase` |
| `PUBLIC_CMS_API_PREFIX` | `cms.apiPrefix` |
| `REVALIDATE_SECRET` | revalidate 校验 |
| `PUBLIC_SITE_URL` |  canonical / 语言切换绝对链 |

原则：**密钥只进环境变量**；manifest 可进仓库（不含 secret 明文）。

---

## 3. 多站部署形态

| 形态 | 做法 |
| --- | --- |
| 一客一 CMS + 一站一 Pages（推荐） | 客户独立 Worker/D1；每前端域固定 `SITE_KEY` + `collectionNamespace` |
| 同客户多站 | 同一 `PUBLIC_CMS_API_BASE`，不同 `SITE_KEY` / ns |
| 单项目多配置 | 不同 preview/branch 打不同 `SITE_KEY`（慎用） |

开站与部署产物：`D:\ycz_me\objct\cizhenyu_create`（tenant.json → collections / pages.env / manifest）。

同一 `apiBase` 可服务多站；内容隔离靠 **ns（collectionNamespace）** 与 CMS 导航分组，不靠改模型。

---

## 4. 校验规则（脚本落地时）

- `siteKey` ∈ `^[a-z][a-z0-9_-]{0,31}$`
- `theme` 目录存在
- `locales` 含 `defaultLocale`
- `revalidateSeconds` ≥ `86400`（24h；默认/建议 `172800`）。低于下限时实现侧会抬到 24h
- `modules` 未知 key 报错（防 AI 乱造）

---

## 5. 与 AI 建站

AI 主要输出 / 修改本文件 + 可选 `brand`；不直接改 Theme 源码结构。见 [AI_ONE_CLICK.md](./AI_ONE_CLICK.md)。
