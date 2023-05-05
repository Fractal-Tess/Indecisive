import type { PageLoad } from './$types';
import { env } from '$env/dynamic/public';
import Pocketbase from 'pocketbase';

type Item = {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  name: string;
  thumbnail: string;
  updated: string;
  expand: Record<string, unknown>;
};

export const load = (async () => {
  const pb = new Pocketbase(env.PUBLIC_POCKETBASE_URL);
  const expansions = await pb.collection('expansion').getFullList<Item>();
  return {
    expansions
  };
}) satisfies PageLoad;
