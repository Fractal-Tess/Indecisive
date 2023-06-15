import type { LayoutServerLoad } from './$types';
import { loadFlashMessage } from 'sveltekit-flash-message/server';

export const load = loadFlashMessage(async ({ locals }) => {
  return {
    user: locals.user,
    pbCookie: locals.pb.authStore.exportToCookie()
  };
}) satisfies LayoutServerLoad;
