import { initDiscord } from './discord/client.js';
import { startTRPC } from './trpc/server.js';

(async () => {
  await initDiscord();

  startTRPC();
})();
