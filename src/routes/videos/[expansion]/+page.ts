import type { PageLoad } from './$types';
import { env } from '$env/dynamic/public';
import Pocketbase from 'pocketbase';

type Item = {
  collectionId: string;
  collectionName: string;
  created: string;
  expansion: string;
  id: string;
  label: string;
  thumbnail: string;
  updated: string;
  expand: Record<string, unknown>;
};

export const load = (async ({ params, url }) => {
  const pb = new Pocketbase(env.PUBLIC_POCKETBASE_URL);
  const videoCollection = await pb
    .collection('video_collection')
    .getFullList<Item>({
      filter: `expansion.name ='${params.expansion}'`
    });

  return {
    videoCollection,
    url
  };
}) satisfies PageLoad;
