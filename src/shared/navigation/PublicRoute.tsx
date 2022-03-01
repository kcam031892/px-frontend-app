import React from 'react';
import { Redirect, Route } from 'react-router';
import { ROUTES } from 'shared/constants/ROUTES';
import { tokenService } from 'shared/services/tokenService';

type Props = {
  component: React.FC;
  exact?: boolean;
  path: string;
};

const { isAuthenticated } = tokenService();
const PublicRoute: React.FC<Props> = ({ component: Component, path, exact }) => {
  return (
    <Route
      component={() => (!isAuthenticated() ? <Component /> : <Redirect to={ROUTES.APP.PROFILE} />)}
      exact={exact}
      path={path}
    />
  );
};

export default PublicRoute;
