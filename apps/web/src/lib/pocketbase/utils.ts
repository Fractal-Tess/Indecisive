import type { RequestEvent } from '@sveltejs/kit';

import type { Application } from '$lib/validation/application';
import { pb } from '$lib/pocketbase/pocketbase';

export const saveApplicationToDatabase = async (record: Application) => {
  const formData = new FormData();

  for (const [key, val] of Object.entries(record)) {
    if (val instanceof Blob && val.size > 0) {
      formData.append(key, val);
    } else if (typeof val === 'number') {
      formData.append(key, val.toString());
    } else if (typeof val === 'string') {
      formData.append(key, val);
    } else {
      console.log(
        `Should be unreachable - app db parser  key ${key} is instance of ${typeof val}`
      );
    }
  }

  const result = await pb.collection('application').create(formData);
  return result;
};

export const logRequest = async (event: RequestEvent) => {
  const ip = event.request.headers.get('x-forwarded-for');
  if (!ip) return;
  try {
    try {
      const r = await pb.collection('clicks').getFirstListItem(`ip='${ip}'`);
      await pb.collection('clicks').update(r.id, { count: r.count + 1 });
    } catch (error) {}
  } catch (error) {
    await pb.collection('clicks').create({
      ip,
      count: 1
    });
  }
};
