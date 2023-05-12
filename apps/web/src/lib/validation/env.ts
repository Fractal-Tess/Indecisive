import { env } from "$env/dynamic/private";
import { env as envPub } from "$env/dynamic/public";
import z from "zod";

export const validateEnv = () => {
  const validator = z.object({
    SENDGRID_KEY: z.string(),
    RECEIVER_EMAIL: z.string(),
    PUBLIC_POCKETBASE_URL: z.string(),
    POCKETBASE_USER_EMAIL: z.string(),
    POCKETBASE_USER_PASSWORD: z.string(),
    PUBLIC_ORIGIN_URL: z.string().url(),
    TRPC_URL: z.string(),
  });

  validator.parse({
    SENDGRID_KEY: env.SENDGRID_KEY,
    RECEIVER_EMAIL: env.RECEIVER_EMAIL,
    PUBLIC_POCKETBASE_URL: envPub.PUBLIC_POCKETBASE_URL,
    POCKETBASE_USER_EMAIL: env.POCKETBASE_USER_EMAIL,
    POCKETBASE_USER_PASSWORD: env.POCKETBASE_USER_PASSWORD,
    PUBLIC_ORIGIN_URL: envPub.PUBLIC_ORIGIN_URL,
    TRPC_URL: env.TRPC_URL,
  });
};
