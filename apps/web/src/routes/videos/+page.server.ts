import type { PageServerLoad } from './$types';
import type { Record } from 'pocketbase';

type Item = {
  created: string;
  thumbnail: string;
} & Record;

export const load = (async ({ locals }) => {
  const record = await locals.pb.collection('expansion').getFullList<Item>();
  return {
    expansions: structuredClone(record)
  };
}) satisfies PageServerLoad;
