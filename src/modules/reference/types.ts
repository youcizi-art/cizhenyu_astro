/** 对齐后台 ReferenceItem：公开 API 原样返回 {} 或 [] */

export type ReferenceItem = {
  type: 'internal';
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  /** 目标集合 slug，如 b2b_product */
  refType?: string;
  /** 目标实体 id；缺省表示引用整个集合列表 */
  refId?: string;
};

export type ResolvedReferenceCard = {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  coverUrl: string;
  href: string;
  collectionSlug: string;
  /** true：仅指定了集合，未指定具体实体 */
  isCollectionRoot: boolean;
};

export type NavChildLink = {
  label: string;
  href: string;
  summary?: string;
  coverUrl?: string;
};
