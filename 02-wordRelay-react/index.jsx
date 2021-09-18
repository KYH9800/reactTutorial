//* index.js
// 2-2. react와 react-dom을 불러온다
const React = require("react");
const ReactDOM = require("react-dom");
// 상대경로로 WordRelay component를 가져온다
const App = require("./App");
// 모듈 시스템과 웹팩 설정
ReactDOM.render(<App />, document.querySelector("#root"));

// jsx로 파일 확장자를 하는 것이 좋다
// 'x' 한글자로 파일 안에 jsx 문법을 사용하고 있구나 react 전용 파일이구나 금방 인지 가능
