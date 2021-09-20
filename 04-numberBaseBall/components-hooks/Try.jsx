import React from "react";

const Try = (props) => {
  return (
    <li>
      {props.index + 1} : {props.value}
    </li>
  );
};

export default Try;
