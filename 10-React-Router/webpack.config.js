//! webpack에서는 node가 돌리기 때문에 requier을 써야한다 (react의 import는 안됨)
const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// proccess.env.NODE_ENV = "production"; // 배포모드 설정

module.exports = {
  name: "React-Router",
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
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
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
          plugins: ["@babel/plugin-proposal-class-properties", "react-refresh/babel", "@babel/plugin-proposal-class-properties"],
        },
      },
    ],
  },
  plugins: [new RefreshWebpackPlugin()],

  output: {
    path: path.join(__dirname, "dist"),
    filename: "app,js",
    publicPath: "/dist/",
  },

  devServer: {
    historyApiFallback: true, // router 새로고침시 에러를 꼼수처럼 해결
    publicPath: "/dist/",
    hot: true,
  },
};
