import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "./pages/home";
import CaseManage from "./pages/caseManage";
import TimingRemind from "./pages/timingRemind";
import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/" render={() => (
        <Home>
          <Switch>
            <Route path="/" exact component={TimingRemind} />
            <Route path="/caseManage" exact component={CaseManage} />
            <Redirect from="/*" to="/"></Redirect>
          </Switch>
        </Home>
      )}
      />
    </Router>
  );
}

export default App;
