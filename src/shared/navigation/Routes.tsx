import LoginPage from 'pages/LoginPage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTES } from 'shared/constants/ROUTES';
import ClientRoutes from './ClientRoutes';

const AsyncDashboardPage = React.lazy(() => import('pages/Dashboard'));
const AsyncDashboardDetailPage = React.lazy(() => import('pages/DashboardDetail'));
const AsyncProfileList = React.lazy(() => import('pages/ProfilePage/ProfileList'));
const AsyncProfileDetail = React.lazy(() => import('pages/ProfilePage/ProfileDetail'));

const Routes = () => {
  return (
    <Switch>
      <Route exact path={ROUTES.LOGIN} component={LoginPage} />
      <ClientRoutes exact path={ROUTES.DASHBOARD} component={AsyncDashboardPage} />
      <ClientRoutes exact path={`${ROUTES.DASHBOARD}/:id`} component={AsyncDashboardDetailPage} />
      <ClientRoutes exact path={ROUTES.PROFILE} component={AsyncProfileList} />
      <ClientRoutes exact path={ROUTES.PROFILE_DETAIL} component={AsyncProfileDetail} />
      <ClientRoutes exact path={ROUTES.TALENT} component={AsyncDashboardPage} />
      <ClientRoutes exact path={ROUTES.AGENCIES} component={AsyncDashboardPage} />
      <ClientRoutes exact path={ROUTES.MESSAGING} component={AsyncDashboardPage} />
      <ClientRoutes exact path={ROUTES.CONTACTS} component={AsyncDashboardPage} />
    </Switch>
  );
};

export default Routes;
