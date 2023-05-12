import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';

import { appRouter } from './router.js';
import { env } from '../env.js';

export const startTRPC = () => {
  console.log('Starting tRPC server.');
  createHTTPServer({
    middleware: cors({
      credentials: true,
      origin: (requestOrigin, callback) => callback(null, requestOrigin)
    }),
    router: appRouter
  }).listen(env.PORT);
};
