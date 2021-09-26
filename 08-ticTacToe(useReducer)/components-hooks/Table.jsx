import React from "react";
import "./Table.css";
import Tr from "./Tr";
// table > tr > td
const Table = ({ tableData, dispatch }) => {
  //! map(() => (JSX문법)) 사용시 괄호를 사용 (주의해서 쓸것 error로 인식 못함ㄴ)
  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
