import { env } from './env.js';
import Pocketbase from 'pocketbase';

const pb = new Pocketbase(env.POCKETBASE_URL);

const pocketbaseInit = async () => {
  await pb.admins.authWithPassword(
    env.POCKETBASE_EMAIL,
    env.POCKETBASE_PASSWORD
  );
};

export { pb, pocketbaseInit };
