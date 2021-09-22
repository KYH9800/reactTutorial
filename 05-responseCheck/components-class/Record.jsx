import React, { PureComponent } from "react";

class Record extends PureComponent {
  render() {
    return (
      <>
        <li>
          {this.props.idx + 1}. {this.props.val} ms
        </li>
      </>
    );
  }
}

export default Record;
