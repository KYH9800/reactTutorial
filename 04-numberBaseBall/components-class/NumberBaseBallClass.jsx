import "./App.css";
import React, { Component, createRef } from "react";
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

class NumberBaseBallClass extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [], // do not using 'push'
  };

  // PureComponent
  // shouldComponentUpdate(nexProps, nextState) {}

  onSubmitForm = (e) => {
    const { value, tries, answer } = this.state;
    e.preventDefault();
    if (value === answer.join("")) {
      this.setState((prevState) => {
        return {
          result: "홈런입니다",
          tries: [...prevState.tries, { try: value, result: "홈런입니다" }], // 예전 state를 복사 후 추가
        };
      });
      setTimeout(() => {
        alert("게임을 새로 시작합니다.");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
          result: "",
        });
      }, 2000);
      this.inputRef.current.focus();
    } else {
      // 답 틀렸으면
      const answerArr = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        this.setState({
          result: `기회 10번이 넘었네요. 실패!! 답은 ${answer.join(",")} 였습니다.`,
        });
        setTimeout(() => {
          alert("게임을 새로 시작합니다.");
          this.setState({
            value: "",
            answer: getNumbers(),
            tries: [],
            result: "",
          });
        }, 2000);
        this.inputRef.current.focus();
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArr[i] === this.state.answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArr[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크 ${ball} 볼입니다.` }],
            value: "",
          };
        });
        this.inputRef.current.focus();
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef(); // this.inputRef

  render() {
    const { value, result, tries } = this.state;
    return (
      <>
        <header>숫자야구</header>
        <main>
          <h1>{result}</h1>
          <form onSubmit={this.onSubmitForm}>
            <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
            <button>확인</button>
          </form>
          <div>시도: {tries.length}</div>
          <ul>
            {tries.map((v, i) => {
              return <Try key={`${i + 1}차 시도: `} tryInfo={v} />;
            })}
          </ul>
        </main>
      </>
    );
  }
}

export default NumberBaseBallClass;
