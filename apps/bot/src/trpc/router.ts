import { trpc } from './trpc.js';
import { router as applicationRouter } from './application/router.js';
import { router as userRouter } from './user/router.js';

export const appRouter = trpc.router({
  application: applicationRouter,
  users: userRouter
});
