import { Box, Button, Grid } from '@material-ui/core';
import { FrontLayout } from 'components';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ISignUpRequestPayload } from 'shared/interfaces/IUser';
import { ContactInput, Input, InputPassword, Select, Backdrop } from 'themes/elements';
import { selectUserState, userSignup } from 'shared/redux/slicers/user.slicer';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { getErrorMessage } from 'shared/utils/getErrorMessage';
import { ROUTES } from 'shared/constants/ROUTES';
import { PasswordPrinciple, validatePassword } from 'shared/utils/passwordUtil';
import { PasswordStrength } from 'components/PasswordStrength';
import countriesList from 'data/Countries.json';
import stateLessCountries from 'data/StateLessCountries.json';
import statesList from 'data/States.json';
import { useStyles } from './Signup.styles';

const FULL_SIZE = 800;

const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [passwordValidationResult, setPasswordValidationResult] = useState<PasswordPrinciple | null>(null);
  const [states, setStates] = useState<any>([]);
  const [password_str, setPasswordStr] = useState<string>('');

  const { isLoading, isLoggedIn } = useSelector(selectUserState);

  useEffect(() => {
    if (isLoggedIn) {
      history.push(ROUTES.TALENT.PROFILE);
    }
  }, [isLoggedIn, history]);

  // Forms
  const initialValues: ISignUpRequestPayload = {
    first_name: '',
    last_name: '',
    contact_no: null,
    email: '',
    country: 'us',
    country_code: '1',
    state_region: '',
    password: '',
    password_confirmation: '',
    user_type: 'talent',
  };

  const countries = countriesList.map((country) => ({ key: country.name, value: country.code }));

  const handleStateLessCountries = (countryCode: any) => {
    return stateLessCountries.includes(countryCode);
  };

  const signUpValidationSchema: yup.SchemaOf<ISignUpRequestPayload> = yup.object({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    contact_no: yup
      .number()
      .typeError('Contact number must be numbers only')
      .positive('Contact number must be greater than zero')
      .required('Contact number is required'),
    email: yup.string().email('Wrong email format').required('Email is required'),
    country: yup.string().required('Country is required'),
    country_code: yup.string().required('Country code is required'),
    state_region: yup.string().when('country', {
      is: (val: any) => handleStateLessCountries(val),
      then: yup.string().notRequired(),
      otherwise: yup.string().required('State is required'),
    }),
    user_type: yup.string().required('User type is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be atleast 8 characters')
      .test('passwordValidate', 'Invalid password', (value: any) => {
        if (value) {
          const validatePasswordResult = validatePassword(value);
          setPasswordValidationResult(validatePasswordResult);
          return validatePasswordResult.IsValid;
        }
        return false;
      }),
    password_confirmation: yup
      .string()
      .required('Password confirmation is required')
      .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  });

  const handleSetCountryStates = (countryCode: any) => {
    const filteredStates = statesList.filter((state) => state.countryCode === countryCode);
    const newStates = filteredStates.map((state) => ({ key: state.name, value: state.name }));
    setStates(newStates);
  };

  const handleSignUpSubmit = async (values: ISignUpRequestPayload) => {
    dispatch(userSignup(values));
  };

  const form: FormikProps<ISignUpRequestPayload> = useFormik({
    initialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => console.log('values: ', values), //handleSignUpSubmit(values),
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
              onChange={(e) => {
                if (form.errors.first_name && !form.touched.first_name) {
                  form.setFieldTouched('first_name');
                  form.validateField('first_name');
                }
                return form.handleChange(e);
              }}
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
              onChange={(e) => {
                if (form.errors.last_name && !form.touched.last_name) {
                  form.setFieldTouched('last_name');
                  form.validateField('last_name');
                }
                return form.handleChange(e);
              }}
              errorMessage={getErrorMessage(form.touched.last_name, form.errors.last_name)}
              value={form.values.last_name}
              fullWidth
              margin={'normal'}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ tabIndex: 2 }}
            />
            <ContactInput
              name="contact_no"
              handleCodeChange={(val: any) => {
                form.setFieldValue('country_code', val);
              }}
              country={form.values.country.toLowerCase()}
              onChange={(e) => {
                if (form.errors.contact_no && !form.touched.contact_no) {
                  form.setFieldTouched('contact_no');
                  form.validateField('contact_no');
                }
                return form.handleChange(e);
              }}
              errorMessage={getErrorMessage(form.touched.contact_no, form.errors.contact_no)}
              value={form.values.contact_no}
            />
            <Input
              label={'Email Address'}
              name="email"
              onChange={(e) => {
                if (form.errors.email && !form.touched.email) {
                  form.setFieldTouched('email');
                  form.validateField('email');
                }
                return form.handleChange(e);
              }}
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
                      form.setFieldValue('state_region', '');
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
                    value={form.values.state_region}
                    onChange={(event) => form.setFieldValue('state_region', event.target.value)}
                    errorMessage={getErrorMessage(form.touched.state_region, form.errors.state_region)}
                    disabled={states.length === 0}
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
                onChange={(e) => {
                  if (form.errors.password && !form.touched.password) {
                    form.setFieldTouched('password');
                    form.validateField('password');
                  }
                  setPasswordStr(e.target.value || '');
                  return form.handleChange(e);
                }}
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
                onChange={(e) => {
                  if (form.errors.password_confirmation && !form.touched.password_confirmation) {
                    form.setFieldTouched('password_confirmation');
                    form.validateField('password_confirmation');
                  }
                  return form.handleChange(e);
                }}
                errorMessage={getErrorMessage(form.touched.password_confirmation, form.errors.password_confirmation)}
                value={form.values.password_confirmation}
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                inputProps={{ tabIndex: 8 }}
              />
              <PasswordStrength password={password_str} />
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
            <Backdrop isLoading={isLoading} />
          </Grid>
        </Grid>
      </Box>
    </FrontLayout>
  );
};

export default Signup;
