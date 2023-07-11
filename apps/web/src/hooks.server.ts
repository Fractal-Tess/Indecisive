import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle: Handle = async ({ event, resolve }) => {
  const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

  pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  if (pb.authStore.isValid && pb.authStore.model)
    event.locals.user = {
      accessToken: pb.authStore.model.accessToken,
      avatarUrl: pb.authStore.model.avatarUrl,
      email: pb.authStore.model.email,
      refreshToken: pb.authStore.model.refreshToken,
      username: pb.authStore.model.username,
      discordId: pb.authStore.model.discordId,
      id: pb.authStore.model.id
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
