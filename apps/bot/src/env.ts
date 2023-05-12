import { config } from 'dotenv';
import z from 'zod';

const envValidator = z.object({
  DISCORD_BOT_TOKEN: z.string(),
  DISCORD_CHANNEL_ID: z.string(),
  DISCORD_ONAPPLICATION_TAG: z.string(),
  PORT: z.string().transform(Number)
});

config();

export const env = envValidator.parse(process.env);
