import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
  return {
    user: locals.user,
    pbCookie: locals.pb.authStore.exportToCookie({ httpOnly: false })
  };
}) satisfies LayoutServerLoad;
