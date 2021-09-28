import React, { memo, useCallback, useContext, useState } from "react";
import { START_GAME, TableContext } from "./MineSearch";

const Form = memo(() => {
  const [row, setRow] = useState(10); // 세로 몇 줄
  const [cell, setCell] = useState(10); // 가로 몇 줄
  const [mine, setMine] = useState(20); // 지뢰 갯수
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);

  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  // onClickBtn에 contextAPI 적용
  const onClickBtn = useCallback(() => {
    console.log("onClickBtn");
    dispatch({ type: START_GAME, row, cell, mine });
  }, [row, cell, mine]);

  return (
    <div>
      <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <button onClick={onClickBtn}>시작</button>
    </div>
  );
});

export default Form;
