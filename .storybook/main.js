const path = require("path");

module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  webpackFinal: config => {
    config.resolve.modules = [path.resolve(__dirname, "..", "src"), "node_modules"]; // Alternately, for an alias:

    config.resolve.alias = {
      "src": path.resolve('./src')
    };
    return {
      ...config,
      stats: {
        ...(config?.stats || {}),
        warningsFilter: /export .* was not found in/
      },
      module: {
        rules: [{
          test: /\.scss$/,
          use: ['style-loader', {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                includePaths: ["./node_modules"] // resolve paths
              }
            }
          }
          ]
        }, ...config.module.rules]
      }
    };
  },
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/preset-scss", "storybook-css-modules-preset"],
  "framework": "@storybook/react",
  core: {
    builder: "webpack5"
  }
};