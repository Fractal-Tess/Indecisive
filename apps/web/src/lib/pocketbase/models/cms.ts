import type { Record } from 'pocketbase';
import type PocketBase from 'pocketbase';

export type CMS = {
  unit: string;
  content: string;
} & Record;

export const getCms = async (pb: PocketBase, unit: string) => {
  return await pb
    .collection('CMS')
    .getFirstListItem<CMS>(`unit='${unit}'`)
    .then(res => res.content);
};
