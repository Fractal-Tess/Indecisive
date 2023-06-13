import { writable } from 'svelte/store';
import { redirect } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase/pocketbase';
import type { Record } from 'pocketbase';

export type User = {
  username: string;
  avatarUrl: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  discordId: string;
};

export const createUserStore = () => {
  const { subscribe, set, update } = writable<User | null>(null);

  return {
    subscribe,
    update,
    set,
    logout: () => {
      pb.authStore.clear();
      set(null);
    },
    login: {
      discord: async () => {
        try {
          const authData = await pb.collection('users').authWithOAuth2({
            provider: 'discord',
            scopes: ['identify', 'email', 'guilds']
          });

          if (!authData.meta) throw new Error('Discord oAuth2 failed');
          const user = await pb
            .collection('users')
            .update<User & Record>(authData.record.id, {
              accessToken: authData.meta.accessToken,
              avatarUrl: authData.meta.avatarUrl,
              refreshToken: authData.meta.refreshToken,
              discordId: authData.meta.id
            } as Omit<User, 'email' | 'username'>);
          set({
            accessToken: user.accessToken,
            avatarUrl: user.avatarUrl,
            email: user.email,
            refreshToken: user.refreshToken,
            username: user.username,
            discordId: user.discordId
          });
        } catch (error) {
          console.error(error);
        }
        redirect(303, '/');
      }
    }
  };
};
