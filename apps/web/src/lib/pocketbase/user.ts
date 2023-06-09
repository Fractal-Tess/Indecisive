import { writable } from 'svelte/store';
import { pb } from './pocketbase';
import Cookies from 'js-cookie';
import { redirect } from '@sveltejs/kit';
import type { Record } from 'pocketbase';

type User = {
  avatarUrl: string;
  discordId: string;
  username: string;
};

type PBUser = {
  accessToken?: string;
  email: string;
  username: string;
} & Record;

const createUserStore = () => {
  const { subscribe, set, update } = writable<User | null>(null);

  return {
    subscribe,
    set,
    update,
    logout: async () => {
      pb.authStore.clear();
      Cookies.remove('pb_auth');
      set(null);
    },
    login: async () => {
      pb.authStore.clear();
      Cookies.remove('pb_auth');

      try {
        const authData = await pb.collection('users').authWithOAuth2<PBUser>({
          provider: 'discord',
          scopes: ['identify', 'email', 'guilds']
        });

        if (!authData.meta) throw new Error('Discord oAuth2 failed');
        await pb.collection('users').update(authData.record.id, {
          accessToken: authData.meta.accessToken
        });

        const authCookie = pb.authStore
          .exportToCookie({
            httpOnly: false
          })
          .split('=', 2)[1];

        if (!authCookie) throw new Error(`Auth cookie error`);

        Cookies.set('pb_auth', authCookie, {
          expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        });

        set({
          avatarUrl: authData.meta?.avatarUrl,
          discordId: authData.meta?.id,
          username: authData.record.username
        });
      } catch (error) {}

      redirect(303, '/');
    },
    init: async () => {
      const pbAuthCookie = Cookies.get('pb_auth');

      // No cookie
      if (!pbAuthCookie) return;

      pb.authStore.loadFromCookie('pb_auth=' + pbAuthCookie);
      // invalid
      if (!pb.authStore.isValid) {
        console.error('Auth store is not valid');
        return;
      }
      try {
        const user = await pb.collection('users').authRefresh<PBUser>();

        const res = await fetch('https://discord.com/api/users/@me', {
          headers: {
            Authorization: `Bearer ${user.record.accessToken}`
          }
        });
        const { id, avatar } = await res.json();

        set({
          avatarUrl: `https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`,
          discordId: user.meta?.id,
          username: user.record.username
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const user = createUserStore();
