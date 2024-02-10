import type { PageLoad } from './$types';
import { getExpansionVideos } from '$lib/pocketbase';

export const load = (async ({ params, fetch }) => {
  const videos = await getExpansionVideos(params.expansion, fetch);
  return {
    videos
  };
}) satisfies PageLoad;
