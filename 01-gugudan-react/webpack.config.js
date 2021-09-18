const path = require("path");

module.exports = {
  name: "gugudan-setting",
  mode: "development", // real service: production
  devtool: "eval", // hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: ["./index"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
  },
};
