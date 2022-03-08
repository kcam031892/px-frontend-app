import Login from 'pages/Login';
import Signup from 'pages/Signup';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { ROUTES } from 'shared/constants/ROUTES';
import ClientRoute from './ClientRoute';
import PublicRoute from './PublicRoute';

const AsyncProfileList = React.lazy(() => import('pages/Profiles/ProfileList'));
const AsyncProfileDetail = React.lazy(() => import('pages/Profiles/ProfileDetail'));

const Routes = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.ROOT} component={() => <Redirect to={ROUTES.LOGIN} />} />
      <PublicRoute exact path={ROUTES.LOGIN} component={Login} />
      <PublicRoute exact path={ROUTES.SIGNUP} component={Signup} />
      <ClientRoute exact path={ROUTES.APP.PROFILE} component={AsyncProfileList} />
      <ClientRoute exact path={ROUTES.APP.PROFILE_DETAIL} component={AsyncProfileDetail} />
      <ClientRoute exact path={`${ROUTES.APP.PROFILE_DETAIL}/:tab`} component={AsyncProfileDetail} />
    </Switch>
  );
};

export default Routes;
