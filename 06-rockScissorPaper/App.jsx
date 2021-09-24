// es2015 module 문법 (babel이 import도 requier로 바꿔준다)
import React from "react";
// import RSPHooks from "./components-hooks/RSPHooks";
import RSPClass from "./components-class/RSPClass";

//* 반응속도체크
const App = () => {
  // return <RSPHooks />;
  return <RSPClass />;
};

export default App;
