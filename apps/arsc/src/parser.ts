import { load } from 'cheerio';
import { Character, Stats, Artifact } from './types.js';
import { CustomError } from './error.js';

export const parseArmoryCharacter = (html: string) => {
  const $ = load(html);
  const felsongCharacterId = $('div#module_breadcrumb div.grid ul li a:gt(1)')
    .attr('ajax')
    ?.replace('armory/', '');

  if (!felsongCharacterId)
    throw new CustomError(
      'parse',
      'cannot parse character id on character armory page'
    );

  const character: Character = {
    felsongCharacterId,
    name: $('div.character_datas h1.capitalize').text().trim(),
    class: $('div.character-spec div.character_class.capitalize').text().trim(),
    race: $('div.character_race.capitalize').text().trim()
  };

  const stats: Stats = {
    health: +$(
      'div#character-attributes.stats-container div.stats-row div.health h4'
    )
      .text()
      .trim()
      .replace(/health\s+/g, ''),
    ilevel: +$('div.character-ilevel.inner span.ilevel').text().trim(),
    level: +$('div.avatar div.char_icon').text().trim(),
    ...(() => {
      const dataArray1 = $(
        'div.stats div.right-stats div.stats-block ul li div.value'
      )
        .text()
        .trim()
        .replace(/%/g, '')
        .split(/\s+/g)
        .map(Number);

      const dataArray2 = $(
        'div#character-attributes.stats-container div.stats div.left-stats div.stats-block:gt(0) ul li div.value'
      )
        .text()
        .trim()
        .split(/\s+/g)
        .map(Number);

      return {
        // Defensive
        armor: dataArray1[0],
        dodgePercent: dataArray1[1],
        parryPercent: dataArray1[2],
        blockPercent: dataArray1[3],
        // Enchcements
        criticalPercent: dataArray1[4],
        hastePercent: dataArray1[5],
        masteryPercent: dataArray1[6],
        spirit: dataArray1[7],
        bonusArmor: dataArray1[8],
        multistrikePercent: dataArray1[9],
        leechPercentage: dataArray1[10],
        versatillityPercentage: dataArray1[11],
        avoidancePercentage: dataArray1[12],
        // Attributes
        strength: dataArray2[0],
        agility: dataArray2[1],
        intellect: dataArray2[2],
        stamina: dataArray2[3],
        //    Attack
        damageFrom: dataArray2[4],
        damageTo: dataArray2[6],
        attackPower: dataArray2[7],
        attackSpeed: dataArray2[8],
        // Spell
        spellPower: dataArray2[9],
        manaRegen: dataArray2[10]
      };
    })()
  };

  const artifacts: Artifact[] = $('div.stats div.left-stats div.stats-block')
    .first()
    .find('ul > li')
    .map((i, e) => {
      if (i === 0) return;
      const text = $(e).text().trim();
      return {
        name: text.split(':')[0].trim(),
        traits: parseInt(
          text
            .split(':')[1]
            .replace(/\w*\s+/g, '')
            .trim()
        )
      };
    })
    .get();

  return { character, stats, artifacts };
};
