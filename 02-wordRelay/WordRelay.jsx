//* App.js
// 필요한 react를 불러온다
const React = require("react");
const { Component } = React; // React.Component

class WordRelay extends Component {
  state = {
    text: "hello, webpack !!",
  };
  render() {
    return (
      <>
        <h1>{this.state.text}</h1>
      </>
    );
  }
}
// 다른 곳에서도 사용할수 있게 해당 component를 내보내준다
module.exports = WordRelay;
