import {
  Box,
  Button,
  FormControlLabel,
  Snackbar,
  TextField,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FacebookLogin, FrontLayout, GoogleLogin } from 'components';
import { MyCheckBox } from 'components/textField';
import { FormikProps, useFormik } from 'formik';
import React, { useEffect } from 'react';
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from 'shared/constants/ROUTES';
import { ISignInRequestPayload, ISignInResponsePayload } from 'shared/interfaces/IUser';
import {
  selectUserState,
  setErrorMessage,
  userFacebookLogin,
  userGoogleLogin,
  userLogin,
} from 'shared/redux/slicers/user.slicer';
import { authService } from 'shared/services/authService';
import { getErrorMessage } from 'shared/utils/getErrorMessage';
import { ls } from 'shared/utils/ls';
import { Backdrop, Input, InputPassword } from 'themes/elements';
import * as yup from 'yup';

import { useStyles } from './Login.styles';

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
      history.push(ROUTES.TALENT.PROFILE);
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

  const asnycLogin = (values: ISignInRequestPayload): Promise<any> => Promise.resolve(dispatch(userLogin(values)));
  const handleLoginSubmit = async (values: ISignInRequestPayload) => {
    const response = await asnycLogin(values);
    if (response) {
      console.log('login success', response.attributes);
    }
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

  const handleLogin = () => {};

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
          {errorMessage && 'Login Failed. Invalid Email or Password entered.'}
        </Alert>
      </Snackbar>
      <Backdrop isLoading={isLoading} />
    </FrontLayout>
  );
};

export default Login;
