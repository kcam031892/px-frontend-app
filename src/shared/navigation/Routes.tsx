import Login from 'pages/Login';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { ROUTES } from 'shared/constants/ROUTES';

const Routes = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.ROOT} component={() => <Redirect to={ROUTES.LOGIN} />} />
      <Route exact path={ROUTES.LOGIN} component={Login} />
    </Switch>
  );
};

export default Routes;
