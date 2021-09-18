const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "wordrelay-hooks-setting",
  mode: "development", // production
  devtool: "eval",
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
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 5% in KR", "> 5% in US"],
                },
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["@babel/plugin-proposal-class-properties", "react-refresh/babel"],
        },
      },
    ],
  },
  plugins: [new RefreshWebpackPlugin()],

  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist/",
  },

  devServer: {
    hot: true,
  },
};
