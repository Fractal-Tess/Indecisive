import type { Handle } from '@sveltejs/kit';
import { validateEnv } from '$lib/validation/env';
import { initPocketbase } from '$lib/pocketbase/pocketbase';
import { building } from '$app/environment';
import { startArmoryCache } from '$lib/pocketbase/models/armory';

if (!building) {
  validateEnv();
  await initPocketbase();
  startArmoryCache();
}

export const handle: Handle = async ({ event, resolve }) => {
  return resolve(event);
};
