import React, { useMemo, useCallback, useEffect, useRef, useState } from "react";
import BallHooks from "./BallHooks";

function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const suffle = [];
  while (candidate.length > 0) {
    suffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = suffle[suffle.length - 1];
  const winNumber = suffle.slice(0, 6).sort((a, b) => a - b);
  return [...winNumber, bonusNumber];
}
/*  useMemo: 복잡한 함수의 결과값(함수의 return 값)을 기억
    useCallback: 함수 자체를 기억
    useRef: 일반 값을 기억 */
const LottoHooks = () => {
  //! hooks는 순서가 매우 중요하다
  // getWinNumbers()가 여러번씩 다시 실행되지 않고 기억할수 있게 useMemo를 쓴다
  // 두번 째 인자가 바뀌지 않는한 다시 실행되지 않는다 (두번째 배열에 들어간 요소가 바뀌면 다시 실행된다)
  const lottoNumbers = useMemo(() => getWinNumbers(), []); // useMemo, useCallback, useEffect...
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log("useEffect");
    // componentDidMount
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7500);
    return () => {
      // componentWillUnmount
      console.log("useEffect: componentWillUnmount");
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

  useEffect(() => {
    console.log("로또 숫자를 생성합니다.");
    console.log("useEffect02: ", winNumbers); // 현재의 state값을 보여줌
  }, [winNumbers]);
  //! 함수 자체를 기억해서 함수 component가 재실행되도 onClickRedo 함수가 새로 생성되지 않는다
  //! 함수 생성 하는 것 자체가 오래걸리거나, 비용이 크면 useCallback으로 함수를 기억한다 (재생산 되지않고 기억함)
  //* 자식 component에 함수를 넘길 때는 useCallback을 꼭 해줘야된다 !!!!!!!!!!!!!
  //* 함수를 기억하고 넘김으로써 자식 component에서 매번 새로운 props를 전달한다는 착각을 방지한다
  const onClickRedo = useCallback(() => {
    console.log("onClickRedo");
    console.log(winNumbers); // console에 예전의 state 값이 제공됨
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = []; //! useEffect의 componentDidUpdate의 시작조건
  }, [winNumbers]); // 요소안의 값이 변하면 실행한다
  // 값이 비어있으면 처음의 값을 계속 기억하고 있어 문제가 된다

  return (
    <>
      <div>당첨 숫자</div>
      <div id="result">
        {winBalls.map((v) => (
          <BallHooks key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <BallHooks number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default LottoHooks;
