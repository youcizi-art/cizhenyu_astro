import {
  entityData,
  listEntities,
  type CmsEntity,
  type CmsQuery,
  type PublicPages,
} from '../cms';

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
};

function toItem(row: CmsEntity): FaqItem {
  const data = entityData(row);
  return {
    id: String(row.id),
    question: String(data.question || ''),
    answer: String(data.answer || ''),
    sortOrder: Number(data.sort_order || 0) || 0,
  };
}

export async function listFaqs(query?: CmsQuery): Promise<{ items: FaqItem[]; pages: PublicPages }> {
  const result = await listEntities('faq', query);
  const items = result.list.map(toItem).sort((a, b) => a.sortOrder - b.sortOrder);
  return { items, pages: result.pages };
}
