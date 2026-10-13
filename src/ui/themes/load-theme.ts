/**
 * 自动扫描 themes 目录下所有存在 PageShell.astro 的主题目录，彻底消灭硬编码列表。
 */
const shellFiles = import.meta.glob('./*/PageShell.astro');
const discovered = Object.keys(shellFiles)
  .map((k) => k.replace(/^\.\/([^/]+)\/.*$/, '$1'))
  .filter(Boolean);

export const THEME_IDS = (discovered.length ? discovered : ['default']) as readonly string[];

export type ThemeId = string;

export type ResolvedTheme = {
  themeId: ThemeId;
  primaryColor: string;
};

const ALLOWED = new Set<string>(THEME_IDS);

/**
 * 解析主题；未知值回退 default 或首个有效主题。primaryColor 可覆盖 --accent。
 */
export function resolveTheme(input?: {
  theme?: string | null;
  primaryColor?: string | null;
}): ResolvedTheme {
  const raw = String(input?.theme || 'default').trim().toLowerCase() || 'default';
  const themeId = ALLOWED.has(raw) ? raw : (ALLOWED.has('default') ? 'default' : THEME_IDS[0] || 'default');
  const primaryColor = String(input?.primaryColor || '').trim();
  return { themeId, primaryColor };
}

export function isThemeId(value: string): value is ThemeId {
  return ALLOWED.has(value);
}
