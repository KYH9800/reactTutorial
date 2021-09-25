import React, { Component } from "react";
// PureComponent는 동일한 결과를 렌더링하는 것을 방지하여 성능향상을 돕는다
class StateAndLifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }
  //* 아래의 lifecycle의 순서에 신경쓸 것
  // constructor >> render >> componentDidMount >> state와 props가 변한다면
  // >> shouldComponentUpdate(true) >> render >> componentDidUpdate >>
  // component를 DOM에서 제거할 때 >> componentWillUnmount >> extinction(소멸)

  componentDidMount() {
    // 1. 첫 렌더링을 마친 후에 실행된다.
    this.timeID = setInterval(() => this.tick(), 1000);
  }

  shouldComponentUpdate(prevProps, prevState) {
    //! 이 메서드는 오직 성능 최적화만을 위한 것, 렌더링 목적을 방지하는데 쓴다면 버그로 이어질 수 있다
    // props나 state를 변경했을 때, 리렌더링을 할지 말지 결정하는 메서드
    // 반드시 true나 false를 반환해야한다
    // return 값이 true일 경우 실행된다
    // 무한반복이 될 수 있으니 조건문으로 감싼다 (ex: if(prevState !== this.state) return...)
  }

  componentDidUpdate() {
    // 3. 리렌더링을 완료한 후 실행된다. 업데이트가 끝난 직후이므로, DOM관련 처리를 해도 무방하다
  }

  componentWillUnmount() {
    // 2. component를 DOM에서 제거할 때 실행, componentDidMount에서 등록한 이벤트가 있다면 여기서 제거한다
    // 2-1. componentDidMount와 항상 함께 사용한다
    clearInterval(this.timeID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </>
    );
  }
}

export default StateAndLifecycle;
