import React, { PureComponent } from "react";
// PureComponent로 렌더링이 계속되지 않게 성능을 최적화
class Try extends PureComponent {
  // shouldComponentUpdate는 PureComponent를 좀 더 커스터마이징 해서 구체적으로(원하는대로) 설정할 수 있다
  /*
  shouldComponentUpdate(nexProps, nextState) {
    props와 state가 변했는대도 불구하고 렌더링을 하고싶지 않을때 상세히 설정할 수 있다
  }
  */

  render() {
    const { tryInfo } = this.props;
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
        {/* this.props.tryInfo.try */}
        {/* this.props.tryInfo.result */}
      </li>
    );
  }
}

export default Try;

/*
- component가 복잡해지면 PureComponent가 작동이 안되는 경우도 있다
- PureComponent는 shouldComponentUpdate를 간단하게 대체 할 수 있지만,
state에서 다중배열 or 다중객체인 경우 변한것인지 PureComponent가 헷갈릴수 있어 작동이 안될 수 있다.
새로운 배열이나 객체로 만들어서 바꾸어라 (ex: [...arr, [change value]], {...obj, {change value}})
- state에 객체 구조를 안쓰는 것이 좋다
*/
