import React, { useEffect, useState } from 'react';
import FrontLayout from '..';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, initialForgot, requestForgot, showError } from '../../../app/appSlice';
import { RootState } from '../../../app/rootReducer';
import { isValidEmail } from '../../../utils/textUtils';
import { Link } from 'react-router-dom';
export default function Forgot() {
  const [email, setEmail] = useState('');
  const [emilSent, setEmailSent] = useState(false);
  const dispatch = useDispatch();
  const handleForgotPassword = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const emailValid = isValidEmail(email);
    if (emailValid) {
      setEmailSent(true);
      dispatch(requestForgot(email));
    } else {
      dispatch(showError('Sorry, the email is invalid'));
    }
  };

  const appState: AppState = useSelector((state: RootState) => state.app);

  useEffect(() => {
    dispatch(initialForgot());
  }, [dispatch]);

  return (
    <FrontLayout title1="Forgot your" title2="Password?">
      {!(emilSent && appState.requestForgotOk) && (
        <Box>
          <Typography
            variant="body2"
            style={{
              marginTop: '24px',
              marginBottom: '16px',
            }}
          >
            Don’t worry it happens to all of us, we gotcha covered !
          </Typography>
          <Box>
            <TextField
              label={'Email Address'}
              fullWidth
              margin={'normal'}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ tabIndex: 5 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={(event: React.MouseEvent<HTMLElement>) => handleForgotPassword(event)}
              style={{ margin: '24px 0px 16px 0px' }}
            >
              Reset Password
            </Button>
            <Button variant="outlined" disableElevation fullWidth component={Link} to={'/login'} tabIndex={4}>
              Cancel to Log In
            </Button>
          </Box>
        </Box>
      )}
      {emilSent && appState.requestForgotOk && (
        <Box>
          <Typography
            variant="subtitle2"
            style={{
              marginTop: '24px',
            }}
          >
            Please check your email now
          </Typography>
          <Typography
            style={{
              fontSize: '14px',
              marginTop: '8px',
            }}
          >
            If the email you entered is in our database, we will send you an email to reset your password.
          </Typography>
        </Box>
      )}
    </FrontLayout>
  );
}
