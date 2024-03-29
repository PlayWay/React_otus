import { Colors, ComplexityType, GridItem } from "../types";
import { COLORS } from "./const";

type ColorsCount = Record<Colors, number>;

export const play = (size = 0, complexity: ComplexityType = "low") => {
  // формируем игровую сетку
  const playArray: Omit<GridItem, "color">[][] = getPlayArray(size);
  //считаем количество каждого цвета
  const colorsCount: ColorsCount = {} as ColorsCount;
  //определяем массив цветов
  const colors = getColorForComplexity(COLORS, complexity);
  //насыщяем исходный массив рандомными цветами
  const filledArray: GridItem[][] = playArray.map((row) =>
    row.map((cols) => {
      const color = fillColor(colors);
      colorsCount[color] = color in colorsCount ? ++colorsCount[color] : 1;
      return { ...cols, color };
    })
  );
  //Вычесляем цвет который нужно найти(которого больше всего в заполненном массиве выше)
  const { color: searchColor } = getSearchColor(colorsCount);
  //Вычисляем выйгрышную серию id
  const winSeries = filledArray
    .reduce((acc, cur) => [...acc, ...cur], [])
    .filter((i) => i.color === searchColor)
    .map((i) => i.id);

  return { filledArray, searchColor, winSeries };
};
/**
 * Генерирует массив игры(сетку)
 * @param size
 */
export const getPlayArray = (size = 3) => {
  return Array.from({ length: size }).map((_, rowIndex) => [
    ...Array.from({ length: size }).map((_, colIndex) => ({
      id: `${rowIndex}${colIndex}`,
      value: colIndex,
    })),
  ]);
};
/**
 * Рандомный цвет
 */
export const fillColor = (colorsArr: Colors[]) => {
  return <Colors>colorsArr[getRandomArbitrary(0, colorsArr.length)];
};
/**
 * Возвращает массив цветов исходя из уровня сложности
 * @param COLORS исходный массив цветов
 * @param complexity сложность
 */
export const getColorForComplexity = (
  COLORS: Colors[] = [],
  complexity: ComplexityType
) => {
  let colors;
  switch (complexity) {
    case "hard":
      colors = getRandomArrayItems(
        COLORS,
        Math.floor(COLORS.length / 4) <= 1 ? 2 : Math.floor(COLORS.length / 4)
      );
      break;
    case "middle":
      colors = getRandomArrayItems(COLORS, Math.ceil(COLORS.length / 2));
      break;
    default:
      colors = COLORS;
  }
  return colors;
};
/**
 * Возвращает рандомное значение в диапазоне
 * @param min
 * @param max
 */
export const getRandomArbitrary = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getSearchColor = (
  colorsCount: ColorsCount
): { color: Colors; count: number } => {
  const arr = Object.keys(colorsCount) as Colors[];
  return arr.reduce(
    (
      acc: { color: Colors; count: number },
      cur
    ): { color: Colors; count: number } => {
      return acc.count && acc.count > colorsCount[cur]
        ? acc
        : { color: cur, count: colorsCount[cur] };
    },
    {} as { color: Colors; count: number }
  );
};
/**
 * Возвращает массив рандомных элементов
 * @param items исходный массив
 * @param amount количество элементов
 */
export const getRandomArrayItems = (items: any[] = [], amount = 0) => {
  return [...Array(items.length).keys()]
    .sort(() => 0.5 - Math.random())
    .slice(0, amount)
    .map((index) => items[index]);
};
