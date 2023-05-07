import type { PageLoad } from './$types';
import { env } from '$env/dynamic/public';
import Pocketbase from 'pocketbase';

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
  const pb = new Pocketbase(env.PUBLIC_POCKETBASE_URL);
  const text = await pb.collection('about').getFirstListItem<Item>('');
  return {
    content: text.content
  };
}) satisfies PageLoad;
