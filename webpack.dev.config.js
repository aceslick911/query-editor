/* eslint-disable no-undef */
module.exports = {
  devtool : 'inline-source-map',
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
