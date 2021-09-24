//* lotto 예제가 지금껏 배웠던 것의 종합이다
//! 하위 component에 props, state 전달
//! LifeCycle(생명주기)
//! render 안의 반복문과 조건문(&&, 삼항연산자)
//! 배열을 복사 후 삽입

import React, { Component } from "react";
import BallClass from "./BallClass";

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

class LottoClass extends Component {
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자들
    winBalls: [],
    bonus: null, // 보너스 공
    redo: false,
  };

  timeouts = [];

  runTimeouts = () => {
    console.log("runTimeouts");
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7500);
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.runTimeouts();
    console.log("로또 숫자를 생성합니다.");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
    if (prevState.winNumbers !== this.state.winNumbers) {
      console.log("로또 숫자를 생성합니다");
    }
  }
  //! 메모리 상에서 계속 실행되기 때문에 componentWillUnmount를 통해 setTimeout을 종료해준다
  componentWillUnmount() {
    console.log("componentWillUnmount");
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    });
  }

  onClickRedo = () => {
    console.log("onClickRedo");
    this.setState({
      winNumbers: getWinNumbers(), // 당첨 숫자들
      winBalls: [],
      bonus: null, // 보너스 공
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="result">
          {winBalls.map((v) => (
            <BallClass key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <BallClass number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}

export default LottoClass;
