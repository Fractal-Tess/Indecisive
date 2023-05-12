import { publicProcedure } from '../procedures/public.js';
import { trpc } from '../trpc.js';
import { sendApplicationToApplicationChat } from '../../discord/application.js';
import { z } from 'zod';

const validator = z.object({
  name: z.string(),
  age: z.number(),
  country: z.string(),
  discord: z.string(),
  inGameName: z.string(),
  classAndSpec: z.string(),
  joinReason: z.string(),
  experience: z.string(),
  notes: z.string(),
  willingToPlayAnotherClass: z.enum(['Yes', 'No']),
  willingToPlayAnotherClassNotes: z.string(),
  attendRaidDaysNotes: z.string(),
  uiImageUrl: z.string()
});

export type Application = z.infer<typeof validator>;

export const router = trpc.router({
  new: publicProcedure.input(validator).mutation(({ input: application }) => {
    sendApplicationToApplicationChat(application);
  })
});
