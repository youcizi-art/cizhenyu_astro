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
  // 去掉任意 locale 前缀后按当前 locale 重建，避免 seed 写死 /zh-CN/... 在其他语种串链
  const stripped = url.replace(/^\/[a-z]{2}(?:-[A-Za-z]{2})?(?=\/|$)/i, '') || '/';
  if (stripped.startsWith('/')) return localePath(locale, stripped);
  return localePath(locale, `/${stripped}`);
}

function sortItems(rows: CmsEntity[]) {
  return [...rows].sort((a, b) => {
    const da = entityData(a);
    const db = entityData(b);
    return Number(da.sort_order || 0) - Number(db.sort_order || 0);
  });
}

/**
 * seed 常把 nav_menu_ids 解析成某一语种（如 zh-CN）的菜单 UUID。
 * 其他语种的 header.id 不同，但 language_group_key 相同 —— 需按语组匹配。
 */
async function headerRelationIdSet(header: CmsEntity): Promise<Set<string>> {
  const ids = new Set<string>([String(header.id)]);
  const group = String(header.language_group_key || '').trim();
  if (!group) return ids;
  try {
    const all = await listEntities('navMenu', { pageSize: 50 });
    for (const row of all.list || []) {
      if (String(row.language_group_key || '') === group) {
        ids.add(String(row.id));
      }
    }
  } catch {
    // 仅保留当前 locale 的 header.id
  }
  return ids;
}

/** parent_id 也可能指向其他语种实体，按 language_group_key 归并 */
function parentKey(row: CmsEntity) {
  const parent = String(entityData(row).parent_id || '').trim();
  return parent;
}

async function buildCmsNavLinks(locale: string): Promise<NavLink[] | null> {
  const menus = await listEntities('navMenu', { locale, pageSize: 20 });
  const header = (menus.list || []).find((row) => {
    const data = entityData(row);
    return String(data.menu_type || '') === 'header' || String(data.slug || '') === 'header';
  });
  if (!header) return null;

  const menuIds = await headerRelationIdSet(header);
  const itemsResult = await listEntities('navMenuItem', { locale, pageSize: 100 });
  const owned = sortItems(
    (itemsResult.list || []).filter((row) => {
      const data = entityData(row);
      return relationIds(data.nav_menu_ids).some((id) => menuIds.has(id));
    })
  );
  if (!owned.length) return null;

  // 构建 parent 索引：同时支持「当前语种 id」与「跨语种同组 id」
  const idToGroup = new Map<string, string>();
  const groupToLocalId = new Map<string, string>();
  for (const row of owned) {
    const gid = String(row.language_group_key || '').trim();
    idToGroup.set(String(row.id), gid || String(row.id));
    if (gid) groupToLocalId.set(gid, String(row.id));
  }

  const byParent = new Map<string, CmsEntity[]>();
  const roots: CmsEntity[] = [];
  for (const row of owned) {
    const parent = parentKey(row);
    if (!parent) {
      roots.push(row);
      continue;
    }
    const parentLocal =
      groupToLocalId.get(idToGroup.get(parent) || '') ||
      groupToLocalId.get(parent) ||
      parent;
    const list = byParent.get(parentLocal) || [];
    list.push(row);
    byParent.set(parentLocal, list);
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
      const children = await resolveReferenceNavChildren(data.target_reference, locale, {
        collectionRootFallback: title,
        previewSize: 8,
      });
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
        const refChildren = await resolveReferenceNavChildren(cd.target_reference, locale, {
          collectionRootFallback: childTitle,
          previewSize: 8,
        });
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

/** 优先 CMS 导航；失败或不完整时回退 manifest 模块链接（会带 warning） */
export async function loadNavLinks(
  site: SiteManifest,
  locale: string
): Promise<{ links: NavLink[]; warning?: string; source: 'cms' | 'manifest' }> {
  try {
    const cms = await buildCmsNavLinks(locale);
    if (cms?.length) return { links: cms, source: 'cms' };
    return {
      links: buildNavLinks(site, locale),
      source: 'manifest',
      warning: 'CMS 导航为空，已使用站点模块默认菜单',
    };
  } catch (error) {
    return {
      links: buildNavLinks(site, locale),
      source: 'manifest',
      warning: toErrorMessage(error, '导航加载失败，已使用本地菜单'),
    };
  }
}
