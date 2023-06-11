import { pb } from '$lib/pocketbase/pocketbase';
import type { PageServerLoad } from './$types';

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
    .getFirstListItem<Item>("unit='contact_page'");
  return {
    content: text.content
  };
}) satisfies PageServerLoad;
