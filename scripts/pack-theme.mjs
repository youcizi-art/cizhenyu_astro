/**
 * 单主题交付打包：裁剪 → build → 输出到 sibling cizhenyu_astro_themes
 *
 * 样式：自动扫描主题目录下全部 .css 写入 styles.ts（无需人工配置，禁止按主题名手写清单）。
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
const isPrivate =
  process.argv.includes('-p') ||
  process.argv.includes('--p') ||
  process.argv.includes('--private') ||
  process.argv.some((a) => a.startsWith('--private=1') || a.startsWith('--private=true'));
const targetDirName = isPrivate ? 'cizhenyu_astro_private' : 'cizhenyu_astro_themes';
const themesOutRoot = path.resolve(astroRoot, '..', targetDirName);

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

/** 主题目录：仅收录含 PageShell.astro 的目录，避免误扫工具文件夹 */
function listThemeIds(themesDir) {
  if (!fs.existsSync(themesDir)) return [];
  return fs
    .readdirSync(themesDir)
    .filter((name) => {
      if (name.startsWith('.')) return false;
      const p = path.join(themesDir, name);
      return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'PageShell.astro'));
    })
    .sort();
}

/**
 * 收集主题下全部 CSS（自动发现，禁止按主题名手写清单）。
 * 跳过 seed；优先 tokens → theme → pages，其余按路径排序。
 */
function collectThemeCssRelPaths(themeDir) {
  const skipDirs = new Set(['seed', 'node_modules', 'dist']);
  const found = [];

  function walk(dir, prefix) {
    for (const name of fs.readdirSync(dir)) {
      if (name.startsWith('.')) continue;
      const full = path.join(dir, name);
      const rel = prefix ? `${prefix}/${name}` : name;
      const st = fs.statSync(full);
      if (st.isDirectory()) {
        if (skipDirs.has(name)) continue;
        walk(full, rel);
        continue;
      }
      if (name.endsWith('.css')) found.push(rel.replace(/\\/g, '/'));
    }
  }

  walk(themeDir, '');
  const priority = new Map([
    ['tokens.css', 0],
    ['theme.css', 1],
    ['pages.css', 2],
  ]);
  found.sort((a, b) => {
    const ab = path.posix.basename(a);
    const bb = path.posix.basename(b);
    const ap = priority.has(ab) ? priority.get(ab) : 100;
    const bp = priority.has(bb) ? priority.get(bb) : 100;
    if (ap !== bp) return ap - bp;
    return a.localeCompare(b);
  });
  return found;
}

function buildThemeStylesTs(themeId, cssRelPaths) {
  if (!cssRelPaths.length) {
    throw new Error(`主题 ${themeId} 未发现任何 .css，无法生成 styles.ts`);
  }
  const hasTokens = cssRelPaths.some((f) => path.posix.basename(f) === 'tokens.css');
  const hasTheme = cssRelPaths.some((f) => path.posix.basename(f) === 'theme.css');
  if (!hasTokens || !hasTheme) {
    throw new Error(
      `主题 ${themeId} 缺少必要样式（需要 tokens.css 与 theme.css），实际: ${cssRelPaths.join(', ')}`,
    );
  }
  const imports = cssRelPaths.map((rel) => `import './${themeId}/${rel}';`).join('\n');
  return (
    `/** 单主题交付包：仅 ${themeId}（由 pack-theme 自动扫描 CSS，勿手写清单） */\n` +
    `${imports}\n`
  );
}

