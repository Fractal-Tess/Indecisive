import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../../bot/src/trpc/trpc';
import { env } from '$env/dynamic/private';

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: env.TRPC_URL
    })
  ]
});
