/* 由 scripts/sync-b2b-catalog.mjs 生成，请勿手改 */
export type CatalogEntry = {
  key: string;
  name: string;
  collectionSlug: string;
  modelSlug: string;
  groupPath: string;
  dataPath: string;
  presentation: string;
};

export const catalog = {
  "article": {
    "key": "article",
    "name": "文章/博客",
    "collectionSlug": "b2b_article",
    "modelSlug": "article",
    "groupPath": "b2b/content",
    "dataPath": "b2b/content/b2b_article",
    "presentation": "list"
  },
  "inquiry": {
    "key": "inquiry",
    "name": "客户询盘",
    "collectionSlug": "b2b_inquiry",
    "modelSlug": "b2b_inquiry",
    "groupPath": "b2b/business",
    "dataPath": "b2b/business/b2b_inquiry",
    "presentation": "list"
  },
  "product": {
    "key": "product",
    "name": "产品",
    "collectionSlug": "b2b_product",
    "modelSlug": "b2b_product",
    "groupPath": "b2b/products",
    "dataPath": "b2b/products/b2b_product",
    "presentation": "list"
  },
  "caseStudy": {
    "key": "caseStudy",
    "name": "案例",
    "collectionSlug": "b2b_case_study",
    "modelSlug": "case_study",
    "groupPath": "b2b/content",
    "dataPath": "b2b/content/b2b_case_study",
    "presentation": "list"
  },
  "companyInfo": {
    "key": "companyInfo",
    "name": "公司信息",
    "collectionSlug": "b2b_company_info",
    "modelSlug": "company_info",
    "groupPath": "b2b/settings",
    "dataPath": "b2b/settings/b2b_company_info",
    "presentation": "single_form"
  },
  "contentBlock": {
    "key": "contentBlock",
    "name": "内容区块",
    "collectionSlug": "b2b_content_block",
    "modelSlug": "content_block",
    "groupPath": "b2b/content",
    "dataPath": "b2b/content/b2b_content_block",
    "presentation": "list"
  },
  "contentCategory": {
    "key": "contentCategory",
    "name": "内容分类",
    "collectionSlug": "b2b_content_category",
    "modelSlug": "content_category",
    "groupPath": "b2b/content",
    "dataPath": "b2b/content/b2b_content_category",
    "presentation": "list"
  },
  "entity": {
    "key": "entity",
    "name": "实体",
    "collectionSlug": "b2b_entity",
    "modelSlug": "entity",
    "groupPath": "b2b/knowledge",
    "dataPath": "b2b/knowledge/b2b_entity",
    "presentation": "list"
  },
  "faq": {
    "key": "faq",
    "name": "常见问题",
    "collectionSlug": "b2b_faq",
    "modelSlug": "faq",
    "groupPath": "b2b/content",
    "dataPath": "b2b/content/b2b_faq",
    "presentation": "list"
  },
  "industry": {
    "key": "industry",
    "name": "行业解决方案",
    "collectionSlug": "b2b_industry",
    "modelSlug": "industry",
    "groupPath": "b2b/content",
    "dataPath": "b2b/content/b2b_industry",
    "presentation": "list"
  },
  "navMenu": {
    "key": "navMenu",
    "name": "导航管理",
    "collectionSlug": "b2b_nav_menu",
    "modelSlug": "nav_menu",
    "groupPath": "b2b/settings",
    "dataPath": "b2b/settings/b2b_nav_menu",
    "presentation": "list"
  },
  "navMenuItem": {
    "key": "navMenuItem",
    "name": "导航菜单项",
    "collectionSlug": "b2b_nav_menu_item",
    "modelSlug": "nav_menu_item",
    "groupPath": "b2b/settings",
    "dataPath": "b2b/settings/b2b_nav_menu_item",
    "presentation": "list"
  },
  "onlineMessage": {
    "key": "onlineMessage",
    "name": "在线留言",
    "collectionSlug": "b2b_online_message",
    "modelSlug": "online_message",
    "groupPath": "b2b/business",
    "dataPath": "b2b/business/b2b_online_message",
    "presentation": "list"
  },
  "page": {
    "key": "page",
    "name": "独立页面",
    "collectionSlug": "b2b_page",
    "modelSlug": "page",
    "groupPath": "b2b/content",
    "dataPath": "b2b/content/b2b_page",
    "presentation": "list"
  },
  "productCategory": {
    "key": "productCategory",
    "name": "产品分类",
    "collectionSlug": "b2b_product_category",
    "modelSlug": "product_category",
    "groupPath": "b2b/products",
    "dataPath": "b2b/products/b2b_product_category",
    "presentation": "list"
  },
  "productSpecTemplate": {
    "key": "productSpecTemplate",
    "name": "产品规格模板",
    "collectionSlug": "b2b_product_spec_template",
    "modelSlug": "product_spec_template",
    "groupPath": "b2b/products",
    "dataPath": "b2b/products/b2b_product_spec_template",
    "presentation": "list"
  },
  "resource": {
    "key": "resource",
    "name": "资料下载",
    "collectionSlug": "b2b_resource",
    "modelSlug": "resource",
    "groupPath": "b2b/content",
    "dataPath": "b2b/content/b2b_resource",
    "presentation": "list"
  },
  "taxonomy": {
    "key": "taxonomy",
    "name": "语义分类",
    "collectionSlug": "b2b_taxonomy",
    "modelSlug": "taxonomy",
    "groupPath": "b2b/knowledge",
    "dataPath": "b2b/knowledge/b2b_taxonomy",
    "presentation": "list"
  },
  "translationFields": {
    "key": "translationFields",
    "name": "翻译字段",
    "collectionSlug": "b2b_translation_fields",
    "modelSlug": "translation_fields",
    "groupPath": "b2b/settings",
    "dataPath": "b2b/settings/b2b_translation_fields",
    "presentation": "single_form"
  }
} as const satisfies Record<string, CatalogEntry>;

export type CatalogKey = keyof typeof catalog;

export function getCatalogEntry(key: CatalogKey): CatalogEntry {
  return catalog[key];
}

/**
 * 按内容命名空间拼公开 API 路径。
 * catalog 以 b2b 模板为真源；运行时把 `b2b` / `b2b_` 换成 `ns`。
 */
export function collectionDataPath(key: CatalogKey, namespace = 'b2b'): string {
  const entry = catalog[key];
  const ns = String(namespace || 'b2b').trim() || 'b2b';
  if (ns === 'b2b') return entry.dataPath;
  const groupPath = entry.groupPath.replace(/^b2b(?=\/)/, ns);
  const slug = entry.collectionSlug.replace(/^b2b_/, `${ns}_`);
  return `${groupPath}/${slug}`;
}
