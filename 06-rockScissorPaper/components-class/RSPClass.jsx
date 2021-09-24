import React, { Component } from "react";
import "./RSPClass.css";

/* LifeCycle 순서
(case class)
constructor -> render -> ref -> componentDidMount (컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 함)
-> ( chainge a setState/props >> shouidComponentUpdate(true) >> render >> componentDidUpdate (rendering 후) )
-> when component parent delete me(부모가 나를 없앴을 때)
-> componentWillUnmount (컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 함)
-> extinction(소멸)
*/

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

class RSP extends Component {
  state = {
    result: "",
    imgCoord: rspCoords.rock,
    score: 0,
  };

  interval;

  componentDidMount() {
    // 컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이 함
    console.log("componentDidMount");
    //! 비동기 함수가 밖에 있는 변수를 참조하면 클로저 문제가 발생한다 (javaScript 문제)
    this.interval = setInterval(this.changeHand, 100);
  }

  /* shouldComponentUpdate는 조건문으로 감싸지 않으면 무한반복이 발생할 수 있음 */
  // shouldComponentUpdate(prevProps, prevState) { return 값이 true일 경우 (return true) }

  // componentDidUpdate() { rendering 후 }

  componentWillUnmount() {
    // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 함
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.rock) {
      this.setState({
        imgCoord: rspCoords.scissor,
      });
    } else if (imgCoord === rspCoords.scissor) {
      this.setState({
        imgCoord: rspCoords.paper,
      });
    } else if (imgCoord === rspCoords.paper) {
      this.setState({
        imgCoord: rspCoords.rock,
      });
    }
  };

  // 고차함수 적용(high oder function) onClick={() => this.onClickButton(value)}
  onClickButton = (choice) => () => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: "비겼습니다!",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이겼습니다!",
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "졌습니다!",
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 2000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
        <div>
          <button id="scissor" className="btn" onClick={this.onClickButton("scissor")}>
            가위
          </button>
          <button id="rock" className="btn" onClick={this.onClickButton("rock")}>
            바위
          </button>
          <button id="paper" className="btn" onClick={this.onClickButton("paper")}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score} 점</div>
      </>
    );
  }
}

export default RSP;

// https://en.pimg.jp/023/182/267/1/23182267.jpg
