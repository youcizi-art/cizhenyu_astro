export const THEME_IDS = ['default', 'turmill'] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export type ResolvedTheme = {
  themeId: ThemeId;
  primaryColor: string;
};

const ALLOWED = new Set<string>(THEME_IDS);

/** 白名单主题；未知值回退 default。primaryColor 可覆盖 --accent。
 * 官方主题目录须含 theme.manifest.json（origin: "official"），供部署工具识别；勿靠名称硬编码。
 */
export function resolveTheme(input?: {
  theme?: string | null;
  primaryColor?: string | null;
}): ResolvedTheme {
  const raw = String(input?.theme || 'default').trim().toLowerCase() || 'default';
  const themeId = (ALLOWED.has(raw) ? raw : 'default') as ThemeId;
  const primaryColor = String(input?.primaryColor || '').trim();
  return { themeId, primaryColor };
}

export function isThemeId(value: string): value is ThemeId {
  return ALLOWED.has(value);
}
