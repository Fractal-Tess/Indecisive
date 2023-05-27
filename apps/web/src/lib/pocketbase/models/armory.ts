import type { Record } from 'pocketbase';
import { pb } from '../pocketbase';
import type { Character, Artifact, Stats } from '@indecisive/types';
import { trpc } from '$lib/trpc/client';

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
    discordUser: {
      name: string;
      discordTag: string;
      discordId: string;
      discordId_new?: string;
    } & Record;
  };
} & Character &
  Record;

export const getArmoryCharacters = async () => {
  const chars = await pb
    .collection('armory_character')
    .getFullList<ExpandedCharacter>({ expand: 'discordUser' });

  const armoryData = chars.map(async char => {
    const promises: [
      Promise<ExpandedSnapshot>,
      ReturnType<typeof trpc.users.getUser.query>
    ] = [
      pb
        .collection('armory_character_snapshot')
        .getFirstListItem<ExpandedSnapshot>(`character='${char.id}'`, {
          sort: '-created',
          expand:
            'armory_character_snapshot_stats(characterSnapshot),armory_character_snapshot_artifact(characterSnapshot)'
        }),

      trpc.users.getUser.query({
        id: char.expand.discordUser?.discordId_new ?? null
      })
    ];

    const [snapshot, user] = await Promise.all(promises);

    return {
      char,
      user,
      stats:
        snapshot.expand['armory_character_snapshot_stats(characterSnapshot)'],
      artifacts:
        snapshot.expand[
          'armory_character_snapshot_artifact(characterSnapshot)'
        ],
      timestamp: snapshot.timestamp
    };
  });

  return structuredClone(await Promise.all(armoryData));
};
