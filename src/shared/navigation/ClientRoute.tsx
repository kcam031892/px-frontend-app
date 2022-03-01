import { Layout } from 'components';
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

const ClientRoute: React.FC<Props> = ({ component: Component, exact, path }) => {
  return (
    <Layout>
      <Route
        component={() => (isAuthenticated() ? <Component /> : <Redirect to={ROUTES.LOGIN} />)}
        exact={exact}
        path={path}
      />
    </Layout>
  );
};

export default ClientRoute;
