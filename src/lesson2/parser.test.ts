import {parser} from "./parser";

test.each([
  {expression: "1 + + 33 - 2", expected: TypeError("Unexpected string")},
  {expression: "1 ! 33 - 2", expected: TypeError("Unexpected string")},
  {expression: "3*", expected: TypeError("Unexpected string")},
  {expression: "3!! + 5 / 2", expected: TypeError("Unexpected string")},
  {expression: "5^ - 7", expected: TypeError("Unexpected string")},
  {expression: "5^2 - css", expected: TypeError("Unexpected string")},
  {expression: "1 - sin(TEST)", expected: TypeError("Unexpected string")},
])('parser: $expression', ({expression, expected}) => {
  expect(() => parser(expression)).toThrow(TypeError("Unexpected string"));
})

test.each([
  {expression: "1 + 32", expected: [1, "+", 32]},
  {expression: "11 + 3 * 22", expected: [11, "+", 3, "*", 22]},
  {expression: "1 + 32 - 2 + 2", expected: [1, "+", 32, "-", 2, "+", 2]},
  {expression: "3^2 * 10 + 4!", expected: [9, '*', 10, '+', 24]},
  {expression: "cos(10) - 3** * 10", expected: [-0.8390715290764524, '-', 9, '*', 10]},
  {expression: "fib(10) - 7 / 5!", expected: [55, '-', 7, '/', 120]}
])('parser: $expression', ({expression, expected}) => {
  expect(parser(expression)).toStrictEqual(expected);
});


