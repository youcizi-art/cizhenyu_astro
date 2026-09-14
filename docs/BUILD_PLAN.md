# cizhenyu_astro 全面审查与构建计划

> 状态：**纠偏文档**（2026-09-13）  
> 立场：本仓库是 `cizhenyu_payload` 的 **B2B 前端模板**，独立新建。  
> `czy_model` **仅作能力参考**，不是迁移源，禁止复制其旧 API client。  
> 此前「P1 完成 / 路由已齐」等表述 **高估了可用性**；以本文为准重新排期。

---

## 0. 结论（先说清楚）

| 维度 | 判断 |
| --- | --- |
| 作为「可演示的空壳路由」 | 有一部分页面文件 |
| 作为「可联调的 CMS 对接模板」 | **基本不可用** |
| 作为「可商用 B2B 站群模板」 | **远未达到** |
| 相对 `czy_model` 能力面 | 约 **10%～20%**（有骨架无深度） |
| 诚实成熟度 | **生产模板 2/10**；脚手架 3～4/10 |

用户指出的问题成立：多语言不可用、非首页易失效/报错、接口对接脆弱、缓存策略未落地、整体像敷衍式铺路由。

**后续禁止再用「路由文件存在 = 功能完成」作为完成标准。**  
完成标准改为：**联调可演示 + 无控制台/页面级致命错误 + 文档验收项勾选**。

---

## 1. 目标回顾（不变）

1. 对接 `cizhenyu_payload` 公开 API（`/api/p` + 信封 + `sites/b2b` 集合路径）  
2. 一套模板 → 多 B2B 站（manifest）  
3. 免费档约 **1 万日 UV**：HTML 缓存在 Pages，CMS 只做回源与 submit  
4. 后续 AI 一键建站（manifest + 种子，不生成乱结构）  
5. 询盘/留言表单：**本阶段仍后置**（能力记在计划里，不排进近期冲刺）

编码遵循本仓 `AGENTS.md`（`modules` / `workflows` / `ui`）。

---

## 2. 现状审计（对照事实）

### 2.1 已有（仅这些算「有」）

- 目录分层：`modules` / `workflows` / `pages` / `ui`  
- catalog 从 `b2b-collections.json` 生成  
- CMS client：基址 + 信封解包 + list/detail/single/submit（submit 未接 UI）  
- 若干列表/详情路由文件（products / articles / case-studies / solutions / faq / resources / about / contact）  
- site.manifest（demo）+ revalidate **路径映射表** + 极少量单测  
- 文档方案较完整（目标对，实现严重滞后）

### 2.2 致命缺陷（解释「为什么几乎不可用」）

| # | 问题 | 影响 |
| --- | --- | --- |
| 1 | **无真正 i18n**：无 LanguageSwitcher；`html lang` 写死 `en`；不调 `/languages`；locale 不跟 CMS 对齐；非法 locale 多数页静默回退 | 「多语言切换不可用」 |
| 2 | **默认语种路由混乱**：`/` 与 `/{locale}` 双首页且内容不一致；非默认语种规则未定义清楚 | SEO/切换/缓存键混乱 |
| 3 | **API 对接脆弱**：公司/区块失败被吞成空；列表页无统一错误边界 → 易 500；无 request 去重；产品字段与模型错位（如 cover vs images） | 「除首页外几乎不可用 / 对接失效」 |
| 4 | **详情深度不够**：产品详情几乎只有标题摘要；无图库、规格、分类、关联；资源无下载文件字段 | 不像 B2B 站 |
| 5 | **缓存策略未落地**：`output: 'server'` + 仅写 `Cache-Control`；`/api/revalidate` **只返回 paths，不失效任何缓存** | 无法兑现 1 万 UV 方案 |
| 6 | **无 Page Contract / Theme**：页面直接拼 UI；无主题体系；brand/token 未用 | 与参考项目能力差一个数量级 |
| 7 | **无 SEO 体系**：无 hreflang/canonical/OG/JSON-LD/sitemap/robots | 不能上线 |
| 8 | **无 CMS 导航**：硬编码英文 nav；catalog 里的 nav 集合未用 | 站群不可配置 |
| 9 | **无媒体管线**：图片/富文本 URL 不解析 | 内容区大量空白或坏链 |
| 10 | **无统一联调验收**：未对真实 payload 跑通冒烟；测试几乎只测纯函数 | 「看起来有代码」≠「能打开」 |

