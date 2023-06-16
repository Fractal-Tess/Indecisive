import { invalidateAll } from '$app/navigation';
import { pb } from '$lib/pocketbase/pocketbase';

pb.authStore.loadFromCookie(document.cookie);
pb.authStore.onChange(() => {
  document.cookie = pb.authStore.exportToCookie({
    httpOnly: false,
    secure: false
  });
  invalidateAll();
});
if (pb.authStore.isValid) pb.collection('users').authRefresh();
