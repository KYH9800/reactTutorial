import "./App.css";
import React, { useState, useRef, useCallback } from "react";
import Try from "./Try";

// 숫자 4개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumbers() {
  const candidata = Array(9)
    .fill()
    .map((val, idx) => {
      return idx + 1;
    }); // [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const arr = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidata.splice(Math.floor(Math.random() * (candidata.length - i)), 1)[0];
    arr.push(chosen);
  }
  return arr;
}

const NumberBaseBall = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (value === answer.join("")) {
        setTries((prevTries) => [...prevTries, { try: value, result: "홈런입니다" }]);
        setResult("홈런입니다");
        setTimeout(() => {
          alert("게임을 새로 시작합니다.");
          setValue("");
          setAnswer(getNumbers());
          setTries([]);
          setResult("");
        }, 2000);
      } else {
        // 답 틀렸으면
        const answerArr = value.split("").map((v) => parseInt(v));
        let strike = 0;
        let ball = 0;
        if (tries.length >= 9) {
          setResult(`기회 10번이 넘었네요. 실패!! 답은 ${answer.join(",")} 였습니다.`);
          setTimeout(() => {
            alert("게임을 새로 시작합니다.");
            setValue("");
            setAnswer(getNumbers());
            setTries([]);
            setResult("");
          }, 2000);
          inputEl.current.focus();
        } else {
          console.log("답은", answer.join(""));
          for (let i = 0; i < 4; i += 1) {
            if (answerArr[i] === answer[i]) {
              strike += 1;
            } else if (answer.includes(answerArr[i])) {
              ball += 1;
            }
          }
          setTries((prevTries) => [...prevTries, { try: value, result: `${strike} 스트라이크 ${ball} 볼입니다.` }]);
          setValue("");
          inputEl.current.focus();
        }
      }
    },
    [value, answer]
  );

  const onChangeInput = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <>
      <header>숫자야구</header>
      <main>
        <h1>{result}</h1>
        <form onSubmit={onSubmitForm}>
          <input ref={inputEl} maxLength={4} value={value} onChange={onChangeInput} />
          <button>확인</button>
        </form>
        <div>시도: {tries.length}</div>
        <ul>
          {tries.map((v, i) => (
            <Try key={`${i + 1}차 시도`} tryInfo={v} />
          ))}
        </ul>
      </main>
    </>
  );
};

export default NumberBaseBall;
