import type { PageServerLoad } from './$types';
import { getArmoryCharacters } from '$lib/pocketbase/models/armory';

export const load: PageServerLoad = async () => {
  return {
    armory: {
      characters: getArmoryCharacters()
    }
  };
};
