import type { PageLoad } from './$types';
import { pb as pbClient } from '$lib/pocketbase/pocketbase';
import { browser } from '$app/environment';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';
import { getCms } from '$lib/pocketbase/models/cms';

export const load = (async ({ parent }) => {
  let pb = pbClient;
  if (!browser) {
    pb = new PocketBase(PUBLIC_POCKETBASE_URL);
    pb.authStore.loadFromCookie((await parent()).pbCookie);
  }

  return {
    content: {
      html: getCms(pb, 'raiding_schedule')
    }
  };
}) satisfies PageLoad;
