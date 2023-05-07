import Pocketbase from 'pocketbase';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';

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
  const disclaimer = await pb
    .collection('text')
    .getFirstListItem<Item>("unit='application_disclaimer_page'");
  const wanted = await pb
    .collection('text')
    .getFirstListItem<Item>("unit='wanted_classes'");
  return {
    disclaimerContent: disclaimer.content,
    wantedContent: wanted.content
  };
}) satisfies PageServerLoad;
