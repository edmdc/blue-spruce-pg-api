import nodeExternals from "webpack-node-externals";
import serverlessWebpack from "serverless-webpack";

module.exports = {
  devtool: "inline-cheap-module-source-map",
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
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: { version: 3, proposals: "true" },
                },
              ],
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".ts", ".js"],
  },
  externals: [nodeExternals()],
};
