import { Colors, GridItem } from "../types";
import { COLORS } from "./const";

type ColorsCount = Record<Colors, number>;

export const play = (size = 0) => {
  // формируем игровую сетку
  const playArray: Omit<GridItem, "color">[][] = getPlayArray(size);
  //считаем количество каждого цвета
  const colorsCount: ColorsCount = {} as ColorsCount;
  //насыщяем исходный массив рандомными цветами
  const filledArray: GridItem[][] = playArray.map((row) =>
    row.map((cols) => {
      const color = fillColor();
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
const getPlayArray = (size = 3) => {
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
const fillColor = () => {
  return <Colors>COLORS[getRandomArbitrary(0, COLORS.length)];
};
/**
 * Возвращает рандомное значение в диапазоне
 * @param min
 * @param max
 */
const getRandomArbitrary = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getSearchColor = (
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
