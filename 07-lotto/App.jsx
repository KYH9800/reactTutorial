// es2015 module 문법 (babel이 import도 requier로 바꿔준다)
import React from "react";
import LottoClass from "./components-class/LottoClass";
// import LottoHooks from './components-hooks/LottoHooks';

//* 반응속도체크
const App = () => {
  return <LottoClass />;
  // return <LottoHooks />;
};

export default App;
