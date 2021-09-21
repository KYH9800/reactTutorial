// es2015 module 문법 (babel이 import도 requier로 바꿔준다)
import React from "react";
import ResponseCheckClass from "./components-class/responseCheckClass";
// import ResponseCheck from "./components-hooks/responseCheck";

//* 반응속도체크
const App = () => {
  return <ResponseCheckClass />;
  // return <ResponseCheck />;
};

export default App;
