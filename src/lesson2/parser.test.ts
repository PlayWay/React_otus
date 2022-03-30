import {parser} from "./parser";

test("parser: 1 + 32", () => {
  expect(parser("1 + 32")).toEqual([1, "+", 32]);
});

test("parser: 11 + 3 * 22", () => {
  expect(parser("11 + 3 * 22")).toEqual([11, "+", 3, "*", 22]);
});

test("parser: 1 + 32 - 2 + 2", () => {
  expect(parser("1 + 32 - 2 + 2")).toEqual([1, "+", 32, "-", 2, "+", 2]);
});

test("parser: 3^2 * 10 + 4!", () => {
  expect(parser("3^2 * 10 + 4!")).toEqual([ 9, '*', 10, '+', 24 ]);
});

test("parser: cos(10) - 3** * 10", () => {
  expect(parser("cos(10) - 3** * 10")).toEqual([-0.8390715290764524, '-', 9, '*', 10]);
});

test("parser: fib(10) - 7 / 5!", () => {
  expect(parser("fib(10) - 7 / 5!")).toEqual([ 55, '-', 7, '/', 120 ]);
});

test("parser: 1 + + 33 - 2", () => {
  expect(() => parser("1 + + 33 - 2")).toThrow(TypeError("Unexpected string"));
});

test("parser: 1 ! 33 - 2", () => {
  expect(() => parser("1 ! 33 - 2")).toThrow(TypeError("Unexpected string"));
});

test("parser: 3*", () => {
  expect(() => parser("3*")).toThrow(TypeError("Unexpected string"));
});

test("parser: 3!! + 5 / 2", () => {
  expect(() => parser("3!! + 5 / 2")).toThrow(TypeError("Unexpected string"));
});

test("parser: 5^ - 7", () => {
  expect(() => parser("5^ - 7")).toThrow(TypeError("Unexpected string"));
});

test("parser: 5^ - 7", () => {
  expect(() => parser("5^ - 7")).toThrow(TypeError("Unexpected string"));
});

test("parser: 5^2 - css", () => {
  expect(() => parser("5^2 - css")).toThrow(TypeError("Unexpected string"));
});

test("parser: 1 - sin(TEST)", () => {
  expect(() => parser("1 - sin(TEST)")).toThrow(TypeError("Unexpected string"));
});

