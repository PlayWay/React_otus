const path = require("path");

module.exports = {
  staticDirs: ["../public"],
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
    "storybook-css-modules-preset",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
};
