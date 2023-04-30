import type { PageLoad } from "./$types";
import { env } from "$env/dynamic/public";
import Pocketbase from "pocketbase";

type Item = {
  collection: string[];
  collectionId: string;
  collectionName: string;
  created: string;
  date: string;
  description: string;
  id: string;
  label: string;
  thumbnail: string;
  updated: string;
  yt_url: string;
  expand: Record<string, unknown>;
};

export const load = (async ({ params }) => {
  const pb = new Pocketbase(env.PUBLIC_POCKETBASE_URL);
  const video = await pb
    .collection("video")
    .getFirstListItem<Item>(`label ='${params.label}'`);

  return {
    video,
  };
}) satisfies PageLoad;
