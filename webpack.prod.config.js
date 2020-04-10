const webpack = require("webpack");

module.exports = {
  entry: "./src/query-editor.js",
  output: {
    libraryTarget: "var",
    library: "queryEditor",
    path: "/lib",
    filename: "query-editor.js",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: "babel-loader",
        include: __dirname,
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
