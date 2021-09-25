import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

function complicateFunction() {}

const ReactHooks = () => {
  //* useMemo(high order function) 복잡한 함수의 return 값을 기억
  //* 두번 째 인자가 바뀌지 않는한 다시 실행되지 않는다 (두번째 배열에 들어간 요소가 바뀌면 다시 실행된다)
  const useMemoFunction = useMemo(() => complicateFunction(), []);
  const [state, setState] = useState(useMemoFunction);
  const [date, setDate] = useState(new Date());
  const timeID = useRef(); //* 단순한 값을 기억

  useEffect(() => {
    // componentDidMount
    timeID = setInterval(() => tick(), 1000);
    return () => {
      // componentWillUnmount
      clearInterval(timeID);
    };
  }, [timeID.current]); // 빈 배열이면 componentDidMount와 동일
  // 배열의 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행
  //! state의 변화에 따라 적용되므로 useEffect는 여러번 사용 가능

  //* useCallback: 함수 자체를 기억한다. 자식 component에 함수를 넘길때는 꼭 사용해줘야 한다
  //* 함수 자체를 기억해 component가 재실행되도 함수가 새로 생성되지 않는다
  //* 함수 생성이 오래 걸리거나, 비용이 크면 useCallback으로 함수를 기억해 재생산 되지 않고 기억함
  //* 함수를 기억하고 자식 component에 넘김으로써 매번 새로운 props를 전달한다는 착각을 방지
  const tick = useCallback(() => {
    setDate(new Date());
  }, [date]);

  return (
    <>
      <h1>Hello, world!</h1>
      <h2>It is {date.toLocaleTimeString()}.</h2>
    </>
  );
};

export default ReactHooks;
