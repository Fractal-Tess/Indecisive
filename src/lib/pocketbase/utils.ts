import type { ApplicationRecord } from "$lib/validation/application";
import { env } from "$env/dynamic/public";

export const saveApplicationToDatabase = async (record: ApplicationRecord) => {
  const formData = new FormData();

  for (const [key, val] of Object.entries(record)) {
    const v = val instanceof Number ? val.toString() : (val as string | Blob);
    formData.append(key, v);
  }

  const result = await pb.collection("application").create(formData);
  return result;
};

export const recordImageToUrl = (
  record: PocketbaseRecord,
  image: string,
  thumb?: ImageThumb
) => {
  let url = `${env.PUBLIC_POCKETBASE_URL}/api/files/${record.collectionId}/${record.id}/${image}`;
  url += thumb ? `?${thumb.x}x${thumb.y}` : "";
  return url;
};

import type { RequestEvent } from "@sveltejs/kit";
import { pb } from "$lib/pocketbase";
import type { ImageThumb, PocketbaseRecord } from "$lib/types";

export const logRequest = async (event: RequestEvent) => {
  const ip = event.request.headers.get("x-forwarded-for");
  if (!ip) return;
  try {
    const r = await pb.collection("clicks").getFirstListItem(`ip='${ip}'`);
    await pb.collection("clicks").update(r.id, { count: r.count + 1 });
  } catch (error) {
    await pb.collection("clicks").create({
      ip,
      count: 1,
    });
  }
};
