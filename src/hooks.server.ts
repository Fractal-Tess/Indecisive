import type { Handle } from "@sveltejs/kit";
import { env as privEnv } from "$env/dynamic/private";
import { env as pubEnv } from "$env/dynamic/public";
import z from "zod";

z.object({
  SENDGRID_KEY: z.string(),
  RECEIVER_EMAIL: z.string(),
  PUBLIC_POCKETBASE_URL: z.string(),
  PUBLIC_ORIGIN_URL: z.string().url(),
}).parse({
  SENDGRID_KEY: privEnv.SENDGRID_KEY,
  RECEIVER_EMAIL: privEnv.RECEIVER_EMAIL,
  PUBLIC_POCKETBASE_URL: pubEnv.PUBLIC_POCKETBASE_URL,
  PUBLIC_ORIGIN_URL: pubEnv.PUBLIC_ORIGIN_URL,
});

export const handle: Handle = async ({ event, resolve }) => {
  return resolve(event);
};
