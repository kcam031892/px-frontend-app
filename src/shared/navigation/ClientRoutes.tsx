import { Layout } from 'components';
import React from 'react';
import { Route } from 'react-router-dom';

type Props = {
  component: React.FC;
  exact?: boolean;
  path: string;
};

const ClientRoutes: React.FC<Props> = ({ component: Component, exact, path }) => {
  return (
    <Layout>
      <Route path={path} exact={exact} render={() => <Component />} />
    </Layout>
  );
};

export default ClientRoutes;
