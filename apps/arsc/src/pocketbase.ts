import { env } from './env.js';
import Pocketbase from 'pocketbase';

export const pb = new Pocketbase(env.POCKETBASE_URL);

export const pocketbaseInit = async () => {
  await pb.admins.authWithPassword(
    env.POCKETBASE_EMAIL,
    env.POCKETBASE_PASSWORD
  );
};
