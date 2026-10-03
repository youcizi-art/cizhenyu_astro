/**
 * 单主题交付打包：裁剪 → build → 输出到 sibling cizhenyu_astro_themes
 *
 * 用法:
 *   node scripts/pack-theme.mjs --id=default
 *   node scripts/pack-theme.mjs --id=turmill
 *   npm run pack:default / npm run pack:turmill
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const astroRoot = path.resolve(__dirname, '..');
const themesOutRoot = path.resolve(astroRoot, '..', 'cizhenyu_astro_themes');

function arg(name, def = '') {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : def;
}

function rmDir(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyDir(src, dest, { skip = new Set(['node_modules', 'dist', '.git', '.pack-staging']) } = {}) {
  ensureDir(dest);
  for (const name of fs.readdirSync(src)) {
    if (skip.has(name)) continue;
    const s = path.join(src, name);
    const d = path.join(dest, name);
    if (fs.statSync(s).isDirectory()) copyDir(s, d, { skip });
    else fs.copyFileSync(s, d);
  }
}

function sha256File(p) {
  return createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

function zipDir(srcDir, zipPath) {
  ensureDir(path.dirname(zipPath));
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  const absZip = path.resolve(zipPath);
  const absSrc = path.resolve(srcDir);
  if (process.platform === 'win32') {
    const r = spawnSync('tar', ['-a', '-cf', absZip, '-C', absSrc, '.'], {
      stdio: 'inherit',
      shell: true,
    });
    if (r.status === 0 && fs.existsSync(zipPath)) return;
    throw new Error('zip 失败（需要 tar）');
  }
  const r = spawnSync('zip', ['-r', absZip, '.'], { cwd: absSrc, stdio: 'inherit' });
  if (r.status !== 0) throw new Error('zip 失败');
}

function pascal(id) {
  return id
    .split(/[-_]/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function writeSingleThemeKernel(themesDir, themeId) {
  const P = pascal(themeId);

  fs.writeFileSync(
    path.join(themesDir, 'load-theme.ts'),
    `export const THEME_IDS = ['${themeId}'] as const;\n` +
      `export type ThemeId = (typeof THEME_IDS)[number];\n` +
      `export type ResolvedTheme = { themeId: ThemeId; primaryColor: string };\n` +
      `const ALLOWED = new Set<string>(THEME_IDS);\n` +
      `export function resolveTheme(input?: { theme?: string | null; primaryColor?: string | null }): ResolvedTheme {\n` +
      `  const raw = String(input?.theme || '${themeId}').trim().toLowerCase() || '${themeId}';\n` +
      `  const themeId = (ALLOWED.has(raw) ? raw : '${themeId}') as ThemeId;\n` +
      `  return { themeId, primaryColor: String(input?.primaryColor || '').trim() };\n` +
      `}\n` +
      `export function isThemeId(value: string): value is ThemeId {\n` +
      `  return ALLOWED.has(value);\n` +
      `}\n`,
  );

  const cssImports =
    themeId === 'default'
      ? `import './default/tokens.css';\nimport './default/theme.css';\nimport './default/pages.css';\n`
      : themeId === 'turmill'
        ? `import './turmill/tokens.css';\nimport './turmill/theme.css';\n`
        : `import './${themeId}/tokens.css';\nimport './${themeId}/theme.css';\n`;
  fs.writeFileSync(
    path.join(themesDir, 'styles.ts'),
    `/** 单主题交付包：仅 ${themeId} */\n${cssImports}`,
  );

  fs.writeFileSync(
    path.join(themesDir, 'theme-ui.ts'),
    `import type { ThemeId } from './load-theme';\n` +
      `import { resolveTheme } from './load-theme';\n` +
      `import { localePath } from '@/modules/cms';\n` +
      `import { t } from '@/modules/i18n';\n` +
      `import type { PageChrome } from '@/workflows/chrome/load-chrome';\n\n` +
      `export type ThemeShellKind = 'default' | 'page-shell';\n` +
      `export type ThemeMeta = { id: ThemeId; shell: ThemeShellKind; fontHref: string };\n\n` +
      `export const THEME_META: Record<ThemeId, ThemeMeta> = {\n` +
      `  ${themeId}: { id: '${themeId}', shell: 'page-shell', fontHref: '' },\n` +
      `};\n\n` +
      `export function getThemeMeta(theme?: string | null): ThemeMeta {\n` +
      `  return THEME_META[resolveTheme({ theme }).themeId];\n` +
      `}\n` +
      `export function hasPageShell(_theme?: string | null): boolean { return true; }\n` +
      `export function buildPageShellProps(chrome: PageChrome) {\n` +
      `  const { locale, navLinks, company, localeOptions, siteName } = chrome;\n` +
      `  return {\n` +
      `    siteName, links: navLinks, localeOptions, company, locale,\n` +
      `    homeHref: localePath(locale, '/'),\n` +
      `    contactHref: localePath(locale, '/contact'),\n` +
      `    contactLabel: t(locale, 'contact'),\n` +
      `    quickLinksLabel: locale.startsWith('zh') ? '快速链接' : 'Quick Links',\n` +
      `  };\n` +
      `}\n` +
      `export function shellThemeId(theme?: string | null): ThemeId {\n` +
      `  return resolveTheme({ theme }).themeId;\n` +
      `}\n`,
  );

  fs.writeFileSync(
    path.join(themesDir, 'ThemeFrame.astro'),
    `---\n` +
      `import ${P}PageShell from './${themeId}/PageShell.astro';\n` +
      `import { buildPageShellProps } from './theme-ui';\n` +
      `import type { PageChrome } from '@/workflows/chrome/load-chrome';\n` +
      `interface Props { chrome: PageChrome; showContactCta?: boolean; }\n` +
      `const { chrome, showContactCta = true } = Astro.props;\n` +
      `const shell = buildPageShellProps(chrome);\n` +
      `---\n` +
      `<${P}PageShell {...shell} showContactCta={showContactCta}>\n` +
      `  <slot />\n` +
      `</${P}PageShell>\n`,
  );

  // Active*：把其它主题分支去掉，仅保留目标主题（用源文件做字符串手术）
  for (const file of fs.readdirSync(themesDir).filter((f) => f.startsWith('Active') && f.endsWith('.astro'))) {
    slimActiveFile(path.join(themesDir, file), themeId);
  }
}

function slimActiveFile(filePath, themeId) {
  let text = fs.readFileSync(filePath, 'utf8');
  const others = ['default', 'turmill'].filter((t) => t !== themeId);

  // 删除其它主题 import
  for (const o of others) {
    text = text.replace(new RegExp(`^import\\s+.+?from\\s+['"]\\.\\/${o}\\/.+?['"];\\r?\\n`, 'gm'), '');
  }
  // labels helper import：只保留当前主题
  for (const o of others) {
    text = text.replace(
      new RegExp(`^import\\s+\\{[^}]*\\}\\s+from\\s+['"]\\.\\/${o}\\/home-copy['"];\\r?\\n`, 'gm'),
      '',
    );
  }

  // 条件恒真/恒假
  text = text.replace(new RegExp(`meta\\.id\\s*===\\s*['"]${themeId}['"]`, 'g'), 'true');
  for (const o of others) {
    text = text.replace(new RegExp(`meta\\.id\\s*===\\s*['"]${o}['"]`, 'g'), 'false');
  }
  text = text.replace(
    new RegExp(`isDefault\\s*=\\s*meta\\.id\\s*===\\s*['"]default['"]`, 'g'),
    `isDefault = ${themeId === 'default'}`,
  );
  text = text.replace(
    new RegExp(`isTurmill\\s*=\\s*meta\\.id\\s*===\\s*['"]turmill['"]`, 'g'),
    `isTurmill = ${themeId === 'turmill'}`,
  );
  text = text.replace(
    /isShellTheme\s*=\s*meta\.id\s*===\s*['"]default['"]\s*\|\|\s*meta\.id\s*===\s*['"]turmill['"]/g,
    'isShellTheme = true',
  );

  // 删除其它主题 home-copy 变量
  for (const o of others) {
    const varName = o === 'default' ? 'defaultLabels' : o === 'turmill' ? 'turmillLabels' : `${o}Labels`;
    text = text.replace(
      new RegExp(`const\\s+${varName}\\s*=\\s*[^;]+;\\r?\\n`, 'g'),
      '',
    );
  }

  fs.writeFileSync(filePath, text);
}

