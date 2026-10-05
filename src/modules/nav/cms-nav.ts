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
 * 复用已拉取的 menus 列表，避免再打一次全量 navMenu。
 */
function headerRelationIdSetFromMenus(header: CmsEntity, menus: CmsEntity[]): Set<string> {
  const ids = new Set<string>([String(header.id)]);
  const group = String(header.language_group_key || '').trim();
  if (!group) return ids;
  for (const row of menus) {
    if (String(row.language_group_key || '') === group) {
      ids.add(String(row.id));
    }
  }
  return ids;
}

/** parent_id 也可能指向其他语种实体，按 language_group_key 归并 */
function parentKey(row: CmsEntity) {
  const parent = String(entityData(row).parent_id || '').trim();
  return parent;
}

async function buildCmsNavLinks(locale: string): Promise<NavLink[] | null> {
  // 当前语种菜单/菜单项 + 全量菜单（语组 id 匹配）并行拉取，禁止串行叠延迟
  const [menusResult, itemsResult, allMenusResult] = await Promise.all([
    listEntities('navMenu', { locale, pageSize: 20 }),
    listEntities('navMenuItem', { locale, pageSize: 100 }),
    listEntities('navMenu', { pageSize: 50 }).catch(() => ({ list: [] as CmsEntity[], pages: { total: 0, page: 1, pageSize: 50, totalPages: 0 } })),
  ]);

  const menus = menusResult.list || [];
  const header = menus.find((row) => {
    const data = entityData(row);
    return String(data.menu_type || '') === 'header' || String(data.slug || '') === 'header';
  });
  if (!header) return null;

  const menuIds = headerRelationIdSetFromMenus(header, allMenusResult.list?.length ? allMenusResult.list : menus);
  const owned = sortItems(
    (itemsResult.list || []).filter((row) => {
      const data = entityData(row);
      return relationIds(data.nav_menu_ids).some((id) => menuIds.has(id));
    })
  );
  if (!owned.length) return null;

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

  // 根菜单全部并行解析（禁止 for-await 串行叠延迟）
  // expandCollection=false：导航只保留集合入口/具体引用，不展开列表预览（避免 N 次 list）
  const links = (
    await Promise.all(
      roots.map(async (row) => {
        const data = entityData(row);
        const title = String(data.title || '').trim();
        if (!title) return null;
        const openInNewTab = Array.isArray(data.open_in_new_tab)
          ? data.open_in_new_tab.includes('yes')
          : Boolean(data.open_in_new_tab);
        const linkMode = String(data.link_mode || 'link');
        const nested = sortItems(byParent.get(String(row.id)) || []);

        if (linkMode === 'reference') {
          const parsed = parseReferenceField(data.target_reference);
          const first = parsed.items[0];
          const expandProducts =
            String(first?.refType || '').includes('product') &&
            !String(first?.refId || '').trim();
          const children = await resolveReferenceNavChildren(data.target_reference, locale, {
            collectionRootFallback: title,
            expandCollection: expandProducts,
          });
          const href = first?.refType
            ? collectionListHref(locale, first.refType)
            : resolveHref(locale, String(data.link_url || '/'));
          return {
            label: title,
            href,
            ...(openInNewTab ? { openInNewTab: true } : {}),
            children: children.length ? children : undefined,
          } as NavLink;
        }

        const href = resolveHref(locale, String(data.link_url || `/${String(data.slug || '')}`));
        const childLinks = (
          await Promise.all(
            nested.map(async (child) => {
              const cd = entityData(child);
              const childTitle = String(cd.title || '').trim();
              if (!childTitle) return [] as NonNullable<NavLink['children']>;
              if (String(cd.link_mode || 'link') === 'reference') {
                return resolveReferenceNavChildren(cd.target_reference, locale, {
                  collectionRootFallback: childTitle,
                  expandCollection: false,
                });
              }
              return [
                {
                  label: childTitle,
                  href: resolveHref(locale, String(cd.link_url || '')),
                },
              ];
            })
          )
        ).flat();

        return {
          label: title,
          href,
          ...(openInNewTab ? { openInNewTab: true } : {}),
          children: childLinks.length ? childLinks : undefined,
        } as NavLink;
      })
    )
  ).filter((item): item is NavLink => item != null);

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
