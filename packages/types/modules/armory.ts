export type Character = {
  felsongCharacterId: string;
  name: string;
  class: string;
  race: string;
};

export type Artifact = {
  traits: number;
  name: string;
};

export type Stats = {
  level: number;
  ilevel: number;
  health: number;

  //   Defense
  armor: number;
  dodgePercent: number;
  parryPercent: number;
  blockPercent: number;

  //   Enchancements
  criticalPercent: number;
  hastePercent: number;
  masteryPercent: number;
  spirit: number;
  bonusArmor: number;
  multistrikePercent: number;
  leechPercentage: number;
  versatillityPercentage: number;
  avoidancePercentage: number;

  //   Attributes
  strength: number;
  agility: number;
  intellect: number;
  stamina: number;

  //    Attack
  damageFrom: number;
  damageTo: number;
  attackPower: number;
  attackSpeed: number;
  spellPower: number;
  manaRegen: number;
};
