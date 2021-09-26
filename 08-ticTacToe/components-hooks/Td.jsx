import React, { useCallback, memo } from "react";
import "./Td.css";
import { CLICK_CELL } from "./TicTacToeHooks";

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
  console.log("td rendered");

  const onClickTd = useCallback(() => {
    if (cellData) {
      return; // 이미 클릭을 했다면, 클릭할 수 없음
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]); // 배열의 요소가 변할 때 실행한다, 초기화한다

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
