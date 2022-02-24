import React, { useEffect, useState } from 'react';
import {
  Box,
  Theme,
  createStyles,
  makeStyles,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import FrontLayout from '..';
import { Password } from '../../../components/textField';
import { Link, useHistory } from 'react-router-dom';
import PasswordStrength from '../../../components/PasswordStrength';
import ContactNumber from '../../../components/ContactNumber';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOptions, OptionState } from '../../common/optionSlice';
import { RootState } from '../../../app/rootReducer';
import { Error } from '../../../types/commonTypes';
import { PasswordPrinciple, validatePassword } from '../../../utils/passwordUtil';
import { isValidEmail } from '../../../utils/textUtils';
import { getErrorMessage, hasError } from '../../../utils/errorUtil';
import { postSignUp, resetState } from '../accountSlice';
import { AccountState } from '../accountTypes';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    passwordContainer: {
      position: 'relative',
    },
    passwordHelper: {
      fontWeight: 500,
      position: 'absolute',
      top: '48px',
      right: '-22px',
      cursor: 'pointer',
    },
  }),
);

export interface SignUpState {
  firstName: string;
  lastName: string;
  contactNumberCode: string;
  contactNumber: string;
  emailAddress: string;
  countryCode: string;
  stateId: number;
  password: string;
  repeatPassword: string;
}

