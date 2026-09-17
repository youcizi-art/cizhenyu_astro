import {
  entityData,
  listEntities,
  type CatalogKey,
  type CmsEntity,
} from '../cms';
import { buildAlternateLinks, toAbsoluteUrl } from './urls';

/**
 * Resolve hreflang alternates for a CMS entity via language_group_key.
 * Falls back to path-prefix swap when group key is missing.
 */
export async function resolveEntityLocaleAlternates(options: {
  catalogKey: CatalogKey;
  languageGroupKey?: string | null;
  locales: string[];
  defaultLocale?: string;
  currentLocale: string;
  currentPath: string;
  slugField?: string;
  pathForSlug: (locale: string, slug: string) => string;
  origin?: string;
}): Promise<Array<{ href: string; hreflang: string }>> {
  const group = String(options.languageGroupKey || '').trim();
  const slugField = options.slugField || 'slug';

  if (!group || options.locales.length < 2) {
    return buildAlternateLinks(
      options.locales.map((code) => ({
        code,
        href: options.currentPath.replace(
          new RegExp(`^/${escapeRegExp(options.currentLocale)}(?=/|$)`),
          `/${code}`
        ),
      })),
      { defaultLocale: options.defaultLocale, origin: options.origin }
    );
  }

  const rows = await Promise.all(
    options.locales.map(async (locale) => {
      try {
        const result = await listEntities(options.catalogKey, {
          locale,
          language_group_key: group,
          pageSize: 5,
          status: 'published',
        });
        const hit =
          (result.list || []).find((row) => String(row.language_group_key || '') === group) ||
          result.list?.[0] ||
          null;
        if (!hit) return null;
        const data = entityData(hit);
        const slug = String(data[slugField] || hit.id).trim();
        if (!slug) return null;
        return { code: locale, href: options.pathForSlug(locale, slug) };
      } catch {
        return null;
      }
    })
  );

  const localeOptions = rows.filter(Boolean) as Array<{ code: string; href: string }>;
  if (!localeOptions.length) {
    return buildAlternateLinks(
      options.locales.map((code) => ({
        code,
        href: options.currentPath.replace(
          new RegExp(`^/${escapeRegExp(options.currentLocale)}(?=/|$)`),
          `/${code}`
        ),
      })),
      { defaultLocale: options.defaultLocale, origin: options.origin }
    );
  }

  return buildAlternateLinks(localeOptions, {
    defaultLocale: options.defaultLocale,
    origin: options.origin,
  });
}

export function entityGroupKey(row: CmsEntity | null | undefined) {
  return String(row?.language_group_key || '').trim();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Absolute-ize already-built alternate hrefs (for pages that already have localeOptions). */
export function withAbsoluteAlternates(
  links: Array<{ href: string; hreflang: string }>,
  origin?: string
) {
  return links.map((item) => ({
    ...item,
    href: toAbsoluteUrl(item.href, origin),
  }));
}
