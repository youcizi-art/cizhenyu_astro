---
name: b2b-theme-creator
description: 专业 B2B 出海独立站在线主题构建器。涵盖行业调色盘系统、工业级视觉规范、采购信任组件、自包含主题脚手架与 Cloudflare 单主题打包合规校验。用于批量创建或重构高水准出海主题。
---

# B2B Theme Creator（专业出海在线主题构建器）

本规范用于指导 AI Agent 在本项目中构建高质量、工业质感、符合海外采购商心智的专业 B2B 在线主题，严格遵循 [docs/THEME_ARCHITECTURE_SPEC.md](../../docs/THEME_ARCHITECTURE_SPEC.md) 与 [AGENTS.md](../../AGENTS.md) 的隔离铁律。

---

## 一、核心原则与铁律

1. **表现层宇宙自包含**：主题目录必须位于 `src/ui/themes/{themeId}/`，自身包含所有 CSS、组件、页面模板和演示种子。**严禁修改公共层 `Active*.astro` 或硬编码品牌商业逻辑**。
2. **样式严格隔离**：主题所有 CSS 必须带 `[data-theme='{themeId}']` 前缀选择器，严禁污染全局 HTML 标签。
3. **单页面通过通用路由 `[slug]` 承接**：各主题通过 `pages/SimpleDetailPage.astro` 承接所有单页（隐私政策、条款、注册协议等），严禁在 `src/pages/[locale]/` 下建物理目录。
4. **单主题交付包验证**：任何主题创建完毕，必须通过 `npm run pack -- {themeId}` 独立裁剪打包并构建通过。

---

## 二、标准主题目录架构

当创建新主题 `{themeId}` 时，必须生成以下标准结构：

```text
src/ui/themes/{themeId}/
├── theme.manifest.json       # 主题元数据
├── tokens.css                # 设计令牌（配色、圆角、阴影、间距、字体栈）
├── theme.css                 # 核心主题样式（头部、页脚、通用组件、卡片、排版）
├── PageShell.astro           # 独立页壳（挂载 Header 与 Footer，支持在线客服与分析）
├── home-copy.ts              # 首页区块标签多语言字典
├── components/               # 主题私有组件
│   ├── Header.astro          # 独立顶栏（含品牌 Logo 降级、多语言切换、联系 CTA）
│   ├── Footer.astro          # 独立底栏（含资质证明、版权、动态单页快捷链接）
│   ├── PageBanner.astro      # 内页统一面包屑横幅
│   ├── Alerts.astro          # 状态提示组件
│   ├── Hero.astro            # 行业视觉冲击首屏
│   ├── ProductGrid.astro     # 工业品网格
│   ├── CtaBanner.astro       # 询盘引导横幅
│   └── ...                   # 其他特定行业展示组件（认证墙、工厂实景、对比表）
├── pages/                    # 完整页面模板实现
│   ├── HomePage.astro        # 首页
│   ├── ProductListPage.astro # 产品列表页
│   ├── ProductDetailPage.astro # 产品详情页（含规格参数表 Specs、询盘卡片、图集）
│   ├── ArticleListPage.astro # 文章列表页
│   ├── ArticleDetailPage.astro # 文章详情页
│   ├── CaseStudyListPage.astro # 案例列表页
│   ├── CaseStudyDetailPage.astro # 案例详情页
│   ├── DownloadListPage.astro # 资源下载页
│   ├── FaqPage.astro         # 常见问题页
│   ├── AboutPage.astro       # 关于我们/工厂介绍
│   ├── ContactPage.astro     # 联系与表单页
│   ├── SimpleCardListPage.astro # 通用卡片列表模板
│   └── SimpleDetailPage.astro # 通用动态单页模板（承接 /privacy, /terms 等）
└── seed/                     # 该行业专有演示数据包（JSON 数据 + build-seed.mjs）
```

---

## 三、行业色彩系统与视觉心智库（Color & Typography）

根据主题所面向的垂直行业，精准匹配对应的色彩与质感：

### 1. 行业色板配置速查

| 垂直行业 | 核心主色 (Primary) | 辅助强调色 (Accent) | 背景与基底 (Surface) | 视觉特征与心智 |
| :--- | :--- | :--- | :--- | :--- |
| **重工机械 / 锻压机床** | `#D9531E` (工程暖橙) 或 `#D4A373` | `#1A202C` (深碳金钢) | `#0E1217` / `#F8F9FA` | 扎实沉稳、耐重载、高吨位、金属质感 |
| **精密仪器 / 光学芯片** | `#0066FF` (光学深蓝) | `#00E5FF` (冷青荧光) | `#0B0F19` / `#FFFFFF` | 高精度公差、洁净室、现代化、理智克制 |
| **新能源 / 储能光伏** | `#059669` (能源翡绿) | `#10B981` (电能翠绿) | `#111827` / `#F3F4F6` | 低碳环保、高转化率、科技感、全天候运行 |
| **医疗器械 / 实验室设备** | `#0D9488` (无菌深青) | `#06B6D4` (临床亮蓝) | `#F8FAFC` / `#FFFFFF` | 极高合规感（FDA/CE）、清爽无尘、严谨信任 |
| **化工原料 / 生物医药** | `#2563EB` (试剂深蓝) | `#7C3AED` (高分子紫) | `#F9FAFB` / `#FFFFFF` | 纯度指标、分子级控制、安全运输与合规防护 |
| **工业传感器 / 物联网** | `#4F46E5` (数字靛蓝) | `#F59E0B` (预警琥珀) | `#0F172A` / `#F8FAFC` | 通信协议兼容、微秒级响应、工业 4.0 |
| **汽配外贸 / 底盘总成** | `#DC2626` (竞技红) | `#475569` (锻钢冷灰) | `#1E293B` / `#F1F5F9` | 耐磨耐久、原厂级替换（OE/OEM）、硬核抗疲劳 |
| **五金紧固件 / 建筑建材** | `#334155` (结构钢青) | `#CA8A04` (抗氧化铜金) | `#F8FAFC` / `#FFFFFF` | 国际公英制对照、抗拉强度等级、海运大宗装柜 |
| **绿色包装 / 纸塑印刷** | `#15803D` (环保深绿) | `#B45309` (牛皮纸原色) | `#FDFBF7` (天然纸感) | 可降解环保标识（FSC）、盒型打样、快速交期 |
| **纺织服装 / 户外装备** | `#18181B` (极简冷黑) | `#EA580C` (户外炽橙) | `#FAFAFA` / `#FFFFFF` | 面料功能指标（防水透湿透气）、色卡规范、验厂验货 |

