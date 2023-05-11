import { pb } from "$lib/pocketbase/pocketbase";
import type { PageServerLoad } from "./$types";

type Item = {
  collection: string[];
  collectionId: string;
  collectionName: string;
  created: string;
  date: string;
  description: string;
  id: string;
  label: string;
  thumbnail: string | null;
  updated: string;
  yt_url: string;
  expand: Record<string, unknown>;
};

export const load = (async ({ params }) => {
  const videos = await pb.collection("video").getFullList<Item>({
    filter: `collection.label ='${params.collection}'`,
  });

  return {
    videos: structuredClone(videos),
  };
}) satisfies PageServerLoad;
