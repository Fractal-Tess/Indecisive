import type { PageServerLoad } from './$types';
import { pb } from '$lib/pocketbase/pocketbase';

type Item = {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  content: string;
  updated: string;
  expand: Record<string, unknown>;
};

export const load = (async () => {
  const text = await pb
    .collection('CMS')
    .getFirstListItem<Item>("unit='about_page'");
  return {
    content: text.content
  };
}) satisfies PageServerLoad;
