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
    ],
  },
};
