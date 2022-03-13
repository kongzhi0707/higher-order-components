import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

// 导入所有的路由文件
import NotFound from '@components/NotFound';
import FirstRouter from './firstRouter';

const routes = [
  ...FirstRouter
];
// 根据条件生成相应的组件
const RouteWithSubRoutes = route => {
  if (!route.path) {
    return <Route component={NotFound} />;
  }
  return (
    <Route
      exact
      strict
      path = {route.path}
      render = {
        props => (
          route.redirect ? <Redirect push to={route.redirect} from={route.path} />
          : (route.component ? <route.component {...props} routes={route.routes} /> : '')
        )
      }
    />
  );
};

const RouterIndex = () => (
    <div>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          {
            routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
          }
        </Suspense>
      </Router>
    </div>
  );

export default RouterIndex;
