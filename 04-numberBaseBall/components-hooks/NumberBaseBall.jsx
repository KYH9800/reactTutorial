import "./App.css";
import React, { useState, useRef } from "react";
import Try from "./Try";

// 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumbers() {
  // todo
}

const NumberBaseBall = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onChangeInput = () => {
    // todo
  };

  const onSubmitForm = () => {
    // todo
  };

  return (
    <>
      <header>숫자야구</header>
      <main>
        <h1>{result}</h1>
        <form onSubmit={onSubmitForm}>
          <input maxLength={4} value={value} onChange={onChangeInput} />
          <button>확인</button>
        </form>
        <div>시도: {tries.length}</div>
        <ul>
          {["망고", "바나나", "오이", "조개", "subeen"].map((v, i) => {
            return <Try key={(v, i)} value={v} index={i} />;
          })}
        </ul>
      </main>
    </>
  );
};

export default NumberBaseBall;
