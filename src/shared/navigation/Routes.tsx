import Login from 'pages/Login';
import Signup from 'pages/Signup';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { ROUTES } from 'shared/constants/ROUTES';

import ClientRoute from './ClientRoute';
import PublicRoute from './PublicRoute';

const AsyncProfileList = React.lazy(() => import('pages/Profiles/ProfileList'));
const AsyncProfileDetail = React.lazy(() => import('pages/Profiles/ProfileDetail'));
const AsyncMedia = React.lazy(() => import('pages/Media/Media'));
const AsyncSettings = React.lazy(() => import('pages/Settings/Settings'));

const Routes = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.ROOT} component={() => <Redirect to={ROUTES.LOGIN} />} />
      <PublicRoute exact path={ROUTES.LOGIN} component={Login} />
      <PublicRoute exact path={ROUTES.SIGNUP} component={Signup} />
      <ClientRoute exact path={ROUTES.TALENT.PROFILE} component={AsyncProfileList} />
      <ClientRoute exact path={ROUTES.TALENT.PROFILE_DETAIL} component={AsyncProfileDetail} />
      <ClientRoute exact path={`${ROUTES.TALENT.PROFILE_DETAIL}/:profileId/:tab`} component={AsyncProfileDetail} />s
      <ClientRoute exact path={`${ROUTES.TALENT.MEDIA}/:tab`} component={AsyncMedia} />
      <ClientRoute exact path={`${ROUTES.TALENT.PROFILE_DETAIL}/:tab`} component={AsyncProfileDetail} />
      <ClientRoute exact path={ROUTES.TALENT.SETTINGS} component={AsyncSettings} />
      <ClientRoute exact path={`${ROUTES.TALENT.SETTINGS}/:tab`} component={AsyncSettings} />
      <Route path="*" exact component={() => <h1>Not Found</h1>} />
    </Switch>
  );
};

export default Routes;
