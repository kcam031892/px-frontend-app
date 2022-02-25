import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './app/store';
import { ConfirmProvider } from 'material-ui-confirm';
import SwitchThemeProvider from './app/SwitchThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import 'fontsource-roboto';
import 'fontsource-roboto/300.css';
import 'fontsource-roboto/500.css';
import 'fontsource-roboto/700.css';
import 'fontsource-roboto/900.css';
import { AppState, finishLoading, setCurrentResult, startLoading } from './app/appSlice';
import { RootState } from './app/rootReducer';
import axios from 'axios';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './features/account/login';
import ProtectedRoute from './app/Auth';
import Forgot from './features/account/forgot/forgot';
import Reset from './features/account/reset/reset';
import { CookiesProvider, useCookies } from 'react-cookie';
import SignUp from './features/account/signUp';
import SignUpConfirm from './features/account/signUp/signUpConfirm';
import SignUpSuccess from './features/account/signUp/signUpSuccess';
import FaceBookAuth from './features/account/auth';
import { AxiosConfig } from './utils/axiosConfig';
import { RepresentationAccept } from './features/account/representation/representationAccept';
import { RepresentationReject } from './features/account/representation/representationReject';

ReactDOM.render(
  // <React.StrictMode>
  <SwitchThemeProvider>
    <SnackbarProvider maxSnack={3}>
      <CssBaseline />
      <Provider store={store}>
        <ConfirmProvider>
          <CookiesProvider>
            <Root />
          </CookiesProvider>
        </ConfirmProvider>
      </Provider>
    </SnackbarProvider>
  </SwitchThemeProvider>,
  // </React.StrictMode>,
  document.getElementById('root'),
);

function Root() {
  const dispatch = useDispatch();
  axios.interceptors.request.use(
    (config) => {
      if (AxiosConfig.enableInterceptors) {
        dispatch(startLoading());
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axios.interceptors.response.use(
    (response) => {
      if (AxiosConfig.enableInterceptors) {
        dispatch(finishLoading());
        dispatch(setCurrentResult(response.data));
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const [cookies] = useCookies(['memberId']);
  if (cookies.memberId) {
    sessionStorage.setItem('memberId', cookies.memberId);
  }

  const appState: AppState = useSelector((state: RootState) => state.app);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgot">
            <Forgot />
          </Route>
          <Route path="/reset">
            <Reset />
          </Route>
          <Route path="/auth/faceBook/callBack" component={FaceBookAuth} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signupConfirm" component={SignUpConfirm} />
          <Route path="/signupSuccess" component={SignUpSuccess} />
          <Route path="/representation/accept/:requestId" component={RepresentationAccept} />
          <Route path="/representation/deny/:requestId" component={RepresentationReject} />
          <Route path="/app" component={App} />
          <Route exact path="/">
            <Redirect to="/app" />
          </Route>
        </Switch>
      </Router>
      <Backdrop open={appState.isLoading} style={{ color: '#fff', zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
