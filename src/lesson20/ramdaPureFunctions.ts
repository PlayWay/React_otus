import { compose, keys, reduce, sort, split } from "ramda";

// Задание 1
export type Team = { name: string; score: number };
export const getTopName = compose(
  (arr: Team[]) => arr[0].name,
  (teams) => sort((a, b) => b.score - a.score, teams)
);

// Задание 2
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = compose(
  ({ qsObj, keys }) =>
    keys.reduce((acc, cur, index) => {
      return `${acc}${index ? "&" : ""}${cur}=${qsObj[cur]}`;
    }, `?`),
  (qsObj: QsObj) => ({
    qsObj,
    keys: keys(qsObj),
  })
);

// Задание 3
export const parseQs = compose(
  reduce((acc, cur) => {
    if (cur.indexOf("=") < 0) return acc;
    const [prop = "NOT_PROP", value = "NOT_VALUE"] = cur.split("=");
    return { ...acc, [prop]: value };
  }, {} as QsObj),
  split("&"),
  (str: string) => str.substr(1)
);
