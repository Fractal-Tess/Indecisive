import { trpc } from "./trpc.js";
import { router as applicationRouter } from "./application/router.js";

export const appRouter = trpc.router({
  application: applicationRouter,
});
