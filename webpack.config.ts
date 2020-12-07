const nodeExternals = require("webpack-node-externals");
const serverlessWebpack = require("serverless-webpack");

module.exports = {
  devtool: "source-map",
  entry: serverlessWebpack.lib.entries,
  mode: serverlessWebpack.lib.webpack.isLocal ? "development" : "production",
  target: "node",
  node: false,
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".ts", ".js"],
  },
  externals: [nodeExternals()],
};
