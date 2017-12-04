import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/HomePage/HomePage';
import SignUpPage from './routes/SignUpPage/SignUpPage';
import InfoCenterPage from './routes/InfoCenterPage/InfoCenterPage';
import SquarePage from './routes/SquarePage/SquarePage';
import HostPage from './routes/HostPage/HostPage.js';
import AlbumPage from './routes/AlbumPage/AlbumPage';
import Error404 from './routes/404';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/signUp" exact component={SignUpPage} />
        <Route path="/infoCenter/:target" exact component={InfoCenterPage} />
        <Route path="/square/:target" exact component={SquarePage} />
        <Route path="/user/:hostId" component={HostPage} />
        <Route path="/album/:albumId" component={AlbumPage} />
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