function patchLoadSiteForTheme(workRoot, themeId) {
  const p = path.join(workRoot, 'src/modules/site/load-site.ts');
  if (!fs.existsSync(p)) return;
  let text = fs.readFileSync(p, 'utf8');
  // 保证 PUBLIC_THEME=default 能落到 demo 模板
  if (!text.includes("theme === 'default'")) {
    text = text.replace(
      'function deliveryTemplateKey(): string {\n  const theme = String(envSync(\'PUBLIC_THEME\') || envSync(\'THEME\') || \'turmill\')\n    .trim()\n    .toLowerCase();\n  if (theme && registry[theme]) return theme;',
      `function deliveryTemplateKey(): string {\n  const theme = String(envSync('PUBLIC_THEME') || envSync('THEME') || '${themeId}')\n    .trim()\n    .toLowerCase();\n  if (theme === 'default' && registry.demo) return 'demo';\n  if (theme && registry[theme]) return theme;`,
    );
  }
  text = text.replace(
    /envSync\('PUBLIC_THEME'\) \|\| envSync\('THEME'\) \|\| '[^']+'/,
    `envSync('PUBLIC_THEME') || envSync('THEME') || '${themeId}'`,
  );
  fs.writeFileSync(p, text);
}

function updateCatalog(outRoot, entry) {
  const catalogPath = path.join(outRoot, 'catalog.json');
  let catalog = {
    version: '1',
    defaultTheme: 'default',
    repo: 'https://github.com/youcizi-art/cizhenyu_astro_themes.git',
    zipUrl: 'https://codeload.github.com/youcizi-art/cizhenyu_astro_themes/zip/refs/heads/master',
    themes: [],
  };
  if (fs.existsSync(catalogPath)) {
    try {
      const prev = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      catalog = { ...catalog, ...prev };
      if (!Array.isArray(catalog.themes)) catalog.themes = [];
      catalog.version = String(catalog.version ?? '1');
    } catch {
      // keep default
    }
  }
  const idx = catalog.themes.findIndex((t) => t.id === entry.id);
  if (idx >= 0) catalog.themes[idx] = { ...catalog.themes[idx], ...entry };
  else catalog.themes.push(entry);
  catalog.themes.sort((a, b) => String(a.id).localeCompare(String(b.id)));
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
}