### 2.3 与 `czy_model` 的能力差距（只比能力，不迁移）

参考仓具备、本仓基本没有或极弱：

| 能力面 | czy_model | cizhenyu_astro 现状 |
| --- | --- | --- |
| bootstrap(pathname) + 语种解析 | 有 | 无 |
| 语言切换 + 详情跨语种 URL | 有 | 无 |
| 翻译三层兜底 | 有 | 无 |
| Page Contract + Loader | 有（12 页完整） | 无（workflow 薄、无契约） |
| 可切换 Theme | 有 | 无 |
| SEOHead + sitemap/robots | 有 | 无 |
| requestCache / chrome TTL | 有 | 无 |
| 媒体 URL / 富文本改写 | 有 | 无 |
| 产品分类路由 | 有 | 无 |
| 首页区块完整组装 | 强 | 极弱 |
| 询盘表单 | 有 | **刻意后置** |

**正确用法**：对齐上表「能力面」；API、字段、模块结构按 payload + AGENTS.md 重做。

### 2.4 关于 `output: 'server'` 与缓存策略

约定策略：

```text
访客 → Pages HTML 命中（不执行重逻辑 / 不打 CMS）
     → miss → SSR 拉 CMS → 写入边缘缓存
发布 → webhook → /api/revalidate → 真正失效路径
```

当前：

- `server` + 全站 `prerender=false` = **默认每次都可能跑 SSR Function**  
- 只设 `s-maxage` **不等于**已实现「命中不跑函数 / 可 purge」  
- revalidate **空转**  

因此：**在现有实现下，无法声称已支持讨论过的 1 万 UV 缓存方案。**  
构建计划里必须单独立项「缓存可验收」，否则后面所有页面做得再多也会在配额上失败。

---

## 3. 完成定义（Definition of Done）

每一阶段结束必须同时满足：

1. **联调**：指向真实/本地 `cizhenyu_payload`，关键页 200，有真实数据或明确空态文案（不是白屏/500）  
2. **无静默假成功**：API 失败有统一错误区或错误页，不靠 catch→空数组伪装正常  
3. **i18n 可点**：至少 2 个 locale 能切换，切换后 URL 与内容 locale 一致  
4. **缓存可测**：给出「如何验证 HTML 命中 / 失效」的步骤；revalidate 必须产生可观测失效效果  
5. **文档勾选**：本文件对应阶段 checklist 全部勾完才算完成  

---

## 4. 架构原则（纠偏后）

```text
pages（薄路由）
  → workflows（页面组装 / Page 级契约数据）
    → modules（cms / product / i18n / media / …）
  → ui（布局、区块、主题皮肤）
```

- **先打通「可运行垂直切片」**，再铺模块宽度（禁止再无验收地批量加路由）  
- 契约数据形状可参考 czy_model 的「页面 props 稳定」，但类型与字段映射必须来自 `sites/b2b`  
- 主题：先做一个 `default` 可用主题；切换机制可第二阶段再加  

---

## 5. 分阶段构建计划

### 阶段 A — 止血与联调基线（最高优先）

**目标**：本地 `npm run dev` + 真实 API，首页与产品列表/详情可稳定打开。

| 任务 | 说明 |
| --- | --- |
| A1 统一 CMS 错误策略 | 区分「无数据」与「请求失败」；列表/详情统一错误 UI |
| A2 实体字段对齐 | 按 `b2b-models.json` 修正 product/article 等映射（images、description、status=published 过滤等） |
| A3 媒体解析最小集 | `resolveMediaUrl`：封面/Logo/富文本 src |
| A4 请求去重 | 同一次 SSR 内 GET 去重（chrome + 业务） |
| A5 路由收敛 | `/` 与默认 locale 规则定死（建议：默认语种可无前缀或统一重定向，二选一写进文档并实现） |
| A6 冒烟脚本 | 对 `/`、`/{locale}/products`、详情、about 做 HTTP 冒烟 |

**出口**：产品列表有数据或明确空态；详情能显示图+正文；API 挂掉时页面有错误提示而非假空。

**A5 已定路由规则**：统一 `/{locale}/...`；`/` 302 → `/{defaultLocale}`；非法 locale 302 → 默认语种对应路径。

---

### 阶段 B — 多语言真正可用

