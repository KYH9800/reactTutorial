import React, { useCallback, memo } from "react";
import "./Td.css";
import { CLICK_CELL } from "./TicTacToeHooks";

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
  console.log("td rendered");

  const onClickTd = useCallback(() => {
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
