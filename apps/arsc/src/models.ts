import { pb } from './pocketbase.js';
import { ClientResponseError } from 'pocketbase';
import type { Artifact, Character, Csrf, Stats } from './types.js';

export const getCsrf = async (): Promise<Csrf> => {
  try {
    const record = await pb
      .collection('freakz_csrf_token')
      .getFirstListItem<Csrf>('');

    return record;
  } catch (error) {
    if (error instanceof ClientResponseError) {
      if (error.status === 404) {
        console.log(
          "There are no csrf entries inside of the 'freakz_csrf_token' table."
        );
        process.exit(1);
      } else {
        console.log('This should not be accessible');
        console.error(error.message);
        process.exit(1);
      }
    } else {
      console.error('getCsrf non-ClientResponseError error type.');
      console.error(error);
      process.exit(1);
    }
  }
};

export const deleteCsrf = async (csrf: Csrf) => {
  await pb.collection('freakz_csrf_token').delete(csrf.id);
};

/**
 * @retrun Returns the character ID
 */
export const createCharacter = async (
  character: Character
): Promise<string> => {
  try {
    const pbResult = await pb
      .collection('armory_character')
      .getFirstListItem(`felsongCharacterId='${character.felsongCharacterId}'`);
    return pbResult.id;
  } catch (error) {
    const pbResult = await pb.collection('armory_character').create(character);
    return pbResult.id;
  }
};

/**
 * @retrun Returns the generated snapshot's id
 */
export const createCharacterSnapshot = async (
  pbArmoryCharacterId: string
): Promise<string> => {
  const record = await pb.collection('armory_character_snapshot').create({
    character: pbArmoryCharacterId,
    timestamp: new Date()
  });
  return record.id;
};

export const createCharacterSnapshotStats = async (
  pbCharacterSnapshotId: string,
  stats: Stats
) => {
  await pb.collection('armory_character_snapshot_stats').create({
    ...stats,
    characterSnapshot: pbCharacterSnapshotId
  });
};

export const createCharacterSnapshotArtifact = async (
  pbCharacterSnapshotId: string,
  artifact: Artifact
) => {
  await pb.collection('armory_character_snapshot_artifact').create({
    ...artifact,
    characterSnapshot: pbCharacterSnapshotId
  });
};