| 任务 | 说明 |
| --- | --- |
| B1 bootstrap | 拉 `/languages`，解析 pathname → currentLocale / isDefault / isActive |
| B2 LanguageSwitcher | Header 可切换；列表用 path 替换；详情尽量按 translationGroup（后端字段具备时） |
| B3 `html lang` / hreflang 基础 | BaseLayout 使用真实 locale；首页与列表输出 alternates |
| B4 文案 | 导航与空态不再写死纯英文；最小 i18n 字典或 CMS translations |
| B5 非法 locale | 统一 404 或 302，禁止静默错显 |

**出口**：两个语种来回切换无报错；URL 与内容 locale 一致。

---

### 阶段 C — 页面深度（B2B 最小可用集）

优先顺序（宽度服从深度）：

1. **Home**（hero/content_block + 精选产品/文章）  
2. **Product list/detail**（图库、描述、规格若有、基础 SEO）  
3. **About / Contact**（公司信息完整；Contact **仍不做表单**，只展示联系方式）  
4. **Article list/detail**  
5. **Case study / Solutions / FAQ**（达到可读详情，再谈展示组件美化）  
6. **Resources**（含下载字段）  
7. **分类路由**（product_category / content_category）  

每页要求：

- workflow 输出稳定「页面数据对象」（可视为轻量 Page Contract）  
- SEO：title/description 至少读 CMS seo 字段  
- 分页 UI（有 pages 时）  
- 空态 / 404  

**出口**：对照 `czy_model` 的 12 页业务面，核心 5 页（Home/Product/Article/About/Contact）达到「可演示给客户看内容」的深度。

---

### 阶段 D — 缓存策略可验收（与 UV 目标绑定）

必须单独做技术选型并写进验收，禁止只加响应头。

| 方案选项 | 说明 | 适用 |
| --- | --- | --- |
| D-opt1 | 升级 Cloudflare adapter，使用官方 **缓存/失效 API**（若版本支持且可 purge） | 优先调研 |
| D-opt2 | CDN Cache-Control + **Cache-Tag**，revalidate 调 CF purge API（需 token/zone） | 与 payload 站点配置协同 |
| D-opt3 | 混合：高频页预渲染/ISR；动态页短 TTL；chrome 短 TTL 内存缓存降 API 次数 | 兜底 |

强制交付：

1. `/api/revalidate` **真实失效**（或明确文档：当前平台限制 + 采用的替代方案）  
2. 压测/估算表：1 万 UV 下 Pages Function 与 CMS Worker 请求量级  
3. CMS webhook 契约联调（payload 侧可并行）  

**出口**：能演示「发布后路径在约定时间内变新」；能解释 UV 配额如何扛住。

---

### 阶段 E — SEO / 发现 / 导航配置化

- SEOHead（canonical、hreflang、OG、基础 JSON-LD）  
- `sitemap.xml` / `robots.txt`  
- CMS `nav_menu` / `nav_menu_item` 驱动 Header（失败回退 manifest 模块链）  
- 404 页  

---

### 阶段 F — 主题与多站

- `ui/themes/default` 可用皮肤 + brand token（primaryColor）  
- 主题切换机制（可后于 default 可用）  
- site registry 自动发现 `sites/*`，校验脚本  
- 一站一 Pages 部署说明  

---

### 阶段 G — 后置（明确不做进近期）

- 询盘 / 在线留言表单与 submit  
- AI 一键建站流水线  
- 完整第二套营销主题  

---

## 6. 建议执行顺序（近期 4 个冲刺）

```text
Sprint 1：阶段 A（止血 + 产品垂直切片联调）
Sprint 2：阶段 B（多语言）+ Home/About 深度
Sprint 3：阶段 C 剩余核心页深度（Article/Case/Solutions/FAQ）
Sprint 4：阶段 D（缓存可验收）+ 阶段 E 基础 SEO
```

**每个 Sprint 结束只接受「可演示验收」，不接受「又加了一批路由文件」。**

---

## 7. 与后端（payload）的并行依赖

| 前端需要 | 后端状态 |
| --- | --- |
| 稳定 `/api/p/data/...` + 信封 | 已有，需用真实 b2b 数据联调 |
| `/languages` | 已有，前端未用 |
| 内容变更 webhook → revalidateUrl | **待做**（阶段 D 联调） |
| 公开 API 字段与 `sites/b2b` 一致 | 导入集合/模型后验收 |

