import { pb } from '$lib/pocketbase/pocketbase';
import type { PageServerLoad } from './$types';

type Item = {
  collection: string[];
  collectionId: string;
  collectionName: string;
  created: string;
  date: string;
  description: string;
  id: string;
  label: string;
  thumbnail: string;
  updated: string;
  yt_url: string;
  expand: Record<string, unknown>;
};

export const load = (async ({ params }) => {
  const video = await pb
    .collection('video')
    .getFirstListItem<Item>(`label ='${params.label}'`);

  return {
    video: structuredClone(video)
  };
}) satisfies PageServerLoad;
