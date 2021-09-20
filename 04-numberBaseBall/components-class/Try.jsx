import React, { Component } from "react";

class Try extends Component {
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
