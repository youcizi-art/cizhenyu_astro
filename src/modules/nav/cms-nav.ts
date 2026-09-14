import {
  entityData,
  listEntities,
  localePath,
  toErrorMessage,
  type CmsEntity,
} from '../cms';
import {
  collectionListHref,
  parseReferenceField,
  resolveReferenceNavChildren,
} from '../reference';
import type { SiteManifest } from '../site';
import { buildNavLinks, type NavLink } from './nav';

function relationIds(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v || '').trim()).filter(Boolean);
  if (typeof value === 'string' && value.trim()) return [value.trim()];
  return [];
}

function resolveHref(locale: string, raw: string) {
  const url = String(raw || '').trim();
  if (!url) return localePath(locale, '/');
  if (/^https?:\/\//i.test(url) || url.startsWith('//')) return url;
  if (url.startsWith(`/${locale}/`) || url === `/${locale}`) return url;
  if (url.startsWith('/')) return localePath(locale, url);
  return localePath(locale, `/${url}`);
}

function sortItems(rows: CmsEntity[]) {
  return [...rows].sort((a, b) => {
    const da = entityData(a);
    const db = entityData(b);
    return Number(da.sort_order || 0) - Number(db.sort_order || 0);
  });
}

async function buildCmsNavLinks(locale: string): Promise<NavLink[] | null> {
  const menus = await listEntities('navMenu', { locale, pageSize: 20 });
  const header = (menus.list || []).find((row) => {
    const data = entityData(row);
    return String(data.menu_type || '') === 'header' || String(data.slug || '') === 'header';
  });
  if (!header) return null;

  const itemsResult = await listEntities('navMenuItem', { locale, pageSize: 100 });
  const owned = sortItems(
    (itemsResult.list || []).filter((row) => {
      const data = entityData(row);
      return relationIds(data.nav_menu_ids).includes(String(header.id));
    })
  );
  if (!owned.length) return null;

  const byParent = new Map<string, CmsEntity[]>();
  const roots: CmsEntity[] = [];
  for (const row of owned) {
    const parent = String(entityData(row).parent_id || '').trim();
    if (!parent) {
      roots.push(row);
      continue;
    }
    const list = byParent.get(parent) || [];
    list.push(row);
    byParent.set(parent, list);
  }

  const links: NavLink[] = [];
  for (const row of roots) {
    const data = entityData(row);
    const title = String(data.title || '').trim();
    if (!title) continue;
    const openInNewTab = Array.isArray(data.open_in_new_tab)
      ? data.open_in_new_tab.includes('yes')
      : Boolean(data.open_in_new_tab);
    const linkMode = String(data.link_mode || 'link');
    const nested = sortItems(byParent.get(String(row.id)) || []);

    if (linkMode === 'reference') {
      const children = await resolveReferenceNavChildren(data.target_reference, locale);
      const parsed = parseReferenceField(data.target_reference);
      const first = parsed.items[0];
      const href = first?.refType
        ? collectionListHref(locale, first.refType)
        : resolveHref(locale, String(data.link_url || '/'));
      links.push({
        label: title,
        href,
        openInNewTab,
        children: children.length ? children : undefined,
      });
      continue;
    }

    const href = resolveHref(locale, String(data.link_url || `/${String(data.slug || '')}`));
    const children: NavLink['children'] = [];
    for (const child of nested) {
      const cd = entityData(child);
      const childTitle = String(cd.title || '').trim();
      if (!childTitle) continue;
      if (String(cd.link_mode || 'link') === 'reference') {
        const refChildren = await resolveReferenceNavChildren(cd.target_reference, locale);
        children.push(...refChildren);
      } else {
        children.push({
          label: childTitle,
          href: resolveHref(locale, String(cd.link_url || '')),
        });
      }
    }

    links.push({
      label: title,
      href,
      openInNewTab,
      children: children.length ? children : undefined,
    });
  }

  return links.length ? links : null;
}

/** 优先 CMS 导航；失败或不完整时回退 manifest 模块链接 */
export async function loadNavLinks(
  site: SiteManifest,
  locale: string
): Promise<{ links: NavLink[]; warning?: string }> {
  try {
    const cms = await buildCmsNavLinks(locale);
    if (cms?.length) return { links: cms };
    return { links: buildNavLinks(site, locale) };
  } catch (error) {
    return {
      links: buildNavLinks(site, locale),
      warning: toErrorMessage(error, '导航加载失败，已使用本地菜单'),
    };
  }
}
