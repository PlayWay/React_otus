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
    let item = stack[key];

    if (/^\(/g.test(item)) {
      //очищаем от открывающей скобки, чтобы не ломало логику
      stack[key] = item.replace(/^\(/g, "");
      //ищем индекс закрывающей скобки
      const closeBracketIndex = line.indexOf(")", key);
      //вычисляем результат вычесления в скобках
      const priorityStack = parser(stack.slice(key, stack.length)?.join(" "));
      item = String(calculation(priorityStack));
      //вырезаем выполненное выражение из исходного стэка
      stack.splice(key, closeBracketIndex);
    }

    if (/\)$/g.test(item)) {
      //очищаем от открывающей скобки, чтобы не ломало логику
      result.push(item.replace(/\)$/g, ""));
      return result;
    }
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
