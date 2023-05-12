import type { PageServerLoad } from './$types';
import { pb } from '$lib/pocketbase/pocketbase';
import type { PocketbaseRecord } from '$lib/types';

interface Expansion extends PocketbaseRecord {
  label: string;
  thumbnail: string;
  expansion: string;
}

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
