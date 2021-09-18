//* App.js
// 필요한 react를 불러온다
const React = require("react");
const { Component } = React; // React.Component

const words = ["김기사", "개발자", "막걸리", "자연광", "모니터", "사이다", "상하이", "제주도"];
class App extends Component {
  state = {
    word: words[Math.floor(Math.random() * words.length)],
    value: "",
    result: "",
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    console.log(this.state.value);
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: "딩동댕",
        word: this.state.value,
        value: "",
      });
    } else {
      this.setState({
        result: "땡!!",
        value: "",
      });
    }
    this.input.focus();
  };

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  input;
  onRefInput = (c) => {
    this.input = c;
  };

  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}
// 다른 곳에서도 사용할수 있게 해당 component를 내보내준다
module.exports = App;
