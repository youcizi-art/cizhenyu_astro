import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../../../..');
const themesRoot = path.join(projectRoot, 'src/ui/themes');
const templateDir = path.resolve(__dirname, '../templates/base');

// 1. 读取行业预设
const presetsPath = path.resolve(__dirname, '../industry-presets.json');
const presets = JSON.parse(fs.readFileSync(presetsPath, 'utf8')).themeCatalog;

const targetThemeId = process.argv[2];

if (!targetThemeId) {
  console.log('可用行业主题 ID 列表：');
  presets.forEach((p) => console.log(`  - ${p.id} (${p.name})`));
  console.log('\n用法: node scaffold-theme.mjs <themeId> [--prefix=xxx] [--force]');
  process.exit(1);
}

const isForce = process.argv.includes('--force');
const prefixArg = process.argv.find((a) => a.startsWith('--prefix='));
const defaultPrefix = targetThemeId.replace(/^theme-/, '').slice(0, 3);
const classPrefix = prefixArg ? prefixArg.split('=')[1] : defaultPrefix;

const themeConfig = presets.find((p) => p.id === targetThemeId) || {
  id: targetThemeId,
  name: targetThemeId,
  industry: 'custom',
  tokens: {
    primary: '#0066FF',
    primaryHover: '#0052CC',
    accent: '#00E5FF',
    bgSurface: '#FFFFFF',
    bgDark: '#0A0F1D',
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

console.log(`▶ 正在通过模板引擎构建自包含工业级主题: [${themeConfig.id}] (${themeConfig.name})...`);
console.log(`  类名前缀: ${classPrefix}-*`);

// 递归复制并替换模板中的占位符
function copyAndReplace(srcPath, destPath) {
  const stat = fs.statSync(srcPath);
  if (stat.isDirectory()) {
    fs.mkdirSync(destPath, { recursive: true });
    for (const file of fs.readdirSync(srcPath)) {
      copyAndReplace(path.join(srcPath, file), path.join(destPath, file));
    }
  } else {
    let content = fs.readFileSync(srcPath, 'utf8');
    content = content
      .replaceAll('__ID__', themeConfig.id)
      .replaceAll('__NAME__', themeConfig.name)
      .replaceAll('__P__', classPrefix)
      .replaceAll('__ACCENT__', themeConfig.tokens.primary)
      .replaceAll('__ACCENT_HOVER__', themeConfig.tokens.primaryHover)
      .replaceAll('__ACCENT_2__', themeConfig.tokens.accent)
      .replaceAll('__INK__', themeConfig.tokens.textMain)
      .replaceAll('__MUTED__', themeConfig.tokens.textMuted)
      .replaceAll('__BG_DARK__', themeConfig.tokens.bgDark)
      .replaceAll('__RADIUS__', themeConfig.tokens.radius);

    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, content, 'utf8');
  }
}

copyAndReplace(templateDir, themeDir);

// 确保 seed 目录存在
fs.mkdirSync(path.join(themeDir, 'seed'), { recursive: true });

console.log(`✓ 恭喜！自包含主题 [${themeConfig.id}] 已从纯净基底模板生成就绪！`);
console.log(`- 包含全套 12 个独立 Pages`);
console.log(`- 包含 6 个核心原子 Components`);
console.log(`- 包含 tokens.css / theme.css / sections.css / chrome.css / pages.css 独立样式体系`);
console.log(`- 严格限定前缀 ${classPrefix}- 与选择器 [data-theme='${themeConfig.id}']，零样式污染\n`);
