// 2-1. webpack.config.js
// 이곳에 속성들을 많이 넣어줄 계획이다 (한줄 한줄 의미를 잘 파악하자)
//! html 파일에서 src는 딱 하나만 넣어줄수 있다. 그래서 webpack을 통해 하나로 합쳐 하나의 js파일로 만들어 주는 것이다.
const path = require("path"); // node에서 경로를 쉽게 조작하도록 해준다

module.exports = {
  name: "wordrelay-setting",
  mode: "development", // 실서비스: production
  devtool: "eval", // 빠르게
  resolve: {
    extensions: [".js", ".jsx"], // 확장자 설정
  },

  entry: {
    app: ["./index"], // 입력받을 파일의 경로와 파일 이름(확장자는 생략이 가능하다)
  }, // 입력

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
                  browsers: [""],
                },
              },
            ],
            "@babel/preset-react",
          ],
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, "dist"), // 현재 폴더 안에 있는 "dist"
    filename: "app.js", // 우리가 원하는 파일
  }, // 출력
};
