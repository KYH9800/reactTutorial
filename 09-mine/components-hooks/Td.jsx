import React, { memo, useCallback, useContext } from "react";
import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext } from "./MineSearch";

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: "#444",
      };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: "white",
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: "yellow",
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: "red",
      };
    default:
      return {
        background: "white",
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return "";
    case CODE.MINE:
      return "X";
    case CODE.CLICKED_MINE:
      return "펑!";
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return "!";
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return "?";
    default:
      return code || ""; // tableData[rowIndex][cellIndex] = count; in case OPEN_CELL of reducer
  }
};

// rowIndex, cellIndex 여기서 몇번 째 줄에 몇번 째 칸인지 알수있다
const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext); // contextAPI로 props와 state를 받아온다
  // 일반 클릭(좌 클릭)
  const onClickTd = useCallback(() => {
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);
  // 우 클릭
  const onRightClickTd = useCallback(
    (e) => {
      e.preventDefault(); // 기본적으로 나타나는 우클릭 메뉴를 안뜨게 한다(기본동작 막기)
      if (halted) {
        return;
      }
      switch (tableData[rowIndex][cellIndex]) {
        case CODE.MINE:
        case CODE.NORMAL:
          dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
          return;
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
          return;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
          return;
        default:
          return;
      }
    },
    [tableData[rowIndex][cellIndex], halted]
  );

  return (
    <>
      <td style={getTdStyle(tableData[rowIndex][cellIndex])} onClick={onClickTd} onContextMenu={onRightClickTd}>
        {getTdText(tableData[rowIndex][cellIndex])}
      </td>
    </>
  );
});

export default Td;