### 2. 标准 `tokens.css` 变量模板

```css
[data-theme='{themeId}'] {
  /* 品牌色阶 */
  --primary: #0066ff;
  --primary-hover: #0052cc;
  --primary-subtle: rgba(0, 102, 255, 0.08);
  --accent: #00e5ff;

  /* 中性表面与文本 */
  --bg-page: #f8fafc;
  --bg-surface: #ffffff;
  --bg-card: #ffffff;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --border-light: rgba(148, 163, 184, 0.2);
  --border-focus: rgba(0, 102, 255, 0.4);

  /* 页头与页脚 */
  --header-bg: rgba(255, 255, 255, 0.95);
  --footer-bg: #0b0f19;
  --footer-fg: #94a3b8;
  --footer-heading: #ffffff;

  /* 工业质感基底 */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: 'Space Grotesk', var(--font-sans);
  --radius-sm: 4px;   /* 工业品以硬朗小圆角为主，切忌大弧度呆萌圆角 */
  --radius-md: 6px;
  --radius-lg: 10px;
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03);
  --shadow-hover: 0 10px 25px -5px rgba(0, 0, 0, 0.08);
}
```

---

## 四、海外 B2B 采购信任与专业交互规范（Trust & Interactions）

专业 B2B 站点的核心目的不是纯视觉装潢，而是**消除海外采购商（采购经理、工程总监、外贸分销商）的信任顾虑**。

在构建页面模板时，必须落实以下 5 项专业规范：

### 1. 技术参数与规格表（Specs Matrix）
- 必须包含清晰的 Key-Value 参数表（如吨位、功率、工作行程、精度公差、电压频率）。
- 支持支持公制/英制单位对比表达，视觉上排版严谨，带斑马纹或高对比度边框。

### 2. 国际认证与资质墙（Certifications & Standards）
- 页脚或关于页必须展示行业关键资质：ISO9001/ISO14001、CE、RoHS、UL、FDA、TUV、SGS 检测报告等。
- 支持点击查看或预览证书细节。

### 3. 工厂实景与产能可视化（Factory & Capacity Showcase）
- 模块包括：厂房占地面积（50,000+ sqm）、年产能（Annual Capacity）、CNC 加工中心数量、自动化流水线实景图。
- 严禁放置虚假的“全景卡通插图”，必须呈现真实工业制造与质检（QC）流程。

### 4. OEM / ODM 协同流程轴（Collaborative Timeline）
- 采购商关心的定制协作 4 步法：
  - 需求沟通与图纸确认（CAD/STEP/PDF）；
  - 7 天快速开模与打样确认；
  - 批量精益生产与出厂质检（FAT 测试）；
  - 国际海运装柜包装与报关交单。

### 5. 快速询盘 CTA 与上下文参数联动
- 点击产品页详情 CTA 按钮时，必须自动携带当前产品名称、型号（SKU），以便联动在线客服系统（`CFIMChat.open({ product: { ... } })`）或直接定位到底部询盘表单。

---

## 五、单主题构建与测试执行工作流（Step-by-Step SOP）

当执行构建新主题任务时，严格按照以下步骤落地：

### 第一步：创建主题目录与文件
1. 创建 `src/ui/themes/{themeId}/` 文件夹；
2. 写入 `theme.manifest.json`：
   ```json
   {
     "id": "{themeId}",
     "origin": "official"
   }
   ```
3. 编写 `tokens.css` 与 `theme.css`（加上 `[data-theme='{themeId}']` 作用域）；
4. 编写 `home-copy.ts`，配置多语言（`zh-CN`, `zh-TW`, `ja`, `en-US`）首页标题与文案字典。

### 第二步：编写 PageShell 与组件
1. 编写 `components/Header.astro` 与 `components/Footer.astro`；
2. 编写 `PageShell.astro` 挂载页壳并注入客服脚本与 Google 标签；
3. 编写 `components/Hero.astro`, `components/PageBanner.astro` 等核心展现组件。

### 第三步：编写完整 Pages 模板
必须实现全套 12 个标准页面，重点确保：
- `ProductDetailPage.astro`：展示参数表与询盘入口；
- `SimpleDetailPage.astro`：承接动态单页（/privacy, /terms 等）；
- `HomePage.astro`：排版层次分明，单文件行数严格控制在 600 行以内。

### 第四步：注入演示种子数据（Seed）
在 `seed/` 目录下生成 `seed.manifest.json` 与各集合 json（包含真实行业背景的产品、文章、FAQ、分类与单页），确保通过 `build-seed.mjs` 重新生成。

### 第五步：验证与独立打包验收
执行工程化验收流程：
```bash
# 1. 运行单元测试
npm test

# 2. 运行 Astro 整体构建
npm run build

# 3. 运行该主题独立裁剪打包（核心验证！）
npm run pack -- {themeId}
```
查看打包输出的 `bundle.zip` 与 `catalog.json`，确保无报错、无其它主题遗留代码。
