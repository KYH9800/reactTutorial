import React, { useMemo, useState } from "react";
import "./ReactRouter.css";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
// GameMatcher
import GameMatcher from "./GameMatcher";

const ReactRouter = () => {
  return useMemo(() => (
    //! QueryString: /game/:name?key=value&key=value&key=value
    //! 사용자가 입력 데이터를 전달하는 방법중의 하나로, url 주소에 미리 협의된 데이터를 파라미터를 통해 넘기는 것을 말한다.
    <HashRouter>
      <div className="var">
        <Link to="/game">처음화면</Link>
        <Link to="/game/끝말잇기?query=10&hello=kyh&by=react-router">끝말잇기</Link>
        <Link to="/game/반응속도체크?query=11&hello=kyh&by=react-router">반응속도체크</Link>
        <Link to="/game/가위바위보?query=12&hello=kyh&by=react-router">가위바위보</Link>
        <Link to="/game/로또추첨기?query=13&hello=kyh&by=react-router">로또추첨기</Link>
      </div>
      <div className="main">
        <Switch>
          <Route path="/game/:name" component={GameMatcher} />
        </Switch>
      </div>
    </HashRouter>
  ));
};

export default ReactRouter;

//* npm install react-router
//* npm install react-router-dom

/* HashRouter: 프론트엔드만 알수있다. (서버쪽으로 요청이가서 새로고침하면 Cannot GET / message 가 뜨면서 서버쪽에선 알 수가 없다) */
/* HashRouter: 프론트엔드에 요청이간다. server는 모르고 browser만 안다.
- "#" 뒤에 부분은 브라우저만 아는 부분이다 (react router도 안다)
- 단점: server가 모르기 때문에 검색엔진에는 문제가 된다
- 실무에서는 HashRouter를 쓴다 */
