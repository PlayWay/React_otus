import { ParsedLineType } from "./parser";
import { getSpecOperator, isNumber } from "./helpers";
import {
  mathOperators,
  mathOperatorsPriorities,
  mathPriorities,
} from "./mathOperators";
import { specOperators } from "./specOperators";

const { FIRST, SECOND } = mathPriorities;

export const firstPrioritiesCalc = (stack: ParsedLineType): ParsedLineType => {
  let result: ParsedLineType = [];

  for (let key = 0; key < stack.length; key++) {
    const prevItem = result[result.length - 2];
    const item = result[result.length - 1];
    const nextItem = stack[key];

   if (
      !isNumber(String(item)) &&
      mathOperatorsPriorities[item] === FIRST
    ) {
      result = [
        ...result.slice(0, -2),
        mathOperators[item](Number(prevItem), Number(nextItem)),
      ];
    } else {
      result.push(nextItem);
    }
  }

  return result;
};

export const secondPrioritiesCalc = (stack: ParsedLineType): number => {
  let result = 0;
  for (let key = 0; key < stack.length; key++) {
    if (key === 0) {
      result = Number(stack[key]);
    }

    const prevItem = result;
    const item = stack[key - 1];
    const nextItem = stack[key];

    if (!isNumber(String(item)) && mathOperatorsPriorities[item] === SECOND) {
      result = mathOperators[item](Number(prevItem), Number(nextItem));
    }
  }
  return result;
};

export const calculation = (stack: ParsedLineType): number => {
  const firstPrioritiesRes = firstPrioritiesCalc(stack);

  if (firstPrioritiesRes.length === 1) {
    return Number(firstPrioritiesRes[0]);
  }

  return secondPrioritiesCalc(firstPrioritiesRes);
};

export const calculationSpecOperations = (item: string): number => {
  let num1 = 0
  let num2 = 2
  //отдельное условие, так как нужно 2 значения
  if (item.includes("^")) {
    [num1,num2] = item.split("^")?.map(i=>+i) || [];
  } else {
    //вытаскиваем сразу же значение для расчёта
    const nextItemValue = String(item).match(/\d/g)?.join("") || "";
    num1 = parseInt(nextItemValue) || 0;
  }

  return specOperators[getSpecOperator(String(item))](+num1,+num2)
}
