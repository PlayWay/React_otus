const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";

  return {
    entry: "./src/index.tsx",
    devtool: isDev ? "source-map" : undefined,
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    },
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "index.js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]_[local]-[hash:base64:5]",
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDev,
              },
            },
          ],
        },
        { test: /\.ts$/, use: "ts-loader" },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
    },
    optimization: isDev
      ? {}
      : {
          minimize: true,
        },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin(),
    ],
  };
};
