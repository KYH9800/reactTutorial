const React = require("react");
const { useState, useRef } = React;

const GuGuDan = () => {
  // Hooks에서 state를 선언하는 방법 (구조 분해 할당)
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      // setCount((c) => { return c + 1 }); 예전값을 이용할 시 state 비동기 문제 해결 가능
      setResult((prevResult) => {
        return `${first} X ${second} = ${value} 정답!`;
      });
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue("");
      inputRef.current.focus();
    } else {
      setResult(`${first} X ${second} = ${value} 틀렸습니다!`);
      setValue("");
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  console.log("렌더링");
  return (
    <>
      <div>
        {first} X {second} = ?
      </div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} value={value} onChange={onChangeInput} type="number" />
        <button>입력</button>
      </form>
      <div id="result">{result}</div>
    </>
  );
};

module.exports = GuGuDan;
