import React, { Component } from "react";

import WordPlay from "../../02-wordRelay-react/App";
import ResponseCheckClass from "../../05-responseCheck/components-class/ResponseCheckClass";
import RSPClass from "../../06-rockScissorPaper/components-class/RSPClass";
import LottoClass from "../../07-lotto/components-class/LottoClass";

export default class GameMatcher extends Component {
  render() {
    console.log("history: ", this.props.history, "location: ", this.props.location, "match: ", this.props.match);
    let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
    console.log("get: ", urlSearchParams.get("query"));
    const { match } = this.props;
    if (match.params.name === "끝말잇기") {
      return <WordPlay />;
    } else if (match.params.name === "반응속도체크") {
      return <ResponseCheckClass />;
    } else if (match.params.name === "가위바위보") {
      return <RSPClass />;
    } else if (match.params.name === "로또추첨기") {
      return <LottoClass />;
    }
    return (
      <>
        <div>일치하는 게임이 없습니다.</div>
      </>
    );
  }
}

// this.props.history: 앞으로가기 뒤로가기 기록이 있다 (react router 눈속임을 위한 정보)
// this.props.location: 주소만 보고 주소에 대한 정보
// this.props.match: params애 대한 정보
