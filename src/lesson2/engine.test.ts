import {firstPrioritiesCalc, secondPrioritiesCalc} from "./engine";

test.each([
  {a: 1, b: "*", c: 32, expected: [32]},
  {a: 32, b: "/", c: 32, expected: [1]},
  {a: 32, b: "+", c: 32, expected: [32, "+", 32]}
])('firstPrioritiesCalc: [$a $b $c]', ({a, b, c, expected}) => {
  expect(firstPrioritiesCalc([a,b,c])).toStrictEqual(expected);
});

test.each([
  {a: 32, b: "+", c: 32, expected: 64},
  {a: 32, b: "-", c: 32, expected: 0}
])('secondPrioritiesCalc: [$a $b $c]', ({a, b, c, expected}) => {
  expect(secondPrioritiesCalc([a,b,c])).toBe(expected);
});
