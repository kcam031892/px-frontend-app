import { Layout } from 'components';
import React from 'react';
import { Route } from 'react-router';

type Props = {
  component: React.FC;
  exact?: boolean;
  path: string;
};
const ClientRoute: React.FC<Props> = ({ component: Component, exact, path }) => {
  return (
    <Layout>
      <Route component={Component} exact={exact} path={path} />
    </Layout>
  );
};

export default ClientRoute;
