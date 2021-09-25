import React, { useState } from "react";

const TicTacToeHooks = () => {
  const [state, setState] = useState("hello, hooks");

  return (
    <>
      <div>{state}</div>
    </>
  );
};
export default TicTacToeHooks;
