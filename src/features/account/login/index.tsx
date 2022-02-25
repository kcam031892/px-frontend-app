import { Box, Button, createStyles, FormControlLabel, makeStyles, TextField, Theme } from '@material-ui/core';
import React, { useEffect } from 'react';
import { MyCheckBox, Password } from '../../../components/textField';
import { Link, useHistory } from 'react-router-dom';
import { AppState, userLogin } from '../../../app/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { ResultType } from '../../../types';
import FrontLayout from '..';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    extraContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '16px',
      marginBottom: '34px',
      '& .MuiFormControlLabel-label': {
        fontSize: '14px',
      },
    },
    forgotLink: {
      color: '#A4A4A4',
      textDecoration: 'none',
    },
  }),
);

interface LoginState {
  userName: string;
  password: string;
  rememberMe: boolean;
}

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loginState, setLoginState] = React.useState<LoginState>({
    userName: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (prop: keyof LoginState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [prop]: event.target.value });
  };

  const handleCheckBoxChange = (prop: keyof LoginState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [prop]: event.target.checked });
  };

  const appState: AppState = useSelector((state: RootState) => state.app);

  const history = useHistory();
  const handleLogin = () => {
    if (loginState.userName.length > 0 && loginState.password.length > 0) {
      dispatch(userLogin(loginState.userName, loginState.password, loginState.rememberMe));
    }
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  useEffect(() => {
    if (appState.loggedIn) {
      history.replace('/app');
    }
  }, [appState.loggedIn, history]);

  return (
    <FrontLayout>
      <Box>
        <TextField
          label={'Email Address'}
          error={appState.currentResult?.type === ResultType.error && loginState.userName.length > 0}
          fullWidth
          margin={'normal'}
          autoFocus
          inputProps={{ tabIndex: 1 }}
          onChange={handleChange('userName')}
          onKeyPress={handleInputKeyPress}
          InputProps={{ disableUnderline: true }}
          InputLabelProps={{ shrink: true }}
        />

        <Password
          label={'Password'}
          margin={'normal'}
          fullWidth
          InputProps={{ disableUnderline: true }}
          InputLabelProps={{ shrink: true }}
          inputProps={{ tabIndex: 2 }}
          onChange={handleChange('password')}
          value={loginState.password}
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
            {' '}
            Forgot Password?{' '}
          </Link>
        </Box>
      </Box>
      <Button variant="contained" disableElevation fullWidth onClick={handleLogin} style={{ marginBottom: '16px' }}>
        Log In
      </Button>
      <Button variant="outlined" disableElevation fullWidth component={Link} to={'/signup'}>
        Create an Account
      </Button>
    </FrontLayout>
  );
}
