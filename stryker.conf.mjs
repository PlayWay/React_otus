// @ts-check
/** @type {import("@stryker-mutator/api/core").PartialStrykerOptions} */
const config = {
  "testRunner": "jest",
  "mutate": [
    "src/**/*.ts?(x)",
    "!src/**/?(*.)+(spec|test|stories).ts?(x)",
    "!src/Navigation/*.ts?(x)"
  ],
  "tsconfigFile": "tsconfig.json"
};
export default config;
