---
name: b2b-theme-creator
description: 专业 B2B 出海独立站在线主题构建器与设计标准。涵盖工业调色盘、设计令牌体系、排版层级、采购信任组件、自包含脚手架、主题门禁 Linter 及 Cloudflare 独立单主题打包校验。用于供任何 Agent 规范、高效地批量生成高水准独立出海主题。
---

# B2B Theme Creator（工业级在线主题设计体系与构建器）

本规范用于指导并约束所有 AI Agent 在构建、重构独立主题时，统一遵循标准化设计规范、样式管理体系与代码门禁。

---

## 一、核心铁律与隔离红线（Red Lines）

1. **绝对自包含与零公共层侵入**：
   - 主题必须存放在 `src/ui/themes/{themeId}/`，内部自成体系，包含完整私有组件、页面、样式与演示种子。
   - 严禁在公共层（如 `src/ui/themes/Active*.astro`、`src/ui/layout/`）硬编码任何特定主题名称或业务逻辑。
2. **样式严格隔离与零全局污染**：
   - 所有主题 CSS 必须采用原生 CSS 嵌套结构，顶层选择器强制为 `[data-theme='{themeId}'] { ... }`。
   - 类名前缀强制统一为小写 3-4 位简称（如 `nrg-*`, `mch-*`, `med-*`），禁止跨主题调用其他主题类名（如 `tm-*`）。
   - 禁止使用 `!important`（通过重置动效令牌或提升作用域替代）。
   - 禁止在 `tokens.css` 之外的任何 CSS 文件中硬编码 hex 颜色代码或魔法数字。
3. **单页面通用承接规则**：
   - 严禁为隐私条款、条款、注册协议在 `src/pages/` 下手动创建物理目录；所有单页由 `src/pages/[locale]/[slug].astro` 动态承接，主题内由 `pages/SimpleDetailPage.astro` 负责渲染。
4. **单主题交付包验证机制**：
   - 任何主题产出后，必须能通过独立裁剪命令 `npm run pack -- {themeId}` 构建出无报错、不含任何其他主题残留的 Cloudflare Pages 可交付包（`bundle.zip`）。

---

## 二、标准化主题目录结构

```text
src/ui/themes/{themeId}/
├── theme.manifest.json       # 主题元数据（id, classPrefix, fontHref, homeRequirements）
├── tokens.css                # 唯一允许定义色值的 Design Tokens 文件（包含 chrome 契约与主题令牌）
├── theme.css                 # 核心基础规范（BEM 基础、容器、栅格、排版、按钮、富文本 prose）
├── chrome.css                # 页眉 Header、页脚 Footer、导航下拉、移动端抽屉
├── sections.css              # 首页核心商业展示区块（Hero、TrustStrip、产品网格、工厂实力、场景方案、新闻资讯）
├── pages.css                 # 内页专用样式（详情栅格、图集联动、Specs 表格、询盘面板）
├── PageShell.astro           # 独立页壳
├── home-copy.ts              # 首页 UI 标签与字典（必须导出 getHomeLabels(locale)）
├── components/               # 主题私有组件
│   ├── Header.astro          # 独立顶栏（含品牌 Logo 降级、多语言切换、联系 CTA）
│   ├── Footer.astro          # 独立底栏（含资质证明、版权、单页快捷链接、新闻邮件订阅）
│   ├── Hero.astro            # 行业视觉冲击首屏
│   ├── TrustStrip.astro      # 采购信任背书条（4 项工业核心背书）
│   ├── PageBanner.astro      # 内页统一面包屑横幅
│   └── Alerts.astro          # 状态提示组件
├── pages/                    # 完整 12 个标准页面模板
│   ├── HomePage.astro        # 首页
│   ├── ProductListPage.astro # 产品列表页
│   ├── ProductDetailPage.astro # 产品详情页（含参数表 Specs、图集、询盘入口）
│   ├── ArticleListPage.astro # 文章列表页
│   ├── ArticleDetailPage.astro # 文章详情页
│   ├── CaseStudyListPage.astro # 案例列表页
│   ├── CaseStudyDetailPage.astro # 案例详情页
│   ├── AboutPage.astro       # 关于我们/工厂制造实力
│   ├── ContactPage.astro     # 联系我们与采购询盘表单
│   ├── FaqPage.astro         # 常见问题页
│   ├── SimpleCardListPage.astro # 通用卡片列表模板
│   └── SimpleDetailPage.astro # 通用动态单页模板（承接 /privacy, /terms 等）
└── seed/                     # 真实行业演示数据包
```

