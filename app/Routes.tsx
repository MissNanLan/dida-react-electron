import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './components/Main';
import routes from './constants/routes.json';
// import Counter from './containers/CounterPage';
import HomePage from './containers/home/index';
import CaseManagePage from './containers/caseManage/store/store';

export default function Routes() {
  return (
    <Main>
      <Switch>
        <Route path={routes.CASEMANAGE} component={CaseManagePage} />>
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </Main>
  );
}
