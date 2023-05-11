import { building } from "$app/environment";
import { env as envPub } from "$env/dynamic/public";
import { env as envPriv } from "$env/dynamic/private";
import Pocketbase from "pocketbase";

export const pb = new Pocketbase(envPub.PUBLIC_POCKETBASE_URL);

if (!building)
  await pb.admins.authWithPassword(
    envPriv.POCKETBASE_USER_EMAIL,
    envPriv.POCKETBASE_USER_PASSWORD
  );
