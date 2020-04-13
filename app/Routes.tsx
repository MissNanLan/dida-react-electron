import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './components/Main';
// import Nav from './components/Nav';
import routes from './constants/routes.json';
// import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';

export default function Routes() {
  return (
    <Main>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </Main>
  );
}
