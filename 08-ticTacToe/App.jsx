// es2015 module 문법 (babel이 import도 requier로 바꿔준다)
import React from "react";
// import TicTacToeClass from "./components-class/TicTacToeClass";
import TicTacToeHooks from "./components-hooks/TicTacToeHooks";

//* 반응속도체크
const App = () => {
  // return <TicTacToeClass />;
  return <TicTacToeHooks />;
};

export default App;
