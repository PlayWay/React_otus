import {cos, factorial, fib, pow, sin, tan} from "./specOperators";
import {firstPrioritiesCalc} from "./engine";

describe("pow", () => {

  test.each([
    {a: 3, expected: 9},
    {a: 10, expected: 100},
    {a: 55, expected: 3025}
  ])('pow: "$a to equal $expected"', ({a, expected}) => {
    expect(pow(a)).toBe(expected);
  });

  test("5^3 to equal 125", () => {
    expect(pow(5,3)).toBe(125)
  })

  test("11^3 to equal 1331", () => {
    expect(pow(11,3)).toBe(1331)
  })
})

describe("factorial", () => {
  test("4! to equal 24", () => {
    expect(factorial(4)).toBe(24)
  })

  test("7! to equal 5040", () => {
    expect(factorial(7)).toBe(5040)
  })
})

describe("cos", () => {
  test("cos(11) to equal 0.004425697988050785", () => {
    expect(cos(11)).toBe(0.004425697988050785)
  })

  test("cos(12) to equal 0.8438539587324921", () => {
    expect(cos(12)).toBe(0.8438539587324921)
  })
})

describe("sin", () => {
  test("sin(3) to equal 0.004425697988050785", () => {
    expect(sin(3)).toBe(0.1411200080598672)
  })

  test("sin(11) to equal 0.8438539587324921", () => {
    expect(sin(11)).toBe(-0.9999902065507035)
  })
})

describe("tan", () => {
  test("tan(3) to equal 0.004425697988050785", () => {
    expect(tan(3)).toBe(-0.1425465430742778)
  })

  test("tan(11) to equal 0.8438539587324921", () => {
    expect(tan(11)).toBe(-225.95084645419513)
  })
})

describe("fib", () => {
  test("fib(10) to equal 55", () => {
    expect(fib(10)).toBe(55)
  })

  test("fib(4) to equal 3", () => {
    expect(fib(4)).toBe(3)
  })

  test("fib(2) to equal 1", () => {
    expect(fib(2)).toBe(1)
  })

  test("fib(1) to equal 1", () => {
    expect(fib(1)).toBe(1)
  })

  test("fib(0) to equal 1", () => {
    expect(fib(0)).toBe(1)
  })
})