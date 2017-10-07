import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import SignUpPage from './routes/SignUpPage/SignUpPage';
import InfoCenterPage from './routes/InfoCenterPage/InfoCenterPage';

function RouterConfig({ history }) {
  return (
    <Router history={history} location="hash">
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/signUp" exact component={SignUpPage} />
        <Route path="/infoCenter" exact component={InfoCenterPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
