import type { PageServerLoad } from './$types';
import { pb } from '$lib/pocketbase/pocketbase';
import type { Record } from 'pocketbase';

type Expansion = {
  label: string;
  thumbnail: string;
  expansion: string;
} & Record;

export const load = (async ({ params, url }) => {
  const records = await pb
    .collection('video_collection')
    .getFullList<Expansion>({
      filter: `expansion.name ='${params.expansion}'`
    });

  return {
    expansion: structuredClone(records)
  };
}) satisfies PageServerLoad;
