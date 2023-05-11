import type { RequestEvent } from "@sveltejs/kit";

import type { ApplicationRecord } from "$lib/validation/application";
import { pb } from "$lib/pocketbase/pocketbase";

export const saveApplicationToDatabase = async (record: ApplicationRecord) => {
  const formData = new FormData();

  for (const [key, val] of Object.entries(record)) {
    const v = val instanceof Number ? val.toString() : (val as string | Blob);
    formData.append(key, v);
  }

  const result = await pb.collection("application").create(formData);
  return result;
};

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
