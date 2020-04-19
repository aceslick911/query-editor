const path = require('path');
/* eslint-disable no-undef */
module.exports = {
  devtool : 'inline-source-map',
  entry: "./src/index.js",
  output: {
    libraryTarget: "var",
    library: "qds",
    path: path.resolve(__dirname, "../../services/Server/Server/wwwroot/lib/qds/"),
    filename: "qds.js",
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
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
};
