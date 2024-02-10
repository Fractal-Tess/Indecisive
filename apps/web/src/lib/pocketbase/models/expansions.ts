import { getPb, type Fetch } from '$lib/pocketbase';
import type { PBRecord } from '$lib/utils';

type Expansion = PBRecord<{
  label: string;
  thumbnail: string;
  expansionVersion: string;
}>;

export async function getExpansions(fetch?: Fetch) {
  const pb = getPb();
  const expansions = await pb.collection('expansion').getFullList<Expansion>({
    fetch
  });
  return expansions;
}

type Videos = PBRecord<{
  label: string;
  ytEmbedCode: string;
}>;

export async function getExpansionVideos(
  expansionLabel: string,
  fetch?: Fetch
) {
  const pb = getPb();
  const expansionVideos = await pb.collection('video').getFullList<Videos>({
    filter: `expansion.label = '${expansionLabel}'`,
    fetch
  });
  return expansionVideos;
}
