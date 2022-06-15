// Задание 1
export type OriginalTeam = {
  size: number;
  name: string;
  league: string;
};

export type ExpectedTeam = {
  name: string;
  league: string;
  roster: number;
};

export const originalTeamToExpectedTeam1 = (
  originalTeam: OriginalTeam
): ExpectedTeam => {
  const { league } = originalTeam;
  return {
    league,
    name: "New York Badgers",
    roster: 25,
  };
};

// Задание 2
export type SomeArray = Array<number | string>;

export const originalArrayToExpectedArray = (
  originalArray: SomeArray
): SomeArray => {
  const [, , three, four] = originalArray;
  return ["two", three, four, 5];
};

// Задание 3

export type Team = {
  name: string;
  captain: {
    name: string;
    age: number;
  };
};

export const originalTeamToExpectedTeam = (originalTeam: Team): Team => {
  const { name, captain } = originalTeam;
  return { name, captain: { ...captain, age: 28 } };
};
