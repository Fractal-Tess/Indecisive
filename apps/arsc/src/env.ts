import dotenv from 'dotenv';
import z from 'zod';

const envValidator = z.object({
  POCKETBASE_URL: z.string(),
  POCKETBASE_EMAIL: z.string(),
  POCKETBASE_PASSWORD: z.string(),
  GUILD_ID: z.string()
});
dotenv.config();
const env = envValidator.parse(process.env);

export { env };
