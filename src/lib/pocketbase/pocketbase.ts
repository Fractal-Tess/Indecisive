import { env } from "$env/dynamic/private";
import Pocketbase from "pocketbase";

export const pb = new Pocketbase(env.PUBLIC_POCKETBASE_URL);

export const initPocketbase = async () => {
  await pb.admins.authWithPassword(
    env.POCKETBASE_USER_EMAIL,
    env.POCKETBASE_USER_PASSWORD
  );
};
