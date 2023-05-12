import { initTRPC } from "@trpc/server";
import { appRouter } from "./router.js";

export const trpc = initTRPC.create();

export type AppRouter = typeof appRouter;
