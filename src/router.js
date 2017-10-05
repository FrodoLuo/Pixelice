import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import SignUpPage from './routes/SignUpPage/SignUpPage';

function RouterConfig({ history }) {
  return (
    <Router history={history} location="hash">
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/signUp" exact component={SignUpPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
