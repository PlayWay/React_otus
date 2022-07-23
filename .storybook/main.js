const path = require("path");

module.exports = {
  staticDirs: ["../public"],
  stories: [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
    "storybook-css-modules-preset",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    // add SCSS support for CSS Modules
    config.module.rules.push({
      test: /\.scss$/,
      use: ["sass-loader"],
      include: path.resolve(__dirname, "../"),
    });

    return config;
  },
};
