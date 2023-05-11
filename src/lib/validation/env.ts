import { env } from "$env/dynamic/private";
import z from "zod";

export const validateEnv = () => {
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
    SENDGRID_KEY: env.SENDGRID_KEY,
    RECEIVER_EMAIL: env.RECEIVER_EMAIL,
    PUBLIC_POCKETBASE_URL: env.PUBLIC_POCKETBASE_URL,
    POCKETBASE_USER_EMAIL: env.POCKETBASE_USER_EMAIL,
    POCKETBASE_USER_PASSWORD: env.POCKETBASE_USER_PASSWORD,
    PUBLIC_ORIGIN_URL: env.PUBLIC_ORIGIN_URL,
    DISCORD_BOT_TOKEN: env.DISCORD_BOT_TOKEN,
    DISCORD_CHANNEL_ID: env.DISCORD_BOT_TOKEN,
    DISCORD_ONAPPLICATION_TAG: env.DISCORD_ONAPPLICATION_TAG,
  });
};
