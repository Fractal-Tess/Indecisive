import type { PageServerLoad } from "./$types";
import type { PocketbaseRecord } from "$lib/types";
import { pb } from "$lib/pocketbase/pocketbase";

interface VideoCollection extends PocketbaseRecord {
  label: string;
  parent_collection: string[];
  thumbnail: string;
  top_level: boolean;
}

export const load = (async () => {
  const records = await pb
    .collection("video_collection_v2")
    .getFullList<VideoCollection>({
      filter: `top_level=true`,
    });
  return {
    collections: structuredClone(records),
  };
}) satisfies PageServerLoad;
