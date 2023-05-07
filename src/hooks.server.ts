import Pocketbase from 'pocketbase';
import type { Handle } from '@sveltejs/kit';
import { env as privEnv } from '$env/dynamic/private';
import { env, env as pubEnv } from '$env/dynamic/public';
import z from 'zod';
import { building } from '$app/environment';

if (!building)
  z.object({
    SENDGRID_KEY: z.string(),
    RECEIVER_EMAIL: z.string(),
    PUBLIC_POCKETBASE_URL: z.string(),
    PUBLIC_ORIGIN_URL: z.string().url()
  }).parse({
    SENDGRID_KEY: privEnv.SENDGRID_KEY,
    RECEIVER_EMAIL: privEnv.RECEIVER_EMAIL,
    PUBLIC_POCKETBASE_URL: pubEnv.PUBLIC_POCKETBASE_URL,
    PUBLIC_ORIGIN_URL: pubEnv.PUBLIC_ORIGIN_URL
  });

const pb = new Pocketbase(env.PUBLIC_POCKETBASE_URL);
export const handle: Handle = async ({ event, resolve }) => {
  const ip = event.request.headers.get('x-forwarded-for');
  try {
    if (ip) {
      const r = await pb.collection('clicks').getFirstListItem(`ip='${ip}'`);
      await pb.collection('clicks').update(r.id, { count: r.count + 1 });
    }
  } catch (error) {
    await pb.collection('clicks').create({
      ip,
      count: 1
    });
  }
  return resolve(event);
};
