import React, { useEffect, useRef, useState } from "react";
import "./RSPHooks.css";
//! hooks는 lifecycle이 없지만 흉내는 낼 수 있다
// 좌표
const rspCoords = {
  rock: "0",
  scissor: "-142px",
  paper: "-284px",
};

const scores = {
  scissor: 1,
  rock: 0,
  paper: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const [score, setScore] = useState(0);
  const interval = useRef();

  // componentDidMount, componentWillUnmount 역할(1대 1 대응은 아님)
  useEffect(() => {
    // console.log("다시 실행"); // componentDidMount()
    interval.current = setInterval(changeHand, 100);
    return () => {
      // console.log("종료"); // componentWillUnmount()
      clearInterval(interval.current);
    };
  }, [imgCoord]); //* 초기에는 빈배열을 넣어준다. (바뀌는 state, useEffect를 실행하고 싶은 state를 여기에)
  //! closure 문제를 여기에서 해결 가능하다

  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissor);
    } else if (imgCoord === rspCoords.scissor) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  };

  const onClickButton = (choise) => () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
    const myScore = scores[choise];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult("비겼습니다!");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다!");
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult("졌습니다!");
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 2000);
  };

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="scissor" className="btn" onClick={onClickButton("scissor")}>
          가위
        </button>
        <button id="rock" className="btn" onClick={onClickButton("rock")}>
          바위
        </button>
        <button id="paper" className="btn" onClick={onClickButton("paper")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score} 점</div>
    </>
  );
};

export default RSP;
