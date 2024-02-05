import { createPb } from '$lib/pocketbase';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const pbToken = event.request.headers.get('cookie') || ''
  const pb = createPb(pbToken)


  if (pb.authStore.isValid && pb.authStore.model)
    event.locals.user = {
      accessToken: pb.authStore.model.accessToken,
      avatarUrl: pb.authStore.model.avatarUrl,
      email: pb.authStore.model.email,
      refreshToken: pb.authStore.model.refreshToken,
      username: pb.authStore.model.username,
      discordId: pb.authStore.model.discordId
    };
  else event.locals.user = null;
  event.locals.pb = pb;

  const response = await resolve(event);
  response.headers.set(
    'set-cookie',
    pb.authStore.exportToCookie({ httpOnly: false })
  );
  return response;
};