function writeSingleThemeKernel(themesDir, themeId, allThemeIds) {
  const P = pascal(themeId);
  const themeDir = path.join(themesDir, themeId);
  const cssRelPaths = collectThemeCssRelPaths(themeDir);

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

  const stylesBody = buildThemeStylesTs(themeId, cssRelPaths);
  fs.writeFileSync(path.join(themesDir, 'styles.ts'), stylesBody);
  console.log(`  styles.ts 已纳入 ${cssRelPaths.length} 个 CSS:`);
  for (const rel of cssRelPaths) console.log(`    - ${themeId}/${rel}`);

  // NOTE: theme-ui.ts 直接沿用源码版本：它已改为从 theme.manifest.json 读取元数据，单主题裁剪后 glob 只会命中该主题。


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

function updateCatalog(outRoot, themeId, entryPatch) {
  const catalogPath = path.join(outRoot, 'catalog.json');
  let catalog = {
    version: '1',
    defaultTheme: 'default',
    repo: 'https://github.com/youcizi-art/cizhenyu_astro_themes.git',
    zipUrl: 'https://codeload.github.com/youcizi-art/cizhenyu_astro_themes/zip/refs/heads/master',
    themes: [],
    updatedAt: new Date().toISOString(),
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

  // 以磁盘 themes/<id>/*/bundle.zip 为准重建 versions，避免 catalog 落后
  const themeDir = path.join(outRoot, 'themes', themeId);
  const versions = [];
  if (fs.existsSync(themeDir)) {
    for (const name of fs.readdirSync(themeDir)) {
      const verPath = path.join(themeDir, name);
      const zip = path.join(verPath, 'bundle.zip');
      if (!fs.statSync(verPath).isDirectory() || !fs.existsSync(zip)) continue;
      let builtAt = '';
      let sha256 = '';
      let hasSeed = false;
      const manPath = path.join(verPath, 'manifest.json');
      if (fs.existsSync(manPath)) {
        try {
          const man = JSON.parse(fs.readFileSync(manPath, 'utf8'));
          builtAt = String(man.builtAt || '');
          sha256 = String(man.sha256 || '');
          hasSeed = Boolean(man.hasSeed);
        } catch {
          // ignore
        }
      }
      if (!sha256) sha256 = sha256File(zip);
      versions.push({
        version: name,
        path: `themes/${themeId}/${name}/bundle.zip`,
        sha256,
        hasSeed,
        builtAt: builtAt || undefined,
      });
    }
  }
  versions.sort((a, b) => String(b.version).localeCompare(String(a.version)));
  const latest = versions[0] || null;
  const baseLabel = themeId === 'default' ? 'default（磁帧鱼）' : themeId;

  // 只写一套命名：label + displayName。勿同时写 display_name，否则 serde alias 会报 duplicate field
  const entry = {
    id: themeId,
    label: baseLabel,
    displayName: baseLabel,
    version: latest?.version || entryPatch.version || '',
    latest: latest?.version || entryPatch.latest || entryPatch.version || '',
    hasSeed: latest ? latest.hasSeed : Boolean(entryPatch.hasSeed),
    sha256: latest?.sha256 || entryPatch.sha256 || '',
    path: latest?.path || entryPatch.path || '',
    builtAt: latest?.builtAt || entryPatch.builtAt || undefined,
    versions,
  };

  const idx = catalog.themes.findIndex((t) => t.id === themeId);
  // 整项替换，清掉历史残留的 display_name / has_seed 等别名键
  if (idx >= 0) catalog.themes[idx] = entry;
  else catalog.themes.push(entry);
  catalog.themes.sort((a, b) => String(a.id).localeCompare(String(b.id)));
  catalog.updatedAt = new Date().toISOString();
  fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + '\n');
}

function syncPackageJsonPackScripts(availableThemes) {
  const pkgPath = path.join(astroRoot, 'package.json');
  if (!fs.existsSync(pkgPath)) return;
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    let changed = false;
    if (!pkg.scripts) pkg.scripts = {};
    if (!pkg.scripts['pack']) {
      pkg.scripts['pack'] = 'node scripts/pack-theme.mjs';
      changed = true;
    }
    for (const id of availableThemes) {
      const scriptKey = `pack:${id}`;
      const expected = `node scripts/pack-theme.mjs --id=${id}`;
      if (pkg.scripts[scriptKey] !== expected) {
        pkg.scripts[scriptKey] = expected;
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    }
  } catch {}
}

function main() {
  const themesDir = path.join(astroRoot, 'src/ui/themes');
  const availableThemes = listThemeIds(themesDir);
  syncPackageJsonPackScripts(availableThemes);

  let themeId = arg('id', '');
  if (!themeId) {
    const pos = process.argv.slice(2).find((a) => !a.startsWith('-'));
    if (pos) themeId = pos;
  }

  if (!themeId) {
    console.error('⚠ 请指定要打包的主题名称！');
    console.error(`当前本地已发现的主题列表: ${availableThemes.join(', ')}`);
    console.error('用法示例:');
    console.error('  npm run pack:default          (打包公共主题到 cizhenyu_astro_themes)');
    console.error('  npm run pack:default -- -p     (打包私密主题到 cizhenyu_astro_private)');
    console.error('  npm run pack -- <theme> -p    (通用打包私密主题)');
    process.exit(1);
  }

  console.log(`▶ 开始打包主题 [${themeId}] (${isPrivate ? '私密包 -> cizhenyu_astro_private' : '公共包 -> cizhenyu_astro_themes'})…`);
  const version =
    arg('version') ||
    new Date()
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d+Z$/, '')
      .replace('T', ''); // YYYYMMDDHHmmss — 同日多次打包可区分
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
  const allThemeIds = listThemeIds(workThemes);
  if (!allThemeIds.includes(themeId)) {
    console.error(`staging 中未找到主题目录: ${themeId}`);
    process.exit(1);
  }
  for (const name of allThemeIds) {
    if (name === themeId) continue;
    console.log('  删除其它主题:', name);
    rmDir(path.join(workThemes, name));
  }

  console.log('▶ 改写为单主题内核…');
  writeSingleThemeKernel(workThemes, themeId, allThemeIds);
  patchLoadSiteForTheme(work, themeId);

  // 主题自包含 favicon → 交付包根路径 /favicon.ico（浏览器默认探测；多主题仓库勿写全局 public）
  const themeFavicon = path.join(themeSrc, 'assets', 'favicon.ico');
  if (fs.existsSync(themeFavicon)) {
    const publicDir = path.join(work, 'public');
    ensureDir(publicDir);
    fs.copyFileSync(themeFavicon, path.join(publicDir, 'favicon.ico'));
    console.log('▶ 已写入主题 favicon → public/favicon.ico');
  } else {
    console.warn(`⚠ 主题 ${themeId} 无 assets/favicon.ico，交付包将不带根路径 favicon`);
  }

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
    PUBLIC_CMS_TRANSPORT: 'service',
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

  updateCatalog(outRoot, themeId, {
    id: themeId,
    version,
    latest: version,
    hasSeed,
    sha256: meta.sha256,
    path: meta.path,
    builtAt: meta.builtAt,
  });

  // 便于人工确认：themes/<id>/latest 指向当前最新版本号
  fs.writeFileSync(
    path.join(outRoot, 'themes', themeId, 'latest'),
    `${version}\n`,
  );
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
