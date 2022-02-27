import Login from 'pages/Login';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { ROUTES } from 'shared/constants/ROUTES';
import ClientRoute from './ClientRoute';

const AsyncProfileList = React.lazy(() => import('pages/Profiles/ProfileList'));

const Routes = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.ROOT} component={() => <Redirect to={ROUTES.LOGIN} />} />
      <Route exact path={ROUTES.LOGIN} component={Login} />
      <ClientRoute exact path={ROUTES.APP.PROFILE} component={AsyncProfileList} />
    </Switch>
  );
};

export default Routes;
