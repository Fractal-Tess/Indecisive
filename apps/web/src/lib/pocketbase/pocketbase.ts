import { browser } from '$app/environment';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';


// Helper to create pocketbase instance
// 
// This is used on the server to create a new instance
// on every request in the hooks.server.ts file.
// Only available on the server. 
// Only available in +page.server.ts files
export function createPb(token?:string) {
    const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
    if (token) {
        pb.authStore.loadFromCookie(token)
    }
    return pb
}

// This creates the Pocketbase instance on the client
// Only should be used on the client
export const pb = createPb()
// When on the server, user the `pb` instance on the locals
// DO NOT USE THIS PB INSTANCE ON THE SERVER SINCE IT IS SHARED.


// In case pocketbase is needed in a +page.ts file,
// where normally the locals are not available,
// we create a pb instance in the load function by calling this function.
export function getPb(token?:string) {
    if(browser) {
        return pb;
    }
    createPb(token)
}

