import {
  Box,
  Button,
  createStyles,
  FormControlLabel,
  makeStyles,
  Snackbar,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'app/appSlice';
import { RootState } from 'app/rootReducer';
import { MyCheckBox } from 'components/textField';
import { ResultType } from 'types';
import * as yup from 'yup';
import { useStyles } from './Login.styles';
import { ROUTES } from 'shared/constants/ROUTES';
import {
  selectUserState,
  setErrorMessage,
  userFacebookLogin,
  userGoogleLogin,
  userLogin,
} from 'shared/redux/slicers/user.slicer';
import { FacebookLogin, FrontLayout, GoogleLogin } from 'components';
import { ISignInRequestPayload } from 'shared/interfaces/IUser';
import { FormikProps, useFormik } from 'formik';
import { Backdrop, Input, InputPassword } from 'themes/elements';
import { getErrorMessage } from 'shared/utils/getErrorMessage';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { Alert } from '@material-ui/lab';
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import { authService } from 'shared/services/authService';
import { ls } from 'shared/utils/ls';

interface LoginState {
  userName: string;
  password: string;
  rememberMe: boolean;
}

const { getLS } = ls();
const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, isLoading, errorMessage, isLoggedIn } = useSelector(selectUserState);

  useEffect(() => {
    if (isLoggedIn) {
      history.push(ROUTES.APP.PROFILE);
    }
  }, [isLoggedIn, history]);

  const initialValues: ISignInRequestPayload = {
    user: {
      email: 'test123@test.com',
      password: 'Asdf123',
    },
  };

  const signInValidationSchema: yup.SchemaOf<ISignInRequestPayload> = yup.object().shape({
    user: yup.object({
      email: yup.string().email('Email must be a valid email').required('Email is required'),
      password: yup.string().required('Password is required'),
    }),
  });

  const handleLoginSubmit = async (values: ISignInRequestPayload) => {
    dispatch(userLogin(values));
  };

  const form: FormikProps<ISignInRequestPayload> = useFormik({
    initialValues,
    validationSchema: signInValidationSchema,
    onSubmit: (values) => handleLoginSubmit(values),
  });

  const [loginState, setLoginState] = React.useState<LoginState>({
    userName: '',
    password: '',
    rememberMe: false,
  });

  const handleCheckBoxChange = (prop: keyof LoginState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [prop]: event.target.checked });
  };

  const handleGoogleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('tokenId' in response) {
      const token = response.tokenId;
      dispatch(userGoogleLogin(token));
    }
  };

  const handleFacebookSuccess = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    if ('accessToken' in response) {
      const token = response.accessToken;
      dispatch(userFacebookLogin(token));
    }
  };

  const appState: AppState = useSelector((state: RootState) => state.app);

  const handleLogin = () => {
    // if (loginState.userName.length > 0 && loginState.password.length > 0) {
    //   dispatch(userLogin(loginState.userName, loginState.password, loginState.rememberMe));
    // }
    // history.push(ROUTES.APP.PROFILE);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleSnackBarClose = () => {
    dispatch(setErrorMessage(null));
  };

  // useEffect(() => {
  //   if (appState.loggedIn) {
  //     history.replace('/app');
  //   }
  // }, [appState.loggedIn, history]);

  return (
    <FrontLayout>
      <Box>
        <Input
          label={'Email Address'}
          name="user.email"
          errorMessage={getErrorMessage(form.touched.user?.email, form.errors.user?.email)}
          fullWidth
          margin={'normal'}
          autoFocus
          inputProps={{ tabIndex: 1 }}
          onChange={form.handleChange}
          onKeyPress={handleInputKeyPress}
          InputProps={{ disableUnderline: true }}
          InputLabelProps={{ shrink: true }}
          value={form.values.user.email}
        />

        <InputPassword
          label={'Password'}
          fullWidth
          errorMessage={getErrorMessage(form.touched.user?.password, form.errors.user?.password)}
          name="user.password"
          InputProps={{ disableUnderline: true }}
          InputLabelProps={{ shrink: true }}
          inputProps={{ tabIndex: 2 }}
          onChange={form.handleChange}
          value={form.values.user.password}
          onKeyPress={handleInputKeyPress}
        />
      </Box>
      <Box className={classes.extraContainer}>
        <Box>
          <FormControlLabel
            control={
              <MyCheckBox
                name="remmeberMe"
                onChange={handleCheckBoxChange('rememberMe')}
                value={loginState.rememberMe}
              />
            }
            label="Remember Me"
          />
        </Box>
        <Box>
          <Link to="/forgot" className={classes.forgotLink}>
            Forgot Password?
          </Link>
        </Box>
      </Box>
      <Button
        variant="contained"
        disableElevation
        fullWidth
        onClick={() => form.handleSubmit()}
        style={{ marginBottom: '16px' }}
        disabled={isLoading}
      >
        Log In
      </Button>
      <GoogleLogin handleLoginSuccess={handleGoogleSuccess} />
      <FacebookLogin handleLoginSuccess={handleFacebookSuccess} />
      <Button variant="outlined" disableElevation fullWidth component={Link} to={'/signup'}>
        Create an Account
      </Button>

      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleSnackBarClose}>
        <Alert severity="error" onClose={handleSnackBarClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
      <Backdrop isLoading={isLoading} />
    </FrontLayout>
  );
};

export default Login;
