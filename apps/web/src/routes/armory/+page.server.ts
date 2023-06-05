import type { PageServerLoad } from './$types';
import * as armory from '$lib/pocketbase/models/armory';

export const load: PageServerLoad = async () => {
  const armoryCharacterData = armory.armoryCharacterData || [];

  return {
    armoryCharacterData
  };
};
