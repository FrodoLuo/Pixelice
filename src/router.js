import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/HomePage/HomePage';
import SignUpPage from './routes/SignUpPage/SignUpPage';
import InfoCenterPage from './routes/InfoCenterPage/InfoCenterPage';
import SquarePage from './routes/SquarePage/SquarePage';
import Error404 from './routes/404';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/signUp" exact component={SignUpPage} />
        <Route path="/infoCenter" exact component={InfoCenterPage} />
        <Route path="/square" exact component={SquarePage} />
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
