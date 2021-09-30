import React, { useMemo } from "react";
import "./ReactRouter.css";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";

import WordPlay from "../../02-wordRelay-react/App";
import ResponseCheckClass from "../../05-responseCheck/components-class/ResponseCheckClass";
import RSPClass from "../../06-rockScissorPaper/components-class/RSPClass";
import LottoClass from "../../07-lotto/components-class/LottoClass";

const ReactRouter = () => {
  // todo
  return useMemo(() => (
    <BrowserRouter>
      <div className="var">
        <Link to="/끝말잇기">끝말잇기</Link>
        <Link to="/반응속도체크">반응속도체크</Link>
        <Link to="/가위바위보">가위바위보</Link>
        <Link to="/로또추첨기">로또추첨기</Link>
      </div>
      <div className="main">
        <Switch>
          <Route path="/끝말잇기" component={WordPlay} />
          <Route path="/반응속도체크" component={ResponseCheckClass} />
          <Route path="/가위바위보" component={RSPClass} />
          <Route path="/로또추첨기" component={LottoClass} />
        </Switch>
      </div>
    </BrowserRouter>
  ));
};

export default ReactRouter;

// npm install react-router
// npm install react-router-dom

/*
<BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/GuGuDan">구구단</Link>
      <Link to="./">wordRelay</Link>
      <Link to="./">numberBaseball</Link>
      <Link to="./">responseCheck</Link>
      <Link to="./">RSP</Link>
      <Link to="./">Lotto</Link>
      <Link to="./">MineGame</Link>
      <Link to="./"></Link>
      <div>
        <Router path="/GuGuDan" component={GuGuDan} />
      </div>
    </BrowserRouter>
*/
