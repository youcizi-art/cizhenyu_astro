/**
 * 从 b2b-collections.json 生成 src/modules/cms/catalog.ts
 *
 * 集合文件解析顺序（交付机通常无 payload，沿用已提交的 catalog.ts）：
 * 1. CIZHENYU_B2B_COLLECTIONS（文件绝对/相对路径）
 * 2. CIZHENYU_PAYLOAD_ROOT/sites/b2b/b2b-collections.json
 * 3. 常见兄弟目录：../cizhenyu_payload、../../cizhenyu_payload
 * 4. 仓库内可选快照：schemas/b2b-collections.json
 * 均不存在且 catalog.ts 已存在 → 跳过（客户机 / CI 交付）
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const OUT_PATH = path.resolve(root, 'src/modules/cms/catalog.ts');

function resolveCollectionsPath() {
  const direct = process.env.CIZHENYU_B2B_COLLECTIONS?.trim();
  if (direct) return path.resolve(direct);

  const payloadRoot = process.env.CIZHENYU_PAYLOAD_ROOT?.trim();
  if (payloadRoot) {
    return path.resolve(payloadRoot, 'sites/b2b/b2b-collections.json');
  }

  const candidates = [
    path.resolve(root, '../cizhenyu_payload/sites/b2b/b2b-collections.json'),
    path.resolve(root, '../../cizhenyu_payload/sites/b2b/b2b-collections.json'),
    path.resolve(root, 'schemas/b2b-collections.json'),
  ];
  return candidates.find((p) => fs.existsSync(p)) || candidates[0];
}

/** modelSlug → 模块键（稳定、可读） */
function toModuleKey(modelSlug, collectionSlug) {
  const raw = String(modelSlug || collectionSlug || '').trim();
  if (!raw) return '';
  const stripped = raw.replace(/^b2b_/, '');
  return stripped.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function main() {
  const collectionsPath = resolveCollectionsPath();
  if (!fs.existsSync(collectionsPath)) {
    if (fs.existsSync(OUT_PATH)) {
      console.warn(
        `[sync:catalog] 未找到集合源（${collectionsPath}），沿用已有 catalog.ts（交付场景正常）`,
      );
      process.exit(0);
    }
    console.error(
      `[sync:catalog] 找不到集合文件，且无可用 catalog.ts。\n` +
        `可设置 CIZHENYU_B2B_COLLECTIONS 或 CIZHENYU_PAYLOAD_ROOT，或将快照放到 schemas/b2b-collections.json`,
    );
    process.exit(1);
  }

  const rows = JSON.parse(fs.readFileSync(collectionsPath, 'utf8'));
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

/** 将模板路径 b2b/.../b2b_* 改写为站点 ns（SITE_KEY ≡ collectionNamespace） */
export function rewriteCatalogPath(dataPath: string, namespace: string): string {
  const ns = String(namespace || 'b2b').trim() || 'b2b';
  const path = String(dataPath || '').trim();
  if (!path || ns === 'b2b') return path;
  return path.replace(/(^|\\/)b2b\\//g, \`\$1\${ns}/\`).replace(/(^|\\/)b2b_/g, \`\$1\${ns}_\`);
}

export function collectionDataPath(key: CatalogKey, namespace = 'b2b'): string {
  return rewriteCatalogPath(catalog[key].dataPath, namespace);
}
`;

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, body, 'utf8');
  console.log(`已写入 ${OUT_PATH}（${Object.keys(catalog).length} 项，源: ${collectionsPath}）`);
}

main();
