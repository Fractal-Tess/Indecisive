import {
  createCharacter,
  createCharacterSnapshot,
  createCharacterSnapshotArtifact,
  createCharacterSnapshotStats,
  deleteCsrf,
  getCsrf
} from './models.js';
import { pocketbaseInit } from './pocketbase.js';
import { fetchCharacterById, fetchGuildById } from './fetcher.js';
import { env } from './env.js';
import { CustomError } from './error.js';
import { parseArmoryCharacter } from './parser.js';
import { Csrf } from './types.js';

await pocketbaseInit();

let guildCharacters: { id: string }[] = [];
let csrf: Csrf;

for (;;) {
  csrf = await getCsrf();

  try {
    guildCharacters = await fetchGuildById(env.GUILD_ID, csrf);
  } catch (error) {
    if (error instanceof CustomError) {
      // If network error, retry
      if (error.type === 'network') {
        continue;
      }
      // If csrf is invalid
      else if (error.type === 'csrf') {
        await deleteCsrf(csrf);
        continue;
      }

      // TODO: Handle parse error
    } else {
      console.error(error);
    }
  }

  break;
}

for (const guildCharacater of guildCharacters) {
  const html = await fetchCharacterById(guildCharacater.id, csrf);
  const character = await parseArmoryCharacter(html);
  const pbArmoryCharacterId = await createCharacter(character.character);
  const pbCharacterSnapshotId = await createCharacterSnapshot(
    pbArmoryCharacterId
  );
  await createCharacterSnapshotStats(pbCharacterSnapshotId, character.stats);
  for (const artifact of character.artifacts) {
    await createCharacterSnapshotArtifact(pbCharacterSnapshotId, artifact);
  }
  console.log(`Inserted info for ${character.character.name}`);
}