export default function SignUp() {
  const [signUpState, setSignUpState] = useState<SignUpState>({
    firstName: '',
    lastName: '',
    contactNumberCode: '+61',
    contactNumber: '',
    emailAddress: '',
    countryCode: 'AU',
    stateId: 0,
    password: '',
    repeatPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState<Error[]>([]);
  const [passwordValidateResult, setPasswordValidateResult] = useState<PasswordPrinciple | undefined>();
  const classes = useStyles();
  const normalSize = 456;
  const fullSize = 800;
  const [fullModel, setFullModel] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const dispatch = useDispatch();
  const option: OptionState = useSelector((state: RootState) => state.option);

  const account: AccountState = useSelector((state: RootState) => state.account);
  useEffect(() => {
    dispatch(fetchOptions());
    dispatch(resetState());
  }, [dispatch]);

  const history = useHistory();
  useEffect(() => {
    if (requestSent && account.signUpSuccess) {
      history.replace('/signupConfirm');
    }
  }, [account.signUpSuccess, history, requestSent]);

  const handleChange = (prop: keyof SignUpState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpState({ ...signUpState, [prop]: event.target.value.trim() });
  };

  const handleChangeByKeyValue = (field: string, value: string) => {
    setSignUpState({ ...signUpState, [field]: value });
  };

  const handleCreateAccount = () => {
    const errors: Error[] = [];
    if (signUpState.firstName.trim().length === 0) {
      errors.push({ field: 'firstName', message: 'First Name is required' });
    }

    if (signUpState.lastName.trim().length === 0) {
      errors.push({ field: 'lastName', message: 'Last Name is required' });
    }

    if (signUpState.lastName.trim().length === 0) {
      errors.push({ field: 'contactNumber', message: 'Contact number is required' });
    }
    if (signUpState.emailAddress.trim().length === 0) {
      errors.push({ field: 'emailAddress', message: 'Email address is required' });
    }

    const isEmailValid = isValidEmail(signUpState.emailAddress.trim());
    if (!isEmailValid) {
      errors.push({ field: 'emailAddress', message: 'Email address is not valid' });
    }
    if (signUpState.countryCode.trim().length === 0 || signUpState.stateId <= 0) {
      errors.push({ field: 'stateId', message: 'Country / State is required' });
    }

    if (signUpState.password.trim().length === 0) {
      errors.push({ field: 'password', message: 'Password is required' });
    }

    const passwordValidateResult = validatePassword(signUpState.password.trim());
    setPasswordValidateResult(passwordValidateResult);

    if (!passwordValidateResult.IsValid && !fullModel) {
      setFullModel(true);
    }

    if (signUpState.repeatPassword.trim().length === 0) {
      errors.push({ field: 'repeatPassword', message: 'Repeat password is required' });
    }

    if (signUpState.repeatPassword.trim() !== signUpState.password.trim()) {
      errors.push({ field: 'repeatPassword', message: "Repeat password doesn't match with password" });
    }

    setValidationErrors(errors);

    if (errors.length === 0 && passwordValidateResult.IsValid) {
      setRequestSent(true);
      dispatch(postSignUp(signUpState));
    }
  };

  return (
    <FrontLayout
      containerWidth={fullModel ? fullSize : normalSize}
      title1={'Let’s create your new'}
      title2={'Account Now'}
    >
      <Box>
        <Grid container spacing={2}>
          <Grid xs={12} lg={fullModel ? 6 : 12} item>
            <TextField
              label={'First Name'}
              autoFocus
              fullWidth
              margin={'normal'}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ tabIndex: 1 }}
              value={signUpState.firstName}
              onChange={handleChange('firstName')}
              error={hasError('firstName', validationErrors)}
              helperText={getErrorMessage('firstName', validationErrors)}
            />
            <TextField
              label={'Last Name'}
              fullWidth
              margin={'normal'}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ tabIndex: 2 }}
              value={signUpState.lastName}
              onChange={handleChange('lastName')}
              error={hasError('lastName', validationErrors)}
              helperText={getErrorMessage('lastName', validationErrors)}
            />
            <ContactNumber
              contactNumber={signUpState.contactNumber}
              contactNumberCode={signUpState.contactNumberCode}
              onCodeChange={(value) => handleChangeByKeyValue('contactNumberCode', value)}
              onNumberChange={(value) => handleChangeByKeyValue('contactNumber', value)}
              codeInputProps={{ tabIndex: 3 }}
              numberInputProps={{ tabIndex: 4 }}
              error={hasError('contactNumber', validationErrors)}
              helperText={getErrorMessage('contactNumber', validationErrors)}
            />
            <TextField
              label={'Email Address'}
              fullWidth
              margin={'normal'}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ tabIndex: 5 }}
              onChange={handleChange('emailAddress')}
              error={hasError('emailAddress', validationErrors)}
              helperText={getErrorMessage('emailAddress', validationErrors)}
            />
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <FormControl margin={'normal'} fullWidth error={hasError('stateId', validationErrors)}>
                    <InputLabel id="lblCountryState" shrink>
                      Country / State
                    </InputLabel>
                    <Select
                      disableUnderline
                      value={signUpState.countryCode}
                      inputProps={{ tabIndex: 6 }}
                      onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                        handleChangeByKeyValue('countryCode', event.target.value as string);
                      }}
                      error={hasError('stateId', validationErrors)}
                    >
                      {option.countries.map((x) => (
                        <MenuItem value={x.code}>{x.name}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{getErrorMessage('stateId', validationErrors)}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl margin={'normal'} fullWidth error={hasError('stateId', validationErrors)}>
                    <InputLabel id="lblState" shrink></InputLabel>
                    <Select
                      disableUnderline
                      value={signUpState.stateId}
                      inputProps={{ tabIndex: 7 }}
                      onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                        handleChangeByKeyValue('stateId', event.target.value as string);
                      }}
                      error={hasError('stateId', validationErrors)}
                    >
                      {option.states
                        .filter((x) => x.countryCode === signUpState.countryCode)
                        .map((x) => (
                          <MenuItem value={x.id}>{x.name}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Box className={classes.passwordContainer}>
              <Password
                label={'New Password'}
                margin={'normal'}
                fullWidth
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                inputProps={{ tabIndex: 8 }}
                error={hasError('password', validationErrors)}
                helperText={getErrorMessage('password', validationErrors)}
                onChange={handleChange('password')}
              />
              <span className={classes.passwordHelper} onClick={() => setFullModel(!fullModel)}>
                (?)
              </span>
              <Password
                label={'Repeat Password'}
                margin={'normal'}
                fullWidth
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                inputProps={{ tabIndex: 9 }}
                error={hasError('repeatPassword', validationErrors)}
                helperText={getErrorMessage('repeatPassword', validationErrors)}
                onChange={handleChange('repeatPassword')}
              />
            </Box>
            <Button
              variant="contained"
              disableElevation
              fullWidth
              tabIndex={10}
              style={{ marginTop: '24px' }}
              onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleCreateAccount()}
            >
              Create Account
            </Button>

            <Button
              variant="outlined"
              disableElevation
              fullWidth
              style={{ marginTop: '24px' }}
              component={Link}
              to={'/login'}
              tabIndex={11}
            >
              Cancel to Log In
            </Button>
          </Grid>
          {fullModel && (
            <Grid xs={12} lg={6}>
              <Box style={{ height: 430 }}></Box>
              <Box style={{ padding: '0px 30px' }}>
                <PasswordStrength validateResult={passwordValidateResult} />
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </FrontLayout>
  );
}
