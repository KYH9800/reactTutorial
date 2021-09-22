import "./ResponseCheckClass.css";
import React, { Component } from "react";
import Record from "./Record";

class ResponseCheckClass extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요",
    result: [],
  };

  resetMessage;
  timeout; // 랜덤 시간 후 시작 setTimeout
  startTime; // 시작 시간 측정
  endTime; // 끝난 시간 측정

  onClickScreen = () => {
    const { state } = this.state;
    if (state === "waiting") {
      clearTimeout(this.resetMessage);
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요",
      });
    } else if (state === "ready") {
      clearTimeout(this.timeout);
      this.setState({
        state: "warning",
        message: "너무 성급하다 휴먼 초록색일 때 클릭해라 휴먼",
      });
      this.resetMessage = setTimeout(() => {
        this.setState({
          state: "waiting",
          message: "지금 클릭",
        });
      }, 2500);
    } else if (state === "now") {
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };
  // reset function
  onReset = () => {
    this.setState({
      result: [],
    });
  };
  // 시간 측정 함수
  renderAverage = () => {
    // 488 488
    const { result } = this.state;
    console.log("시간기록: ", result);
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {Math.floor(result.reduce((a, c) => a + c) / result.length)}ms</div>
        <button onClick={this.onReset}>리셋</button>
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
  //! react에서 render 밑으로는 if 조건문과 for 반복문은 못쓴다. render 위의 함수로 따로 빼준다
  //! 또는 render 밑으로 구현해야 할때는 조건문은 삼항연산자, 반복문은 map으로 구현한다
  render() {
    const { state, message } = this.state;
    return (
      <>
        <header>반응속도체크</header>
        <main>
          <div id="screen" className={state} onClick={this.onClickScreen}>
            {message}
          </div>
          {this.renderAverage()}
        </main>
      </>
    );
  }
}

export default ResponseCheckClass;
