import { publicProcedure } from '../procedures/public.js';
import { trpc } from '../trpc.js';
import { z } from 'zod';
import { getUser } from '../../discord/user.js';

const validator = z.object({
  id: z.string().nullable()
});

export type Application = z.infer<typeof validator>;

export const router = trpc.router({
  getUser: publicProcedure.input(validator).query(({ input: { id } }) => {
    if (!id) return null;
    return getUser(id);
  })
});
