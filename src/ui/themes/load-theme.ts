export const THEME_IDS = ['default', 'turmill'] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export type ResolvedTheme = {
  themeId: ThemeId;
  primaryColor: string;
};

const ALLOWED = new Set<string>(THEME_IDS);

/** 白名单主题；未知值回退 default。primaryColor 可覆盖 --accent。 */
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
