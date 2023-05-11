import type { PageServerLoad } from "./$types";
import { pb } from "$lib/pocketbase/pocketbase";

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
  const record = await pb.collection("expansion").getFullList<Item>();
  return {
    expansions: structuredClone(record),
  };
}) satisfies PageServerLoad;
