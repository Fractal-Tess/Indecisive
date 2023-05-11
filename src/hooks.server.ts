import type { Handle } from "@sveltejs/kit";
import { validateEnv } from "$lib/validation/env";
import { initPocketbase } from "$lib/pocketbase/pocketbase";
import { logRequest } from "$lib/pocketbase/utils";
import { building } from "$app/environment";
import { initDiscord } from "$lib/discord/bot";

if (!building) {
  validateEnv();
  initDiscord();
  initPocketbase();
}

export const handle: Handle = async ({ event, resolve }) => {
  logRequest(event);
  return resolve(event);
};
