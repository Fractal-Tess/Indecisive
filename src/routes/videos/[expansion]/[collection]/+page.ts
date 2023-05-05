import type { PageLoad } from './$types';
import { env } from '$env/dynamic/public';
import Pocketbase from 'pocketbase';

type Item = {
  collection: string[];
  collectionId: string;
  collectionName: string;
  created: string;
  date: string;
  description: string;
  id: string;
  label: string;
  thumbnail: string | null;
  updated: string;
  yt_url: string;
  expand: Record<string, unknown>;
};

export const load = (async ({ params }) => {
  const pb = new Pocketbase(env.PUBLIC_POCKETBASE_URL);
  const videos = await pb.collection('video').getFullList<Item>({
    filter: `collection.label ='${params.collection}'`
  });

  return {
    videos
  };
}) satisfies PageLoad;
