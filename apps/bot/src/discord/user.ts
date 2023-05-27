import { client } from './client.js';

export const getUser = async (id: string) => {
  const user = await client.users.fetch(id);
  if (!user) return null;
  return {
    avatar: user.avatarURL(),
    username: user.username
  };
};
