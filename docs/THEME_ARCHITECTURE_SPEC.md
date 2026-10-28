# 多主题多站点架构开发规范（Theme Architecture Spec）

> **所有参与本项目开发、修改与审查的 AI Agent 与开发者必须严格遵守本规范。**
> 
> 核心目标：**确保成千上万个公共及私密主题能够 100% 独立开发、物理隔离与无缝交付，严禁跨主题渗透与全局路由污染。**

---

## 一、核心心智模型：数据模型与表现层分离

本项目采用 **Headless CMS + 多主题独立渲染架构**：
- **公共底层（Core）**：
  - `src/modules/`：负责标准数据模型定义（`b2b_product`, `b2b_page`, `b2b_article` 等）及基础 API 通信，**严禁出现任何特定客户、特定站点、特定商业文案（如品牌名、价格套餐等）**。
  - `src/workflows/`：负责通用数据组装管道（`load-product`, `load-home`, `load-chrome` 等）。
  - `src/pages/[locale]/`：胶水路由层，负责语种拦截、缓存头和 SEO Alternates 协议，**只将数据分发给 `ThemeFrame` 和 `Active*` 组件**。
- **主题层（Themes）**：
  - `src/ui/themes/{themeId}/`：**每一个主题都是完全孤立的自包含宇宙**。拥有自己的页面模板、组件、CSS、文案甚至独立初始种子数据（`seed/`）。

---

## 二、四大红线禁令（Red Lines）

### 1. 严禁在公共层与分发层硬编码特定主题文案或业务逻辑
- **违规表现**：在 `ActiveProductDetail.astro`、`theme-ui.ts` 等全局文件中写死“某某产品采用 $599/$899/$1599 方案”、“某某品牌是外贸工厂”等特定文案。
- **正确规范**：公共分发层只能使用中立的标准多语言缺省词（如 `Specifications`、`Product Inquiry`）。任何带有特定站点商业模式或品牌色彩的内容，必须**完全收敛在对应主题目录（如 `src/ui/themes/{themeId}/`）内部**。

### 2. 严禁为具体单页创建物理路由目录
- **违规表现**：因为某个站点需要“隐私权政策”或“服务条款”，就在 `src/pages/[locale]/` 下新建 `privacy/index.astro` 或 `terms/index.astro` 目录。
- **正确规范**：所有单页均属于 `b2b_page` 数据模型。除内置全局保留入口（`products`, `articles`, `case-studies`, `solutions`, `resources`, `faq`, `about`, `contact`）外，**所有单页统一由 `src/pages/[locale]/[slug].astro` 动态通配承接**。
  - 站点 A 在 CMS 配置了 `terms`，即可访问 `/terms`；
  - 站点 B 没配置 `terms`，天然响应 404；
  - 站点 C 需要 `warranty`（保修），直接在 CMS 配置后前台即可响应 `/warranty`，**零工程代码改动**。

### 3. 严禁公共分发层将某具体主题作为唯一的硬编码 Fallback
- **违规表现**：
  ```astro
  // 严重违规！当私有主题没有该页面时，偷偷穿透渲染 default 主题，造成私有站点被严重污染！
  const Target = modules[`./${meta.id}/...`]?.default || modules['./default/...']?.default;
  ```
- **正确规范**：
  ```astro
  // 正确：只加载当前激活主题自身的模板
  const Target = modules[`./${meta.id}/...`]?.default;
  ```
  若当前主题未定制该模板，系统必须回退到**系统内置的纯语义化中立白模（`<article>`, `<details>` 等）**，绝不可跨越主题边界。

### 4. 严禁在运行态使用文件系统动态扫描
- **背景**：生产交付目标为 **Cloudflare Pages / Workers** 边缘环境，不支持 Node.js `fs` 文件系统 API。
- **正确规范**：
  - 本地多主题开发时：利用 Vite 编译期静态分析能力 `import.meta.glob('./*/PageShell.astro')` 建立路由树；
  - 生产单主题打包时：通过 `npm run pack:{themeId}` 在构建前硬化单主题常数，产物中**不应包含多余主题的代码与静态资产**。

---

## 三、新建/修改独立主题的标准作业规范（SOP）

当 AI Agent 或开发者需要为一个全新站点或特定客户开发新主题（例如 `theme-fashion`）时，**必须且仅能在 `src/ui/themes/{themeId}/` 目录下操作**：

```
src/ui/themes/theme-fashion/
├── theme.manifest.json       # 必须：主题元数据清单 { "id": "theme-fashion", "origin": "custom" }
├── PageShell.astro           # 必须：主题特有的 Header、Footer 布局框架
├── tokens.css                # 必须：主题专有设计令牌（CSS 变量）
├── theme.css                 # 必须：主题基础样式（必须使用 [data-theme='theme-fashion'] 作用域）
├── components/               # 可选：主题私有小组件（Hero, Feature 等）
├── pages/                    # 必须：当前主题的页面实现
│   ├── HomePage.astro        # 首页
│   ├── ProductListPage.astro # 产品列表页
│   ├── ProductDetailPage.astro # 产品详情页（可自由定义自身的排版与专属文案）
│   ├── ArticleListPage.astro # 文章列表
│   ├── ArticleDetailPage.astro # 文章详情
│   ├── SimpleDetailPage.astro # 通用单页模板（承接 /privacy, /terms 等所有动态独立单页）
│   ├── AboutPage.astro       # 关于我们
│   ├── ContactPage.astro     # 联系我们
│   └── ...
└── seed/                     # 可选：该主题专有的 CMS 初始数据（独立 page.json, product.json 等）
```

### 1. 样式作用域隔离要求
主题内所有 CSS 必须添加当前主题的作用域选择器，防止样式溢出：
```css
/* 正确 */
[data-theme='theme-fashion'] .nav-header { ... }
[data-theme='theme-fashion'] .product-card { ... }

/* 禁止：直接污染全局标签 */
body { ... }
header { ... }
```

### 2. 单主题独立交付验证
任何主题开发完成后，必须执行以下测试与交付打包验证：
```bash
# 1. 跑通单元测试
npm test

# 2. 跑通完整工程构建
npm run build

# 3. 验证单主题裁剪打包链路（生成物理隔离独立 zip 包）
npm run pack -- theme-fashion
```
确保在裁剪掉其它所有无关主题后，该主题的 Cloudflare Pages 交付包能够独立成功编译与运行。
