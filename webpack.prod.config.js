/* eslint-disable no-undef */
const webpack = require("webpack");
module.exports = {
  entry: "./src/query-editor.js",
  output: {
    libraryTarget: "var",
    library: "queryEditor",
    path: __dirname + "/lib",
    filename: "query-editor.js",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
};
