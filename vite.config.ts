import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { join } from 'node:path';

const config: UserConfig = {
  plugins: [sveltekit()],

  resolve: {
    alias: {
      $types: join(__dirname, 'src/types.ts'),
      $stores: join(__dirname, 'src/lib/stores/'),
      $layout: join(__dirname, 'src/lib/layout/'),
      $data: join(__dirname, 'src/lib/data/'),
      $components: join(__dirname, 'src/lib/components/'),
      $styles: join(__dirname, 'src/app.postcss')
    }
  },

  server: {
    port: 5173,
    strictPort: true,
    host: '0.0.0.0'
  }
};

export default config;
