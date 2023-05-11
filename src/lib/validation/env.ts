import z from "zod";
import { env as privEnv } from "$env/dynamic/private";
import { env as pubEnv } from "$env/dynamic/public";
import { building } from "$app/environment";

export const validateEnv = () => {
  if (building) return;
  const validator = z.object({
    SENDGRID_KEY: z.string(),
    RECEIVER_EMAIL: z.string(),
    PUBLIC_POCKETBASE_URL: z.string(),
    POCKETBASE_USER_EMAIL: z.string(),
    POCKETBASE_USER_PASSWORD: z.string(),
    PUBLIC_ORIGIN_URL: z.string().url(),
    DISCORD_BOT_TOKEN: z.string(),
    DISCORD_CHANNEL_ID: z.string(),
    DISCORD_ONAPPLICATION_TAG: z.string(),
  });

  validator.parse({
    SENDGRID_KEY: privEnv.SENDGRID_KEY,
    RECEIVER_EMAIL: privEnv.RECEIVER_EMAIL,
    PUBLIC_POCKETBASE_URL: pubEnv.PUBLIC_POCKETBASE_URL,
    POCKETBASE_USER_EMAIL: privEnv.POCKETBASE_USER_EMAIL,
    POCKETBASE_USER_PASSWORD: privEnv.POCKETBASE_USER_PASSWORD,
    PUBLIC_ORIGIN_URL: pubEnv.PUBLIC_ORIGIN_URL,
    DISCORD_BOT_TOKEN: privEnv.DISCORD_BOT_TOKEN,
    DISCORD_CHANNEL_ID: privEnv.DISCORD_BOT_TOKEN,
    DISCORD_ONAPPLICATION_TAG: privEnv.DISCORD_ONAPPLICATION_TAG,
  });
};
