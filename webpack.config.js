module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: __dirname + "/src/deinja.js",
  output: {
    path: __dirname + "/dist",
    filename: "deinja.min.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  }
};