---

## 三、行业色彩系统与设计令牌库（Design Tokens）

通过 `industry-presets.json` 预置多套行业专属调色系统，Agent 在创建新主题时必须精准匹配：

| 行业分类 | 主色 (`--accent`) | 辅助强调 (`--accent-2`) | 深底色 (`--bg-dark`) | 视觉心智与采购诉求 |
| :--- | :--- | :--- | :--- | :--- |
| **储能光伏 / 新能源** | `#00A862` (翡翠绿) | `#00D2B4` (电气青) | `#0A0F1D` (科技深蓝) | 低碳环保、高转化率、全天候安全运行 |
| **重型机械 / 工程液压** | `#D9531E` (工程暖橙) | `#F59E0B` (警示琥珀) | `#0E1217` (深碳素钢) | 扎实沉稳、耐重载、高吨位、金属加工质感 |
| **数控机床 / 精密模具** | `#0066FF` (光学深蓝) | `#00E5FF` (冷青荧光) | `#0A1128` (超净室深蓝)| 微米级公差、高精度、高速主轴切削、理智克制 |
| **医疗仪器 / 生化实验** | `#0D9488` (无菌深青) | `#06B6D4` (临床亮蓝) | `#042F2E` (医用深暗) | 极高合规感（FDA/CE/GMP）、清爽无尘、严谨信任 |
| **精细化工 / 塑料粒子** | `#2563EB` (试剂深蓝) | `#7C3AED` (分子聚合物紫)| `#0F172A` (工业藏青) | 纯度指标、分子级控制、危化品防爆与安全海运 |
| **工业传感 / 物联网**   | `#4F46E5` (数字靛蓝) | `#F59E0B` (预警琥珀) | `#0B0F19` (智能暗黑) | 通信协议兼容（Modbus/MQTT）、微秒级响应 |

---

## 四、海外采购信任与转化组件设计规范（Trust & Conversion）

海外采购商（采购总监、工程技术负责人、外贸分销商）需要明确的证据链条消除疑虑，首页及内页必须体现：

1. **4项采购信任标尺（Trust Strip）**：紧跟 Hero 首屏之后，直观呈现产品核心承诺（如 Clean & Renewable, Reliable Performance, Smart & Connected, Global Presence）。
2. **技术参数与规格表（Specs Matrix）**：详情页必须拥有清晰的 Key-Value 双列对比矩阵，支持公制/英制单位，并具备斑马纹区分。
3. **制造实力与工厂数据（About & Stats）**：包含厂房实景、核心数字（10+ 年经验、100+ 国家与地区、5000+ 合作伙伴、1M+ 项目落地）。
4. **全场景解决方案矩阵（Solutions Grid）**：针对不同应用端（如 Residential 户用, Commercial 商业, Industrial 工业, Utility 电网地面电站）进行大图沉浸式分类。

---

## 五、Agent 常用主题开发与质检指令（Tooling & SOP）

当 Agent 负责构建新主题时，严禁使用粗暴复制其他主题的方式，必须走脚手架与自动化校验流：

### 1. 一键生成标准化自包含主题骨架
```bash
# 语法：node .agent/skills/b2b-theme-creator/scripts/scaffold-theme.mjs <themeId> [--prefix=前缀] [--force]
node .agent/skills/b2b-theme-creator/scripts/scaffold-theme.mjs theme-energy --prefix=nrg --force
```

### 2. 执行自动化质量门禁（Linting）
```bash
# 验证代码合规、行数控制、选择器隔离与无污染
node .agent/skills/b2b-theme-creator/scripts/lint-theme.mjs theme-energy
```

### 3. 执行单主题独立打包裁剪测试
```bash
# 核心构建验证：裁剪其他主题并执行 Cloudflare SSR 生产构建
npm run pack -- theme-energy
```
