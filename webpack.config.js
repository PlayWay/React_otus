const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: "./src/index.tsx",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
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
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // MiniCssExtractPlugin.loader,
          "style-loader",
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
              sourceMap: true
            }
          },
        ],
      },
      { test: /\.ts$/, use: "ts-loader" },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
    ],
  },
  devServer: {
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // new MiniCssExtractPlugin(),
  ],
};