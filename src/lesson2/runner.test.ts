import { runner } from "./runner";

test.each([
  {a: "20 - 10 * 10 / 5 - 3" , expected: -3},
  {a: "20 + 1 * 10 - 5 * 3" , expected: 15},
  {a: "2 + 2 * 3" , expected: 8},
  {a: "2 * 2 + 3" , expected: 7},
  {a: "2 * 2 * 3", expected: 12},
  {a: "2 * 32", expected: 64},
  {a: "1 * 32", expected: 32},
  {a: "3** + 7", expected: 16},
  {a: "3** + 4! - 2^3", expected: 25},
  {a: "sin(10) - 3** + 5 / 2 - fib(10)", expected: -62.04402111088937},
])('runner: $a', ({a, expected}) => {
  expect(runner(a)).toBe(expected);
});
