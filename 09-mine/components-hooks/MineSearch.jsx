import React, { useReducer, createContext, useMemo } from "react";
import Form from "./Form";
import Table from "./Table";

export const CODE = {
  MINE: -7, // 지뢰가 심어진 칸
  NORMAL: -1, // 정상인 칸
  QUESTION: -2, // 물음표 정상 칸
  FLAG: -3, // 깃발 정상 칸
  QUESTION_MINE: -4, // 물음표 지뢰 칸
  FLAG_MINE: -5, // 깃발 지뢰 칸
  CLICKED_MINE: -6, // 지뢰칸 클릭
  OPENED: 0, // 0 이상이면 정상적으로 열린 칸
};
// createContextAPI로 props와 state를 한번에 보낸다
export const TableContext = createContext({
  tableData: [],
  halted: true,
  dispatch: () => {},
});
// 초기 state 설정
const initialState = {
  tableData: [],
  timer: 0,
  result: "",
  halted: true, // 동작을 멈춰주기 위한 설정
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine); // Form component의 row, cell, mine
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  // mine의 위치
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell); // 가로줄
    const hor = shuffle[k] % cell; // 세로 칸
    data[ver][hor] = CODE.MINE; // 지뢰의 위치
  }

  console.log(data);
  return data;
};

// action을 정의
export const START_GAME = "START_GAME"; // Form에서 START_GAME
export const OPEN_CELL = "OPEN_CELL"; // Td.jsx
export const CLICK_MINE = "CLICK_MINE"; // Td.jsx
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";

// reducer 함수를 생성 (dispatch를 한 action을 여기서 조작)
const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state, // 지뢰를 심자
        tableData: plantMine(action.row, action.cell, action.mine), // Form의 row, cell, mine
        halted: false,
      };
    // OPEN_CELL에서 주변 지뢰개수를 파악한다 (재귀)
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      // 어떤 칸이 불변성이 안지켜질지 모르기 때문에 모든 칸들을 다 새로 만들어준다
      tableData.forEach((row, i) => {
        tableData[i] = [...state, tableData[i]];
      });
      //* 주변 칸들을 검사하는 함수
      const checkAround = (row, cell) => {
        // 주변 지뢰개수 표시하기
        let around = [tableData[row][cell - 1], tableData[row][cell + 1]];
        if (tableData[row - 1]) {
          around = around.concat([tableData[row - 1][cell - 1], tableData[row - 1][cell], tableData[row - 1][cell + 1]]);
        }
        if (tableData[row + 1]) {
          around = around.concat([tableData[row + 1][cell - 1], tableData[row + 1][cell], tableData[row + 1][cell + 1]]);
        }
        const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
        console.log(around, count);
        tableData[row][cell] = count; // default of function getTdText in <Td/> component
        // 주변에 빈칸 열기(재귀), 재귀 잘못 다루면 호출스택 터짐(arr: maximum callstack)
        if (count === 0) {
        } else {
        }
      };
      checkAround(action.row, action.cell);
      return {
        ...state,
        tableData,
      };
    }
    //* 클릭한 칸이 지뢰면 "펑!"하고 나타낸다
    case CLICK_MINE: {
      const tableData = [...state.tableData]; // data 복사해서 담고
      tableData[action.row] = [...state.tableData[action.row]]; // 복사한 data의 row번 째 인덱스 찾고
      tableData[action.row][action.cell] = CODE.CLICKED_MINE; // dataTable[row][cell] 번 쨰는 '지뢰클릭'
      return {
        ...state,
        tableData,
        halted: true, // 지뢰를 클릭하면 게임이 멈춘다
      };
    }
    //* action of onRightClickTd in <Td/> component (FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL)
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.MINE) {
        // 우 클릭한 칸이 지뢰 칸이면
        tableData[action.row][action.cell] = CODE.FLAG_MINE; // 깃발 지뢰 "!" 칸으로
      } else {
        // 우 클릭한 칸이 지뢰 컨이 아니면
        tableData[action.row][action.cell] = CODE.FLAG; // 깃발 "!" 칸으로
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
        // 우 클릭한 칸이 깃발 지뢰면
        tableData[action.row][action.cell] = CODE.QUESTION_MINE; // 물음표 지뢰 "?" 칸으로
      } else {
        // 우 클릭한 칸이 깃발 지뢰가 아니면
        tableData[action.row][action.cell] = CODE.QUESTION; // 물음표 지뢰 "?" 칸으로
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
        // 우 클릭한 칸이 물음표 지뢰 칸이면
        tableData[action.row][action.cell] = CODE.MINE; // 지뢰가 심어진 칸으로
      } else {
        // 우 클릭한 칸이 물음표 지뢰 칸이 아니면
        tableData[action.row][action.cell] = CODE.NORMAL; // 정상인 칸으로
      }
      return {
        ...state,
        tableData,
      };
    }
    default:
      return state; // 기본 값 state를 return
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState); // useReducer를 적용
  const { timer, result, tableData, halted } = state;
  // TableContext.Provider로 보낼 값을 설정
  const value = useMemo(
    () => ({
      tableData,
      halted,
      dispatch,
    }),
    [tableData, halted]
  ); // cashing
  // useMemo를 통해 캐싱을 해주고 객체 값을 기억한다. 캐싱을해야 성능저하가 일어나지 않는다
  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;