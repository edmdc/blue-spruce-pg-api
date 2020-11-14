import path from "path";

import webpack from "webpack";

const nodeExternals = require("webpack-node-externals");

const serverConfig: webpack.Configuration = {
  mode: "development",
  entry: {
    server: "./src/index.ts",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  target: "node",
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".ts", ".js"],
  },
  externals: nodeExternals(),
};

export default serverConfig;
