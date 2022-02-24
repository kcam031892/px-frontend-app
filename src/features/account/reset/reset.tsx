import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import FrontLayout from '..';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, postCheckCode, postReset, showError } from '../../../app/appSlice';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from '../../../app/rootReducer';
import PasswordStrength from '../../../components/PasswordStrength';
import { PasswordPrinciple, validatePassword } from '../../../utils/passwordUtil';
import { Password } from '../../../components/textField';

interface ResetState {
  password: string;
  repeatPassword: string;
}

export default function Reset() {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const params = queryString.parse(search);
  useEffect(() => {
    dispatch(postCheckCode(params.code as string));
  }, [dispatch, params.code]);

  const [resetState, setResetState] = React.useState<ResetState>({
    password: '',
    repeatPassword: '',
  });

  const [validateResult, setValidateResult] = useState<PasswordPrinciple | undefined>(undefined);
  const [repeatPasswordInvalid, setRepeatPasswordInvalid] = useState(false);

  const handleChange = (prop: keyof ResetState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setResetState({ ...resetState, [prop]: event.target.value });
  };

  const handleReset = () => {
    setValidateResult(validatePassword(resetState.password));
    if (!validateResult?.IsValid) {
      dispatch(showError('Password Invalid. Please follow all requiremements to create a secure password'));
      return;
    }
    if (resetState.password !== resetState.repeatPassword) {
      setRepeatPasswordInvalid(true);
      dispatch(showError("Repeat password doesn't match the password "));
      return;
    }

    dispatch(postReset(params.code as string, resetState.password));
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      if (resetState.password.length > 0 && resetState.repeatPassword.length > 0) {
        handleReset();
      }
    }
  };

  const appState: AppState = useSelector((state: RootState) => state.app);

  const history = useHistory();
  useEffect(() => {
    if (appState.loggedIn) {
      history.replace('/app');
    }
  }, [appState.loggedIn, history]);

  return (
    <FrontLayout title1="Let’s set up a" title2="New Password" containerWidth={800}>
      <Box>
        <Grid container spacing={2}>
          <Grid xs={12} lg={6} item>
            <Password
              label={'New Password'}
              margin={'normal'}
              fullWidth
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ tabIndex: 1 }}
              value={resetState.password}
              error={validateResult?.IsValid === false}
              onChange={handleChange('password')}
            />

            <Password
              label={'Repeat Password'}
              margin={'normal'}
              fullWidth
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ tabIndex: 2 }}
              error={repeatPasswordInvalid}
              value={resetState.repeatPassword}
              onChange={handleChange('repeatPassword')}
              onKeyPress={handleInputKeyPress}
            />

            <Button
              variant="contained"
              disableElevation
              fullWidth
              tabIndex={3}
              style={{ marginTop: '24px' }}
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.stopPropagation();
                handleReset();
              }}
            >
              Save and Log In
            </Button>

            <Button
              variant="outlined"
              disableElevation
              fullWidth
              style={{ marginTop: '24px' }}
              component={Link}
              to={'/login'}
              tabIndex={4}
            >
              Cancel to Log In
            </Button>
          </Grid>
          <Grid xs={12} lg={6} item>
            <Box style={{ padding: '0px 15px', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
              <PasswordStrength validateResult={validateResult} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </FrontLayout>
  );
}
