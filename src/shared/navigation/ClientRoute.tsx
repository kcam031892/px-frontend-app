import { Layout } from 'components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { ROUTES } from 'shared/constants/ROUTES';
import { getUserProfile, selectUser, selectUserState } from 'shared/redux/slicers/user.slicer';
import { useAppDispatch } from 'shared/redux/store';
import { tokenService } from 'shared/services/tokenService';

type Props = {
  component: React.FC;
  exact?: boolean;
  path: string;
};
const { isAuthenticated } = tokenService();

const ClientRoute: React.FC<Props> = ({ component: Component, exact, path }) => {
  const { getAuthToken } = tokenService();
  const authToken = getAuthToken();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useSelector(selectUserState);

  useEffect(() => {
    if (authToken && !isLoggedIn) {
      dispatch(getUserProfile());
    }
  }, [authToken, isLoggedIn, dispatch]);
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
