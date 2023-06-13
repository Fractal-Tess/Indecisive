import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../../bot/src/trpc/trpc';
import { PUBLIC_TRPC_URL } from '$env/static/public';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: PUBLIC_TRPC_URL
    })
  ]
});
