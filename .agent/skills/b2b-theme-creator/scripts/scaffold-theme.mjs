import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../../../..');
const themesRoot = path.join(projectRoot, 'src/ui/themes');
const templateDir = path.join(themesRoot, 'turmill');

// 1. 读取行业预设
const presetsPath = path.resolve(__dirname, '../industry-presets.json');
const presets = JSON.parse(fs.readFileSync(presetsPath, 'utf8')).themeCatalog;

const targetThemeId = process.argv[2];

if (!targetThemeId) {
  console.log('可用行业主题 ID 列表：');
  presets.forEach((p) => console.log(`  - ${p.id} (${p.name})`));
  console.log('\n用法: node scaffold-theme.mjs <themeId> [--force]');
  process.exit(1);
}

const isForce = process.argv.includes('--force');

const themeConfig = presets.find((p) => p.id === targetThemeId) || {
  id: targetThemeId,
  name: targetThemeId,
  industry: 'custom',
  tokens: {
    primary: '#0066FF',
    primaryHover: '#0052CC',
    accent: '#00E5FF',
    bgSurface: '#FFFFFF',
    bgDark: '#0E1217',
    textMain: '#0F172A',
    textMuted: '#64748B',
    radius: '6px',
  },
};

const themeDir = path.join(themesRoot, themeConfig.id);

if (fs.existsSync(themeDir) && !isForce) {
  console.log(`主题目录 ${themeConfig.id} 已存在，使用 --force 可覆盖重新生成。`);
  process.exit(0);
}

console.log(`▶ 正在构建自包含生产级主题: [${themeConfig.id}] (${themeConfig.name})...`);

fs.mkdirSync(path.join(themeDir, 'components'), { recursive: true });
fs.mkdirSync(path.join(themeDir, 'pages'), { recursive: true });
fs.mkdirSync(path.join(themeDir, 'seed'), { recursive: true });

// 1. 写入 theme.manifest.json
fs.writeFileSync(
  path.join(themeDir, 'theme.manifest.json'),
  JSON.stringify({ id: themeConfig.id, origin: 'official', name: themeConfig.name }, null, 2) + '\n',
);

// 2. 写入 tokens.css
const tokensCss = `/* ${themeConfig.name} · Design Tokens */
[data-theme='${themeConfig.id}'] {
  --primary: ${themeConfig.tokens.primary};
  --primary-hover: ${themeConfig.tokens.primaryHover};
  --primary-subtle: ${themeConfig.tokens.primary}18;
  --accent: ${themeConfig.tokens.accent};
  --accent-subtle: ${themeConfig.tokens.accent}18;

  --bg-page: ${themeConfig.tokens.bgSurface === '#FFFFFF' ? '#F8FAFC' : '#0B0F19'};
  --bg-surface: ${themeConfig.tokens.bgSurface};
  --bg-card: ${themeConfig.tokens.bgSurface};
  --bg-dark: ${themeConfig.tokens.bgDark};
  --text-main: ${themeConfig.tokens.textMain};
  --text-muted: ${themeConfig.tokens.textMuted};
  --border-light: rgba(148, 163, 184, 0.2);

  --header-bg: ${themeConfig.tokens.bgSurface}f2;
  --footer-bg: ${themeConfig.tokens.bgDark};
  --footer-fg: #94A3B8;

  --radius-sm: ${themeConfig.tokens.radius};
  --radius-md: calc(${themeConfig.tokens.radius} + 2px);
  --radius-lg: calc(${themeConfig.tokens.radius} + 6px);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 12px rgba(0, 0, 0, 0.03);
}
`;
fs.writeFileSync(path.join(themeDir, 'tokens.css'), tokensCss);

// 3. 从参考模板复制并适配 theme.css
let templateCss = fs.readFileSync(path.join(templateDir, 'theme.css'), 'utf8');
// 将 [data-theme='turmill'] 替换为当前主题的数据属性选择器
let adaptedCss = templateCss.replace(/\[data-theme=['"]?turmill['"]?\]/g, `[data-theme='${themeConfig.id}']`);
// 将注释更新
adaptedCss = `/* ${themeConfig.name} · Production B2B Stylesheet */\n` + adaptedCss;
fs.writeFileSync(path.join(themeDir, 'theme.css'), adaptedCss);

// 4. 写入 home-copy.ts
const homeCopy = `/**
 * ${themeConfig.name} - 多语言文案字典
 */
export function ${themeConfig.id.replace(/-/g, '_')}HomeLabels(locale: string) {
  const zh = locale.startsWith('zh');
  const ja = locale === 'ja';
  return {
    products: zh ? '核心产品与设备' : ja ? '主要製品・設備' : 'Featured Products & Equipment',
    articles: zh ? '技术文献与行业指南' : ja ? '技術文献・業界情報' : 'Technical Insights & Guides',
    about: zh ? '制造实力与工厂资质' : ja ? '製造体制・工場認証' : 'Manufacturing & Capabilities',
    cases: zh ? '全球工程与合作案例' : ja ? 'グローバル導入事例' : 'Global Project Showcase',
    contact: zh ? '即刻索取技术方案与报价' : ja ? '仕様・お見積もりのご相談' : 'Request Specifications & Quote',
    readMore: zh ? '了解详情' : ja ? '詳しく見る' : 'Learn More',
  };
}
`;
fs.writeFileSync(path.join(themeDir, 'home-copy.ts'), homeCopy);

// 5. 复制 PageShell.astro
fs.copyFileSync(path.join(templateDir, 'PageShell.astro'), path.join(themeDir, 'PageShell.astro'));

// 6. 复制所有 pages/ 页面
const pages = fs.readdirSync(path.join(templateDir, 'pages'));
for (const p of pages) {
  if (p.endsWith('.astro')) {
    fs.copyFileSync(path.join(templateDir, 'pages', p), path.join(themeDir, 'pages', p));
  }
}

// 7. 复制所有 components/ 组件
const components = fs.readdirSync(path.join(templateDir, 'components'));
for (const c of components) {
  if (c.endsWith('.astro')) {
    fs.copyFileSync(path.join(templateDir, 'components', c), path.join(themeDir, 'components', c));
  }
}

// 8. 复制 seed 数据并调整名称与主题映射
const seedFiles = fs.readdirSync(path.join(templateDir, 'seed'));
for (const s of seedFiles) {
  if (s.endsWith('.json')) {
    let content = fs.readFileSync(path.join(templateDir, 'seed', s), 'utf8');
    content = content.replace(/"theme":\s*"turmill"/g, `"theme": "${themeConfig.id}"`);
    fs.writeFileSync(path.join(themeDir, 'seed', s), content);
  }
}

console.log(`✓ 恭喜！自包含主题 [${themeConfig.id}] (${themeConfig.name}) 完整脚手架已生成就绪！`);
console.log(`- 包含 12 个独立 Pages`);
console.log(`- 包含 14 个工业级 Components`);
console.log(`- 包含完整的 Design Tokens & Scoped CSS`);
console.log(`- 包含多语言词典与专属 Seed 数据\n`);
