/**
 * 从 cizhenyu_payload/sites/b2b/b2b-collections.json 生成 src/modules/cms/catalog.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const COLLECTIONS_PATH = path.resolve(
  root,
  '../../cizhenyu_payload/sites/b2b/b2b-collections.json'
);
const OUT_PATH = path.resolve(root, 'src/modules/cms/catalog.ts');

/** modelSlug → 模块键（稳定、可读） */
function toModuleKey(modelSlug, collectionSlug) {
  const raw = String(modelSlug || collectionSlug || '').trim();
  if (!raw) return '';
  // b2b_product → product；article 保持 article
  const stripped = raw.replace(/^b2b_/, '');
  return stripped.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function main() {
  if (!fs.existsSync(COLLECTIONS_PATH)) {
    console.error(`找不到集合文件: ${COLLECTIONS_PATH}`);
    process.exit(1);
  }
  const rows = JSON.parse(fs.readFileSync(COLLECTIONS_PATH, 'utf8'));
  if (!Array.isArray(rows)) {
    console.error('b2b-collections.json 应为数组');
    process.exit(1);
  }

  /** @type {Record<string, object>} */
  const catalog = {};
  for (const row of rows) {
    const collectionSlug = String(row.slug || '').trim();
    const groupPath = String(row.groupPath || '').trim();
    const modelSlug = String(row.modelSlug || '').trim();
    if (!collectionSlug || !groupPath) continue;
    const key = toModuleKey(modelSlug, collectionSlug);
    if (!key) continue;
    if (catalog[key]) {
      console.warn(`重复模块键 ${key}，跳过 ${collectionSlug}`);
      continue;
    }
    const dataPath = `${groupPath}/${collectionSlug}`;
    catalog[key] = {
      key,
      name: String(row.name || key),
      collectionSlug,
      modelSlug: modelSlug || collectionSlug,
      groupPath,
      dataPath,
      presentation: String(row.presentationMode || 'list'),
    };
  }

  const body = `/* 由 scripts/sync-b2b-catalog.mjs 生成，请勿手改 */
export type CatalogEntry = {
  key: string;
  name: string;
  collectionSlug: string;
  modelSlug: string;
  groupPath: string;
  dataPath: string;
  presentation: string;
};

export const catalog = ${JSON.stringify(catalog, null, 2)} as const satisfies Record<string, CatalogEntry>;

export type CatalogKey = keyof typeof catalog;

export function getCatalogEntry(key: CatalogKey): CatalogEntry {
  return catalog[key];
}

export function collectionDataPath(key: CatalogKey): string {
  return catalog[key].dataPath;
}
`;

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, body, 'utf8');
  console.log(`已写入 ${OUT_PATH}（${Object.keys(catalog).length} 项）`);
}

main();