---

## 8. 质量门禁（防止再次敷衍）

1. 新增路由前：先有 workflow 数据契约 + 至少一条联调记录  
2. 禁止 `catch { return null/[] }` 掩盖 CMS 故障（除非明确「可选区块」并打日志）  
3. 禁止宣称缓存完成，除非 revalidate 有可观测失效  
4. 对比参考项目时只谈能力清单，不复制旧 SDK  
5. `README` 进度必须链到本文阶段状态，不得写「已完成多语言/缓存」除非 checklist 勾完  

---

## 9. 当前阶段状态表

| 阶段 | 状态 |
| --- | --- |
| A 止血联调 | **真实 CMS 联调**：`PUBLIC_CMS_API_BASE` → payload `:5173`；Mock 仍可回退 |
| B 多语言 | **真实 CMS 语种对齐**：`zh-CN` / `zh-TW` / `ja` / `en-US` |
| C 页面深度 | **Mock + 真实种子均可演示**；`accept:cd` |
| D 缓存可验收 | **本地 HTML purge 已勾选**；生产 CF Zone Purge / CMS webhook 待配 |
| E SEO/导航 | **未完成**（仅有基础 hreflang + meta description；无 canonical/OG/sitemap/CMS nav） |
| F 主题多站 | **未完成** |
| G 询盘/AI | 后置 |

### 阶段 A checklist（实现侧）

- [x] A1–A6 代码落地（错误策略 / 字段媒体 / 去重 / 路由 / smoke）
- [x] Mock CMS 种子数据（`mock-cms/`，契约对齐 `/api/p` + `sites/b2b` 字段）
- [x] `npm run accept:ab` 出口验收（产品列表有数据、详情有图+正文）
- [x] 真实 `cizhenyu_payload` 地址联调（`PUBLIC_CMS_API_BASE=http://127.0.0.1:5173`）

### 阶段 B checklist（实现侧）

- [x] B1 bootstrap：`/languages` + pathname/param → currentLocale / isActive  
- [x] B2 LanguageSwitcher：Header 切换，path 前缀替换  
- [x] B3 `html lang` + alternate hreflang（首页与列表/详情）  
- [x] B4 导航与基础 UI 文案字典（`t()`）  
- [x] B5 非法 locale → 302 默认语种路径  
- [x] 出口验收（Mock）：两个语种来回切换无报错，URL 与内容 locale 一致（`npm run accept:ab`）  
- [x] 出口验收（真实 CMS）：语种 `zh-CN`/`zh-TW`/`ja`/`en-US` 对齐后 `accept:ab` 通过  

### 阶段 C checklist（实现侧）

- [x] Home：hero + 精选产品/文章（含封面）  
- [x] Product：图库、描述、`spec_data` 规格表、SEO  
- [x] About / Contact：公司信息完整展示（Contact 无表单）  
- [x] Article：封面 + 正文 + SEO + 分页 UI  
- [x] Case / Solutions / FAQ：可读详情 + 列表分页  
- [x] Resources：`download_file` / `file_format` 下载链  
- [ ] 分类路由（product_category / content_category）— 延后  
- [x] `npm run accept:cd` 出口勾选（Mock）  

### 阶段 D checklist（实现侧）

- [x] 选型：**D-opt3 本地/边缘 HTML cache** + **D-opt2 可选 CF Zone Purge**  
- [x] Middleware 缓存公开 HTML GET（`X-HTML-Cache: HIT|MISS`）  
- [x] `/api/revalidate` **真实删除**本地/Cache API 条目；有凭证时调 CF purge  
- [x] `GET /api/revalidate` 返回 `lastPurge` 供观测  
- [x] 容量估算已在 `CACHE_STRATEGY.md`  
- [ ] CMS webhook → revalidateUrl 联调（payload 侧）  
- [ ] 生产环境配置 `CF_ZONE_ID` + `CF_API_TOKEN` 后验证 CDN purge  

---

## 10. 下一步

1. **阶段 E**：SEOHead / sitemap / CMS nav / 404  
2. 真实 payload +（可选）`CF_ZONE_ID`/`CF_API_TOKEN` 后复跑验收  
3. CMS webhook → `hooks.revalidateUrl`（payload 侧）  
4. 分类路由按需再开  

不接受「又加了一批路由文件」作为进度。
