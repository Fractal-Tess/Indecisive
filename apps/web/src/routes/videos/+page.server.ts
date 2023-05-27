import type { PageServerLoad } from './$types';
import { pb } from '$lib/pocketbase/pocketbase';
import type { Record } from 'pocketbase';

type Item = {
  created: string;
  thumbnail: string;
} & Record;

export const load = (async () => {
  const record = await pb.collection('expansion').getFullList<Item>();
  return {
    expansions: structuredClone(record)
  };
}) satisfies PageServerLoad;
