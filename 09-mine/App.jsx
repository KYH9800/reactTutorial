// es2015 module 문법 (babel이 import도 requier로 바꿔준다)
import React from "react";
import MineSearch from "./components-hooks/MineSearch";

//* 반응속도체크
const App = () => {
  return <MineSearch />;
};

export default App;
