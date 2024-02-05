import type { PageLoad } from './$types';
import Pocketbase from 'pocketbase';
import { browser } from '$app/environment';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import { pb as pbClient } from '$lib/pocketbase/pocketbase';
import { CMS } from '$lib/pocketbase';

export const load = (async ({ parent }) => {
  let pb = pbClient;
  if (!browser) {
    pb = new Pocketbase(PUBLIC_POCKETBASE_URL);
    pb.authStore.loadFromCookie((await parent()).pbCookie);
  }

  return {
    content: {
      html: CMS(pb, 'about_page')
    }
  };
}) satisfies PageLoad;
