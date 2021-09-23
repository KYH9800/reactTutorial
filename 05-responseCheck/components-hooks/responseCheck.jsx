import "./ResponseCheck.css";
import React, { useRef, useState } from "react";
import Record from "./Record";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);

  const resetMessage = useRef(null);
  const timeout = useRef(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  const onClickScreen = () => {
    if (state === "waiting") {
      clearTimeout(resetMessage);
      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금클릭");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");
    } else if (state === "ready") {
      setState("warning");
      setMessage("성급했어요");
      resetMessage = setTimeout(() => {
        setState("waiting");
        setMessage("지금 클릭");
      }, 2500);
    } else if (state === "now") {
      endTime.current = new Date();
      setState("waiting");
      setMessage("클릭해서 시작하세요");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    console.log("시간기록: ", result);
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {Math.floor(result.reduce((a, c) => a + c) / result.length)}ms</div>
        <button onClick={onReset}>리셋</button>
        <div id="block">
          <div id="record">기록</div>
          <ul>
            {result.map((v, i) => {
              return <Record key={(v, i)} val={v} idx={i} />;
            })}
          </ul>
        </div>
      </>
    );
  };

  return (
    <>
      <header>반응속도체크</header>
      <main>
        <div id="screen" className={state} onClick={onClickScreen}>
          {message}
        </div>
        {renderAverage()}
      </main>
    </>
  );
};

export default ResponseCheck;
