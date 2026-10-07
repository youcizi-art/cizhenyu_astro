export {
  CHROME_EXTRA_PREFIXES,
  COLLECTION_PATH_PREFIXES,
  normalizePurgePathInput,
  pathsForChromePurge,
  pathsForCollections,
  toTemplateCollectionSlug,
} from './revalidate-map';
export {
  getCachedHtml,
  getLastPurge,
  purgeHtmlPaths,
  putCachedHtml,
  shouldUseHtmlCache,
  type PurgeResult,
} from './html-cache';
