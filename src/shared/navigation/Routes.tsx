import CompleteProfile from 'pages/CompleteProfile/CompleteProfile';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import { selectUserState, setErrorMessage, setResponseMessage } from 'shared/redux/slicers/user.slicer';
import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { ROUTES } from 'shared/constants/ROUTES';

import ClientRoute from './ClientRoute';
import PublicRoute from './PublicRoute';

const AsyncProfileList = React.lazy(() => import('pages/Profiles/ProfileList'));
const AsyncProfileDetail = React.lazy(() => import('pages/Profiles/ProfileDetail'));
const AsyncMedia = React.lazy(() => import('pages/Media/Media'));
const AsyncSettings = React.lazy(() => import('pages/Settings/Settings'));

const Routes = () => {
  const dispatch = useDispatch();
  const { errorMessage, responseMessage } = useSelector(selectUserState);

  const handleSnackBarClose = () => {
    dispatch(setErrorMessage(null));
    dispatch(setResponseMessage(null));
  };

  return (
    <Fragment>
      <Switch>
        <Route exact path={ROUTES.ROOT} component={() => <Redirect to={ROUTES.LOGIN} />} />
        <PublicRoute exact path={ROUTES.LOGIN} component={Login} />
        <PublicRoute exact path={ROUTES.SIGNUP} component={Signup} />
        <PublicRoute exact path={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
        <PublicRoute exact path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
        <Route exact path={ROUTES.COMPLETE_PROFILE} component={CompleteProfile} />
        <ClientRoute exact path={ROUTES.TALENT.PROFILE} component={AsyncProfileList} />
        <ClientRoute exact path={ROUTES.TALENT.PROFILE_DETAIL} component={AsyncProfileDetail} />
        <ClientRoute exact path={`${ROUTES.TALENT.PROFILE_DETAIL}/:profileId/:tab`} component={AsyncProfileDetail} />
        <ClientRoute exact path={`${ROUTES.TALENT.MEDIA}/:tab`} component={AsyncMedia} />
        <ClientRoute exact path={`${ROUTES.TALENT.PROFILE_DETAIL}/:tab`} component={AsyncProfileDetail} />
        <ClientRoute exact path={ROUTES.TALENT.SETTINGS} component={AsyncSettings} />
        <ClientRoute exact path={`${ROUTES.TALENT.SETTINGS}/:tab`} component={AsyncSettings} />
        <Route path="*" exact component={() => <h1>Not Found</h1>} />
      </Switch>
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleSnackBarClose}>
        <Alert severity="error" onClose={handleSnackBarClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={!!responseMessage} autoHideDuration={6000} onClose={handleSnackBarClose}>
        <Alert severity="success" onClose={handleSnackBarClose}>
          {responseMessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default Routes;
