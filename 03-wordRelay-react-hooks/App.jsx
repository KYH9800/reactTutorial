const React = require("react");
const { useState, useRef } = React;

const words = ["김기사", "개발자", "막걸리", "자연광", "모니터", "사이다", "상하이", "제주도"];
const App = () => {
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log(value);
    if (word[word.length - 1] === value[0]) {
      setResult("딩동댕");
      setWord(value);
      setValue("");
    } else {
      setResult("땡");
      setValue("");
    }
    inputRef.current.focus();
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input placeholder="글자를 입력하세요" ref={inputRef} value={value} onChange={onChangeInput} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = App;
