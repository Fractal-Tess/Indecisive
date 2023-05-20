import type { Handle } from '@sveltejs/kit';
import { validateEnv } from '$lib/validation/env';
import { initPocketbase } from '$lib/pocketbase/pocketbase';
import { building } from '$app/environment';

if (!building) {
  validateEnv();
  await initPocketbase();
}

export const handle: Handle = async ({ event, resolve }) => {
  return resolve(event);
};
