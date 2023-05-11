import type { PageServerLoad } from "./$types";
import { pb } from "$lib/pocketbase";

type Records = {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  label: string;
  parent_collection: string[];
  thumbnail: string;
  top_level: boolean;
  updated: string;
  expand: string;
};

export const load = (async () => {
  const records = await pb
    .collection("video_collection_v2")
    .getFullList<Records>({
      filter: `top_level=true`,
    });
  console.log(records);
  return {
    collections: structuredClone(records),
  };
}) satisfies PageServerLoad;
