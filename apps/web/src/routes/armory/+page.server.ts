import type { PageServerLoad } from './$types';
import * as armory from '$lib/pocketbase/models/armory';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  const { user, pb } = locals;
  if (!user) throw redirect(302, '/sign-in');

  const armoryCharacterData = armory.armoryCharacterData || [];

  return {
    armoryCharacterData
  };
};
