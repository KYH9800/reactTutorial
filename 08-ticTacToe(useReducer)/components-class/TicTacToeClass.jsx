import React, { Component } from "react";

class TicTacToeClass extends Component {
  state = {
    value: "hello, Class",
  };

  render() {
    const { value } = this.state;
    return (
      <>
        <div>{value}</div>
      </>
    );
  }
}

export default TicTacToeClass;
