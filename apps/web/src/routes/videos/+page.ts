import type { PageLoad } from './$types';
import { getExpansions } from '$lib/pocketbase';

export const load = (async () => {
  const expansions = await getExpansions();
  return { expansions };
}) satisfies PageLoad;
