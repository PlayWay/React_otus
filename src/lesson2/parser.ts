import { getSpecOperator, isNumber, validateSpecNumber } from "./helpers";
import { mathOperators } from "./mathOperators";
import { specOperators } from "./specOperators";
import {calculation, calculationSpecOperations} from "./engine";

export type ParsedLineType = Array<number | string>;

export const parser = (line: string): ParsedLineType => {
  const result = [];
  const stack = line.split(" ");

  for (let key = 0; key < stack.length; key++) {
    const prevItem = stack[key - 1];
    const item = stack[key];

    //Вычисление спец выражений
    if (validateSpecNumber(item) && getSpecOperator(item) in specOperators) {
      //вычисляем особенное выражение
      const specResult = calculationSpecOperations(item)
      result.push(specResult)
      //изменяем в исходном стеке, для предотвращения ошибок в движке
      stack[key] = `${specResult}`
      continue;
    }

    const isValidNumberPush =
      !isNumber(prevItem) && isNumber(item);
    const isValidOperatorPush =
      isNumber(prevItem) &&
      !isNumber(item) &&
      item in mathOperators

    if (isValidNumberPush) {
      result.push(Number(item));
    } else if (isValidOperatorPush) {
      result.push(item);
    } else {
      throw new TypeError("Unexpected string");
    }
  }
  return result;
};
