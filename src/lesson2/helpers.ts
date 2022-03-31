export const isNumber = (item: string): boolean => !isNaN(Number(item));

export const validateSpecNumber = (item: string | number): boolean => {
  return /(\d+(\*\*|!))|(\d+\^\d+)|(cos|sin|tan|fib)\(\d+\)/gm.test(String(item));
};

export const getSpecOperator = (str: string): string =>
  str.match(/[!^*]|(cos|sin|tan|fib)/g)?.join("") || "";
