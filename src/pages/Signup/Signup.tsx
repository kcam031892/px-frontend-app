import { Box, Button, Grid, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FrontLayout } from 'components';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ISignUpRequestPayload } from 'shared/interfaces/IUser';
import { ContactInput, Input, InputPassword, Select, Backdrop } from 'themes/elements';
import { selectUserState, userSignup, setErrorMessage } from 'shared/redux/slicers/user.slicer';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { getErrorMessage } from 'shared/utils/getErrorMessage';
import { IKeyValue } from 'shared/interfaces/utils/IKeyValue';
import { ROUTES } from 'shared/constants/ROUTES';
import { PasswordPrinciple, validatePassword } from 'shared/utils/passwordUtil';
import { PasswordStrength } from 'components/PasswordStrength';
import countriesList from 'data/Countries.json';
import statesList from 'data/States.json';
import { useStyles } from './Signup.styles';

const FULL_SIZE = 800;

const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [passwordValidationResult, setPasswordValidationResult] = useState<PasswordPrinciple | null>(null);
  const [states, setStates] = useState<any>([]);

  const { isLoading, errorMessage, isLoggedIn } = useSelector(selectUserState);

  useEffect(() => {
    if (isLoggedIn) {
      history.push(ROUTES.TALENT.PROFILE);
    }
  }, [isLoggedIn, history]);

  // Forms
  const initialValues: ISignUpRequestPayload = {
    first_name: '',
    last_name: '',
    contact_number: '',
    email: '',
    country: '',
    state: '',
    password: '',
    password_confirmation: '',
    user_type: 'talent',
  };

  const countries = countriesList.map((country) => ({ key: country.name, value: country.code }));

  const signUpValidationSchema: yup.SchemaOf<ISignUpRequestPayload> = yup.object({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    contact_number: yup.string().required('Contact number is required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    user_type: yup.string().required('User type is required'),
    password: yup
      .string()
      .required('Password is required')
      .test('passwordValidate', 'Invalid password', (value: any) => {
        if (value) {
          const validatePasswordResult = validatePassword(value);
          setPasswordValidationResult(validatePasswordResult);
          return validatePasswordResult.IsValid;
        }
        return false;
      }),
    password_confirmation: yup.string().required('Password confirmation is required.'),
  });

  const handleSetCountryStates = (countryCode: any) => {
    const filteredStates = statesList.filter((state) => state.countryCode === countryCode);
    const newStates = filteredStates.map((state) => ({ key: state.name, value: state.name }));
    setStates(newStates);
  };

  const handleSnackBarClose = () => {
    dispatch(setErrorMessage(null));
  };

  const handleSignUpSubmit = async (values: ISignUpRequestPayload) => {
    dispatch(userSignup(values));
  };

  const form: FormikProps<ISignUpRequestPayload> = useFormik({
    initialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => handleSignUpSubmit(values),
  });

  return (
    <FrontLayout heading="Let’s create your new" subHeading="Account Now" containerWidth={FULL_SIZE}>
      <Box>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={6} lg={6} item>
            <Input
              label={'First Name'}
              autoFocus
              name="first_name"
              onChange={form.handleChange}
              errorMessage={getErrorMessage(form.touched.first_name, form.errors.first_name)}
              value={form.values.first_name}
              fullWidth
              margin={'normal'}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ tabIndex: 1 }}
            />

            <Input
              label={'Last Name'}
              name="last_name"
              onChange={form.handleChange}
              errorMessage={getErrorMessage(form.touched.last_name, form.errors.last_name)}
              value={form.values.last_name}
              fullWidth
              margin={'normal'}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ tabIndex: 2 }}
            />
            <ContactInput
              name="contact_number"
              onChange={form.handleChange}
              errorMessage={getErrorMessage(form.touched.contact_number, form.errors.contact_number)}
              value={form.values.contact_number}
            />
            <Input
              label={'Email Address'}
              name="email"
              onChange={form.handleChange}
              errorMessage={getErrorMessage(form.touched.email, form.errors.email)}
              value={form.values.email}
              fullWidth
              margin={'normal'}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ tabIndex: 5 }}
            />
            <Box className={classes.location__container}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Select
                    label="Country / State"
                    fullWidth
                    data={countries}
                    value={form.values.country}
                    onChange={(event) => {
                      form.setFieldValue('country', event.target.value);
                      handleSetCountryStates(event.target.value);
                    }}
                    errorMessage={getErrorMessage(form.touched.country, form.errors.country)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    label=" "
                    fullWidth
                    data={states}
                    value={form.values.state}
                    onChange={(event) => form.setFieldValue('state', event.target.value)}
                    errorMessage={getErrorMessage(form.touched.state, form.errors.state)}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid xs={12} sm={6} md={6} lg={6} item>
            <Box className={classes.password__container}>
              <InputPassword
                label={'New Password'}
                margin={'normal'}
                name="password"
                onChange={form.handleChange}
                errorMessage={getErrorMessage(form.touched.password, form.errors.password)}
                value={form.values.password}
                fullWidth
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                inputProps={{ tabIndex: 8 }}
              />
              <InputPassword
                label={'Repeat Password'}
                margin={'normal'}
                name="password_confirmation"
                fullWidth
                onChange={form.handleChange}
                errorMessage={getErrorMessage(form.touched.password_confirmation, form.errors.password_confirmation)}
                value={form.values.password_confirmation}
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                inputProps={{ tabIndex: 8 }}
              />
              <PasswordStrength />
            </Box>
          </Grid>
          <Grid xs={12} md={12} lg={12} className={classes.button__container}>
            <Button variant="contained" disableElevation fullWidth tabIndex={10} onClick={() => form.handleSubmit()}>
              Create Account
            </Button>
            <Button variant="outlined" disableElevation fullWidth component={Link} to={'/login'} tabIndex={11}>
              Cancel to Log In
            </Button>
          </Grid>
          <Grid xs={12} md={12} lg={12}>
            <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleSnackBarClose}>
              <Alert severity="error" onClose={handleSnackBarClose}>
                {errorMessage}
              </Alert>
            </Snackbar>
            <Backdrop isLoading={isLoading} />
          </Grid>
        </Grid>
      </Box>
    </FrontLayout>
  );
};

export default Signup;
