import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../../../..');
const themesRoot = path.join(projectRoot, 'src/ui/themes');

const targetThemeId = process.argv[2];

if (!targetThemeId) {
  console.log('用法: node lint-theme.mjs <themeId>');
  process.exit(1);
}

const themeDir = path.join(themesRoot, targetThemeId);
if (!fs.existsSync(themeDir)) {
  console.error(`❌ 错误：主题目录不存在 -> ${themeDir}`);
  process.exit(1);
}

console.log(`🔍 开始对主题 [${targetThemeId}] 进行质量门禁（Linting）校验...\n`);

let errors = [];
let warnings = [];

// 1. 必需文件检查
const requiredFiles = [
  'theme.manifest.json',
  'tokens.css',
  'theme.css',
  'PageShell.astro',
  'home-copy.ts',
];
for (const rf of requiredFiles) {
  if (!fs.existsSync(path.join(themeDir, rf))) {
    errors.push(`缺少关键文件: ${rf}`);
  }
}

// 2. 12个标准页面检查
const requiredPages = [
  'HomePage.astro',
  'ProductListPage.astro',
  'ProductDetailPage.astro',
  'ArticleListPage.astro',
  'ArticleDetailPage.astro',
  'CaseStudyListPage.astro',
  'CaseStudyDetailPage.astro',
  'AboutPage.astro',
  'ContactPage.astro',
  'FaqPage.astro',
  'SimpleCardListPage.astro',
  'SimpleDetailPage.astro',
];
const pagesDir = path.join(themeDir, 'pages');
if (!fs.existsSync(pagesDir)) {
  errors.push(`缺少 pages 目录`);
} else {
  for (const rp of requiredPages) {
    if (!fs.existsSync(path.join(pagesDir, rp))) {
      errors.push(`缺少标准页面模板: pages/${rp}`);
    }
  }
}

// 3. Manifest 检查
const manifestPath = path.join(themeDir, 'theme.manifest.json');
if (fs.existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (manifest.id !== targetThemeId) {
      errors.push(`theme.manifest.json 中的 id (${manifest.id}) 与目录名 (${targetThemeId}) 不一致`);
    }
  } catch (e) {
    errors.push(`theme.manifest.json 不是合法的 JSON 格式: ${e.message}`);
  }
}

// 4. CSS 规则检查：
// - 非 tokens.css 禁止出现 !important
// - 必须包裹在 [data-theme='${targetThemeId}'] 顶层选择器内
const cssFiles = fs.readdirSync(themeDir).filter((f) => f.endsWith('.css'));
for (const cf of cssFiles) {
  const filePath = path.join(themeDir, cf);
  const content = fs.readFileSync(filePath, 'utf8');

  if (/:\s*[^;]*!important/i.test(content)) {
    errors.push(`样式文件 ${cf} 中禁止使用 !important（违反无障碍及样式覆盖规范）`);
  }

  if (cf !== 'tokens.css') {
    if (!content.includes(`[data-theme='${targetThemeId}']`)) {
      errors.push(`样式文件 ${cf} 必须以 [data-theme='${targetThemeId}'] 为顶层选择器进行样式隔离`);
    }
  }
}

// 5. 跨主题/历史脏数据污染检查（如残留 turmill, tm-, 宠物相关）
function scanDir(dir) {
  for (const f of fs.readdirSync(dir)) {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) {
      if (f !== 'seed') scanDir(fp);
    } else if (f.endsWith('.astro') || f.endsWith('.css') || f.endsWith('.ts')) {
      const content = fs.readFileSync(fp, 'utf8');
      if (content.includes('tm-') && targetThemeId !== 'turmill') {
        errors.push(`文件 ${f} 残留了旧主题 'tm-' 类名污染`);
      }
      if (content.includes('turmill') && targetThemeId !== 'turmill') {
        warnings.push(`文件 ${f} 出现 'turmill' 字样，请检查是否为复制残留`);
      }
      // 检查单文件行数不超过 600 行
      const lines = content.split('\n').length;
      if (lines > 600) {
        warnings.push(`文件 ${f} 共 ${lines} 行，超过 600 行维护警戒线`);
      }
    }
  }
}
scanDir(themeDir);

// 汇总输出
console.log('────────────────────────────────────────');
if (errors.length > 0) {
  console.error(`❌ 发现 ${errors.length} 项严重错误：`);
  errors.forEach((e) => console.error(`  - ${e}`));
} else {
  console.log(`✅ 所有核心架构与合规指标均已通过！`);
}

if (warnings.length > 0) {
  console.warn(`\n⚠️ 发现 ${warnings.length} 项警告提示：`);
  warnings.forEach((w) => console.warn(`  - ${w}`));
}
console.log('────────────────────────────────────────\n');

if (errors.length > 0) {
  process.exit(1);
}
