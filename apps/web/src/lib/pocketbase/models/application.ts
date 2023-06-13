import type { Application } from '@indecisive/types';
import { pb } from '$lib/pocketbase/pocketbase';
import type { Record } from 'pocketbase';

export const saveApplication = async (record: Application) => {
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

  return result as Record & Application & { uiScreenshot: string };
};
