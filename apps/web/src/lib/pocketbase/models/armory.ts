import type { Record } from 'pocketbase';
import { pb } from '$lib/pocketbase/pocketbase';
import type { Character, Artifact, Stats } from '@indecisive/types';
import { trpc } from '$lib/trpc/client';
import { building } from '$app/environment';

const getArmoryCharacters = async () => {
  type ExpandedSnapshot = {
    timestamp: string;
    character: string;
    expand: {
      'armory_character_snapshot_stats(characterSnapshot)': Stats & Record;
      'armory_character_snapshot_artifact(characterSnapshot)': (Artifact &
        Record)[];
    };
  } & Record;

  type ExpandedCharacter = {
    expand: {
      discordUser?: {
        name: string;
        discordTag: string;
        discordId: string;
        discordId_new?: string;
      } & Record;
    };
  } & Character &
    Record;

  // Query all characters in database
  const chars = await pb
    .collection('armory_character')
    .getFullList<ExpandedCharacter>({
      expand: 'discordUser'
    });

  // For each one
  const characterData = chars.map(async char => {
    const snapshotData = await pb
      .collection('armory_character_snapshot')
      .getFirstListItem<ExpandedSnapshot>(`character='${char.id}'`, {
        sort: '-created',
        expand:
          'armory_character_snapshot_stats(characterSnapshot), armory_character_snapshot_artifact(characterSnapshot)'
      });
    const discord = await trpc.users.getUser.query({
      id: char.expand.discordUser?.discordId_new || null
    });

    // TODO: Reduce the size of this object by removing some properties
    return {
      char,
      discord,
      artifacts:
        snapshotData.expand[
          'armory_character_snapshot_artifact(characterSnapshot)'
        ] ?? [],
      stats:
        snapshotData.expand[
          'armory_character_snapshot_stats(characterSnapshot)'
        ]
    };
  });
  const data = await Promise.all(characterData);

  return structuredClone(data);
};

export let armoryCharacterData: Awaited<
  ReturnType<typeof getArmoryCharacters>
> | null = null;

if (!building) {
  const time = 1800000;
  setInterval(async () => {
    armoryCharacterData = await getArmoryCharacters();
  }, time);
  armoryCharacterData = await getArmoryCharacters();
}
