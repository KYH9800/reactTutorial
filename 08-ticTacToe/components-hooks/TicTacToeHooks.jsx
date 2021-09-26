import React, { useEffect, useReducer, useCallback } from "react";
import Table from "./Table";
// 2. 초기 state 값
const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1],
};

export const SET_WINNER = "SET_WINNER";
export const CHANGE_TURN = "CHANGE_TURN";
export const CLICK_CELL = "CLICK_CELL";
export const RESET_GAME = "RESET_GAME";

// 3. reducer는 함수 (배열의 reduce 함수처럼 무언가를 줄인다 그런 뜻)
// reducer 안에서 state를 어떻게 바꿀지를 적어준다
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WINNER":
      // state.winner = action.winner; 이렇게 하면 안됨
      return {
        ...state, // 기존 state가 얕은 복사가 된다
        winner: action.winner,
      };
    case "CHANGE_TURN":
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    case "CLICK_CELL":
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
        winner: "",
      };
    }
    default:
      return state;
  }
};

// 1. const [state, dispatch] = useReducer(reducer, initialState);
const TicTacToeHooks = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, recentCell, turn, winner } = state;

  // const [winner, setWinner] = useState("");
  // const [turn, setTurn] = useState("O");
  // const [tableData, setTableData] = useState([ ["", "", ""], ["", "", ""], ["", "", ""] ]);

  const onClickTable = useCallback(() => {
    dispatch({ type: "SET_WINNER", winner: "O" });
    dispatch({ type: "CHANGE_TURN" });
    // dispatch 안에 들어가는 것은 action이라고 부른다
    // dispatch 안에 들어가는 action 객체를 만들어줘야 한다
    // 안의 action을 해석해서 state를 바꿔주는 역할을 reducer가 한다
  }, []);

  useEffect(() => {
    // componentDidMount
    const [row, cell] = recentCell;
    // row가 -1이면 실행되지 않는다, 첫 컴포넌트 렌더링 시 실행되기 때문에 초기값 -1을 주고, 처음부터 승패를 판단하는 동작을 막는다
    if (row < 0) {
      return;
    }
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true; // 가로줄 검사
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true; // 세로줄 검사
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true; // 왼쪽(상단) - 오른쪽(하단) 대각선 검사
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true; // 오른쪽(상단) - 왼쪽(하단) 대각선 검사
    }
    console.log(win, row, cell, tableData, turn);
    if (win) {
      // 승리시
      dispatch({ type: SET_WINNER, winner: turn });
      setTimeout(() => {
        dispatch({ type: RESET_GAME }); // 잠시 후 게임을 리셋
      }, 1500);
    } else {
      let all = true; // all이 true면 무승부라는 뜻
      // 무승부 검사
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            all = false; // 하나라도 차지 않은 칸이 있으면 무승부가 아님
          }
        });
      });
      // all이 true면 무승부
      if (all) {
        dispatch({ type: SET_WINNER, winner: "무승부 입니다" }); // winner 비우고
        setTimeout(() => {
          dispatch({ type: RESET_GAME }); // 잠시 후 게임을 리셋
        }, 1500);
      } else {
        dispatch({ type: CHANGE_TURN }); // 그 외에는 user의 순서를 바꾼다
      }
    }
  }, [recentCell]); // componentDidMount, componentDidUpdate

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner === "O" || winner === "X" ? <div>{`${winner}님의 승리!!`}</div> : <div>{winner}</div>}
    </>
  );
};

export default TicTacToeHooks;
