import { Layout } from 'components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router';
import { ROUTES } from 'shared/constants/ROUTES';
import { getUserProfile, selectUserState } from 'shared/redux/slicers/user.slicer';
import { tokenService } from 'shared/services/tokenService';

type Props = {
  component: React.FC;
  exact?: boolean;
  path: string;
};
const { getAuthToken, isAuthenticated, isCompletedPrimaryDetail } = tokenService();
const ClientRoute: React.FC<Props> = ({ component: Component, exact, path }) => {
  // isAuthenticated() ? <Component /> : <Redirect to={ROUTES.LOGIN} />

  const authToken = getAuthToken();
  const dispatch = useDispatch();
  const { isLoggedIn, errorMessage } = useSelector(selectUserState);
  const history = useHistory();
  useEffect(() => {
    if (authToken && !isLoggedIn) {
      dispatch(getUserProfile());
    }
  }, [authToken, isLoggedIn, dispatch]);

  return (
    <Layout>
      <Route
        component={() => {
          if (isAuthenticated() && isCompletedPrimaryDetail()) {
            return <Component />;
          } else if (isAuthenticated() && !isCompletedPrimaryDetail()) {
            return <Redirect to={ROUTES.COMPLETE_PROFILE} />;
          } else {
            return <Redirect to={ROUTES.LOGIN} />;
          }
        }}
        exact={exact}
        path={path}
      />
    </Layout>
  );
};

export default ClientRoute;
