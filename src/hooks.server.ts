import "$lib/discord";

import type { Handle } from "@sveltejs/kit";
import { validateEnv } from "$lib/validation/env";
import { logRequest } from "$lib/pocketbase";

validateEnv();

export const handle: Handle = async ({ event, resolve }) => {
  logRequest(event);
  return resolve(event);
};
