import React, { memo } from "react";

// const Try = memo((props) => {
// const { tryInfo } = props;
const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;

//hooks에서는 shouldComponentUpdate, PureComponent를 대체할 메모이제이션(memo)이 있다
