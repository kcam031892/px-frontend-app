import { Box, Button, Grid } from '@material-ui/core';
import { FrontLayout } from 'components';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ISignUpRequestPayload } from 'shared/interfaces/IUser';
import { ContactInput, Input, InputPassword, Select } from 'themes/elements';
import { selectUserState, userSignup } from 'shared/redux/slicers/user.slicer';
import { useStyles } from './Signup.styles';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { getErrorMessage } from 'shared/utils/getErrorMessage';
import { IKeyValue } from 'shared/interfaces/utils/IKeyValue';
import { ROUTES } from 'shared/constants/ROUTES';
import { PasswordPrinciple, validatePassword } from 'shared/utils/passwordUtil';

const NORMAL_SIZE = 456;
const FULL_SIZE = 800;

const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isFullModel, setIsFullModel] = useState<boolean>(false);
  const [passwordValidationResult, setPasswordValidationResult] = useState<PasswordPrinciple | null>(null);
  const toggleFullModel = () => setIsFullModel((curr) => !curr);

  const { user, isLoading, errorMessage, isLoggedIn } = useSelector(selectUserState);

  useEffect(() => {
    if (isLoggedIn) {
      history.push(ROUTES.TALENT.PROFILE);
    }
  }, [isLoggedIn, history]);

  const countries: IKeyValue[] = [
    {
      key: 'Australia',
      value: 'AU',
    },
    {
      key: 'Philippines',
      value: 'PH',
    },
  ];

  // Forms
  const initialValues: ISignUpRequestPayload = {
    first_name: '',
    last_name: '',
    contact_number: '',
    email: '',
    country: 'PH',
    state: 'AU',
    password: '',
  };

  const signUpValidationSchema: yup.SchemaOf<ISignUpRequestPayload> = yup.object({
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string().required('Last Name is Required'),
    contact_number: yup.string().required('Contact Number is Required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    country: yup.string().required('Country is Required'),
    state: yup.string().required('State is Required'),
    password: yup
      .string()
      .required('Password is required')
      .test('passwordValidate', 'Invalid Password', (value: any) => {
        if (value) {
          const validatePasswordResult = validatePassword(value);
          setPasswordValidationResult(validatePasswordResult);
          return validatePasswordResult.IsValid;
        }
        return false;
      }),
  });

  const handleSignUpSubmit = async (values: ISignUpRequestPayload) => {
    dispatch(userSignup(values));
  };

  const form: FormikProps<ISignUpRequestPayload> = useFormik({
    initialValues,
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => console.log(values), // handleSignUpSubmit(values)
  });

  return (
    <FrontLayout heading="Let’s create your new" subHeading="Account Now" containerWidth={FULL_SIZE}>
      <Box>
        <Grid container spacing={2}>
          <Grid xs={12} md={6} lg={6} item>
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
                    onChange={(event) => form.setFieldValue('country', event.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    label=" "
                    fullWidth
                    data={countries}
                    value={form.values.state}
                    onChange={(event) => form.setFieldValue('state', event.target.value)}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid xs={12} md={6} lg={6} item>
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
              {/* <span className={classes.password__helper} onClick={toggleFullModel}>
                (?)
              </span> */}
              <InputPassword
                label={'Repeat Password'}
                margin={'normal'}
                fullWidth
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                inputProps={{ tabIndex: 8 }}
              />
              {/* <PasswordStrength validateResult={undefined} /> */}
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
        </Grid>
      </Box>
    </FrontLayout>
  );
};

export default Signup;
