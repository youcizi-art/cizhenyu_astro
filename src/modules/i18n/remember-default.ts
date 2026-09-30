/** 记住当前请求解析出的默认语种，供 localePath 省略前缀（单站 Pages 内安全） */
let remembered = '';

export function rememberDefaultLocale(code: string) {
  remembered = String(code || '').trim();
}

export function rememberedDefaultLocale() {
  return remembered;
}
