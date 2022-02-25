import Login from 'features/account/login';
import React from 'react';
import { Route, Switch } from 'react-router';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
    </Switch>
  );
};

export default Routes;
