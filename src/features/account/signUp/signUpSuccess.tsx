import { Box, Button, createStyles, Link, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import FrontLayout from '..';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { confirmSignUp } from '../accountSlice';
import queryString from 'query-string';
import { RootState } from '../../../app/rootReducer';
import { AccountState } from '../accountTypes';
import { AppState, completeLogin } from '../../../app/appSlice';
import { DataResult, ResultType } from '../../../types';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    supportLinks: {
      marginTop: 17,
      justifyContent: 'center',
      display: 'flex',
      '& a': {
        marginRight: '16px',
      },
    },
  }),
);
export default function SignUpSuccess() {
  const classes = useStyles();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const params = queryString.parse(search);
  useEffect(() => {
    dispatch(confirmSignUp(params.code as string));
  }, [dispatch, params.code]);

  const account: AccountState = useSelector((state: RootState) => state.account);

  const appState: AppState = useSelector((state: RootState) => state.app);

  const handleReturnToLogin = () => {
    const result = {
      type: ResultType.success,
      message: '',
      data: params.code,
    } as DataResult<string>;
    dispatch(
      completeLogin({
        rememberMe: false,
        result: result,
      }),
    );
  };

  const history = useHistory();
  useEffect(() => {
    if (appState.loggedIn) {
      history.replace('/app/settings');
    }
  }, [appState.loggedIn, history]);

  return (
    <FrontLayout title1="Now confirm your" title2="Email Address">
      <Typography variant="subtitle2" style={{ marginTop: '24px' }}>
        Thanks for verifying your email
      </Typography>
      <Typography variant="body2" style={{ marginTop: '8px' }}>
        Welcome to your new account with audition magic and to our online community. Now you are validated, you can
        continue setting up your account.
      </Typography>
      <Typography variant="body2" style={{ fontWeight: 700, marginTop: '24px' }}>
        Click the button below to return to login and use your credentials to access the system.
      </Typography>
      <Button
        variant="contained"
        disableElevation
        fullWidth
        disabled={!account.signUpConfirmSuccess}
        onClick={handleReturnToLogin}
        style={{ margin: '34px 0px 0px 0px' }}
      >
        Return to Login
      </Button>
      <Typography variant="body2" style={{ fontWeight: 700, marginTop: '34px' }}>
        Before you do, be sure to visit our social pages and connect with us to stay up to date too.
      </Typography>
      <Box className={classes.supportLinks}>
        <Link href="https://www.facebook.com/AuditionMagic/" target="_blank">
          <img src="/facebook.png" alt="facebook" />
        </Link>
        <Link href="https://instagram.com/auditionmagic" target="_blank">
          <img src="/instagram.png" alt="facebook" />
        </Link>
        <Link href="https://youtube.com/c/Auditionmagic" target="_blank">
          <img src="/youtube.png" alt="facebook" />
        </Link>
        <Link href="https://www.linkedin.com/company/audition-magic" target="_blank">
          <img src="/linkin.png" alt="facebook" />
        </Link>
      </Box>
    </FrontLayout>
  );
}