function main() {
  const themeId = arg('id', '');
  if (!themeId) {
    console.error('用法: node scripts/pack-theme.mjs --id=<theme>');
    process.exit(1);
  }
  const version =
    arg('version') || new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const outRoot = path.resolve(arg('out', themesOutRoot));
  const themeSrc = path.join(astroRoot, 'src/ui/themes', themeId);
  if (!fs.existsSync(themeSrc) || !fs.statSync(themeSrc).isDirectory()) {
    console.error('主题目录不存在:', themeSrc);
    process.exit(1);
  }
  if (!fs.existsSync(path.join(themeSrc, 'PageShell.astro'))) {
    console.error(`主题 ${themeId} 缺少 PageShell.astro，无法打 page-shell 交付包`);
    process.exit(1);
  }

  const work = path.join(astroRoot, '.pack-staging', themeId);
  rmDir(work);
  console.log('▶ 复制源码到 staging…');
  copyDir(astroRoot, work);

  const workThemes = path.join(work, 'src/ui/themes');
  for (const name of fs.readdirSync(workThemes)) {
    const p = path.join(workThemes, name);
    if (!fs.statSync(p).isDirectory()) continue;
    if (name !== themeId) {
      console.log('  删除其它主题:', name);
      rmDir(p);
    }
  }

  console.log('▶ 改写为单主题内核…');
  writeSingleThemeKernel(workThemes, themeId);
  patchLoadSiteForTheme(work, themeId);

  // 依赖：优先 symlink/copy 源 node_modules 加速
  const srcNm = path.join(astroRoot, 'node_modules');
  const workNm = path.join(work, 'node_modules');
  if (fs.existsSync(srcNm) && !fs.existsSync(workNm)) {
    console.log('▶ 复用源 node_modules…');
    try {
      fs.symlinkSync(srcNm, workNm, 'junction');
    } catch {
      console.log('  symlink 失败，改为 npm install…');
      const inst = spawnSync('npm', ['install'], { cwd: work, stdio: 'inherit', shell: true });
      if (inst.status !== 0) process.exit(inst.status || 1);
    }
  } else if (!fs.existsSync(workNm)) {
    console.log('▶ npm install…');
    const inst = spawnSync('npm', ['install'], { cwd: work, stdio: 'inherit', shell: true });
    if (inst.status !== 0) process.exit(inst.status || 1);
  }

  console.log('▶ astro build…');
  const env = {
    ...process.env,
    SITE_KEY: 'demo',
    PUBLIC_THEME: themeId,
    THEME: themeId,
    CMS_TRANSPORT: 'service',
    CMS_SERVICE_BINDING: 'CMS',
    PUBLIC_CMS_API_BASE: '',
    PUBLIC_SITE_URL: '',
    CI: '1',
  };
  const build = spawnSync('npm', ['run', 'build'], {
    cwd: work,
    stdio: 'inherit',
    shell: true,
    env,
  });
  if (build.status !== 0) process.exit(build.status || 1);

  const dist = path.join(work, 'dist');
  if (!fs.existsSync(dist)) {
    console.error('未找到 dist/');
    process.exit(1);
  }

  const bundleRoot = path.join(work, '_bundle_out');
  rmDir(bundleRoot);
  ensureDir(bundleRoot);
  copyDir(dist, path.join(bundleRoot, 'dist'), { skip: new Set() });

  const seedSrc = path.join(themeSrc, 'seed');
  const hasSeed =
    fs.existsSync(seedSrc) && fs.existsSync(path.join(seedSrc, 'seed.manifest.json'));
  if (hasSeed) {
    copyDir(seedSrc, path.join(bundleRoot, 'seed'), { skip: new Set(['build-seed.mjs']) });
    console.log('▶ 已打入 seed/');
  } else {
    console.warn('⚠ 无 seed/，交付时将跳过内容注入');
  }

  const verDir = path.join(outRoot, 'themes', themeId, version);
  ensureDir(verDir);
  const zipPath = path.join(verDir, 'bundle.zip');
  zipDir(bundleRoot, zipPath);
  const hash = sha256File(zipPath);

  const meta = {
    kind: 'pages-theme',
    themeId,
    version,
    sha256: hash,
    hasSeed,
    path: `themes/${themeId}/${version}/bundle.zip`,
    builtAt: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(verDir, 'manifest.json'), JSON.stringify(meta, null, 2) + '\n');
  // 也写入包内可读副本到解压后结构：额外放一份到 verDir 旁说明
  fs.writeFileSync(path.join(bundleRoot, 'manifest.json'), JSON.stringify(meta, null, 2) + '\n');
  // 重新打一次含根 manifest 的 zip
  zipDir(bundleRoot, zipPath);
  meta.sha256 = sha256File(zipPath);
  fs.writeFileSync(path.join(verDir, 'manifest.json'), JSON.stringify(meta, null, 2) + '\n');

  updateCatalog(outRoot, {
    id: themeId,
    display_name: themeId === 'default' ? 'default（磁帧鱼）' : themeId,
    label: themeId === 'default' ? 'default（磁帧鱼）' : themeId,
    version,
    latest: version,
    hasSeed,
    sha256: meta.sha256,
    path: meta.path,
  });

  const readme = path.join(outRoot, 'README.md');
  if (!fs.existsSync(readme)) {
    fs.writeFileSync(
      readme,
      `# cizhenyu_astro_themes\n\n官方预构建 Pages 主题包（无源码）。\n\n- 远程仓：https://github.com/youcizi-art/cizhenyu_astro_themes\n- Zip：https://codeload.github.com/youcizi-art/cizhenyu_astro_themes/zip/refs/heads/master\n- 由 \`cizhenyu_astro\` 执行 \`npm run pack:<theme>\` 生成\n\n结构：\`themes/<id>/<version>/bundle.zip\` + \`catalog.json\`\n`,
    );
  }

  // 清理 staging（保留可选）
  if (arg('keep-staging') !== '1') rmDir(work);

  console.log('✓ Theme bundle:', zipPath);
  console.log('  sha256:', meta.sha256);
  console.log('  catalog:', path.join(outRoot, 'catalog.json'));
}

main();
