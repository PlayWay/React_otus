export type SpecOperationType = (number: number, number2?: number) => number;

export const pow = (num = 0, pow = 2): number => {
  return Math.pow(Number(num), Number(pow));
};

export const factorial: SpecOperationType = (value) => {
  let result = 1;

  for (let i = 1; i <= value; i++) {
    result *= i;
  }
  return result;
};

export const cos: SpecOperationType = (value) => Math.cos(value);
export const sin: SpecOperationType = (value) => Math.sin(value);
export const tan: SpecOperationType = (value) => Math.tan(value);
export const fib: SpecOperationType = (value) => {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= value; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
};

export const specOperators: { [key: string]: SpecOperationType } = {
  "**": pow,
  "^": pow,
  "!": factorial,
  cos,
  sin,
  tan,
  fib,
};
