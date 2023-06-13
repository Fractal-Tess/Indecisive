import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

// When on the server, user the `pb` instance on the locals
// DO NOT USE THIS PB INSTANCE ON THE SERVER SINCE IT IS SHARED.
