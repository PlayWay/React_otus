// Задание 1
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
  const max: number = Math.max(...teams.map((i) => i.score));
  return teams.find((i) => i.score === max).name;
};

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string => {
  return Object.keys(qsObj).reduce((acc, cur, index) => {
    return `${acc}${index ? "&" : ""}${cur}=${qsObj[cur]}`;
  }, `?`);
};

// Задание 3

export const parseQs = (qs: string): QsObj => {
  return qs
    .substr(1)
    .split("&")
    .reduce((acc, cur) => {
      const [prop, value] = cur.split("=");
      return { ...acc, [prop]: value };
    }, {});
};
