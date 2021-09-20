// es2015 module 문법 (babel이 import도 requier로 바꿔준다)
import React from "react";
import NumberBaseBall from "./components-hooks/NumberBaseBall";
// import NumberBaseBallClass from "./components-class/NumberBaseBallClass";

//* 숫자야구
const App = () => {
  return <NumberBaseBall />;
  // return <NumberBaseBallClass />;
};

export default App;

//* node 에서는 requier, react에서는 import를 쓴다

//* CommonJS
// const React = requier('react');
// exports.hello = 'hello';
// module.exports = App;
