import { Box, Button, Grid } from '@material-ui/core';
import { FrontLayout } from 'components';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ISignUpRequestPayload, IUserCompleteProfilePayload } from 'shared/interfaces/IUser';
import { ContactInput, Input, InputPassword, Select } from 'themes/elements';
import {
  handleCompleteProfileSuccess,
  selectUserState,
  userLogout,
  userSignup,
} from 'shared/redux/slicers/user.slicer';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { getErrorMessage } from 'shared/utils/getErrorMessage';
import { IKeyValue } from 'shared/interfaces/utils/IKeyValue';
import { ROUTES } from 'shared/constants/ROUTES';
import { PasswordPrinciple, validatePassword } from 'shared/utils/passwordUtil';
import { PasswordStrength } from 'components/PasswordStrength';
import { useStyles } from './CompleteProfile.styles';
import { authService } from 'shared/services/authService';

const NORMAL_SIZE = 456;
const FULL_SIZE = 800;

const { setCompleteProfile } = authService();
const CompleteProfile = () => {
  const classes = useStyles();
  const { mutate, isLoading: isCompleteProfileLoading } = setCompleteProfile();
  const dispatch = useDispatch();
  const history = useHistory();

  const [passwordValidationResult, setPasswordValidationResult] = useState<PasswordPrinciple | null>(null);

  const { user, isLoading, errorMessage, isLoggedIn } = useSelector(selectUserState);

  // Forms
  const initialValues: IUserCompleteProfilePayload = {
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
  };

  const userProfileCompleteValidationSchema: yup.SchemaOf<IUserCompleteProfilePayload> = yup.object({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
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
    password_confirmation: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  });

  const handleSubmit = (values: IUserCompleteProfilePayload) => {
    mutate(values, {
      onSuccess: (response) => {
        dispatch(handleCompleteProfileSuccess({ user: response.data }));
        history.push(ROUTES.TALENT.PROFILE);
      },
      onError: () => {
        history.push(ROUTES.TALENT.PROFILE);
      },
    });
  };

  const form: FormikProps<IUserCompleteProfilePayload> = useFormik({
    initialValues,
    validationSchema: userProfileCompleteValidationSchema,
    onSubmit: (values) => handleSubmit(values), // handleSignUpSubmit(values)
  });

  const handleLogOut = async () => {
    await dispatch(userLogout());

    history.push(ROUTES.LOGIN);
  };
  return (
    <FrontLayout heading="Let’s complete your" subHeading="Profile Now" containerWidth={FULL_SIZE}>
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
                name="password_confirmation"
                onChange={form.handleChange}
                errorMessage={getErrorMessage(form.touched.password_confirmation, form.errors.password_confirmation)}
                value={form.values.password_confirmation}
                fullWidth
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                inputProps={{ tabIndex: 8 }}
              />
              <PasswordStrength password="" />
            </Box>
          </Grid>

          <Grid xs={12} md={12} lg={12} item className={classes.button__container}>
            <Button
              variant="contained"
              disabled={isCompleteProfileLoading}
              disableElevation
              fullWidth
              tabIndex={10}
              onClick={() => form.handleSubmit()}
            >
              Update Profile
            </Button>
            <Button variant="outlined" disableElevation fullWidth onClick={() => handleLogOut()} tabIndex={11}>
              Cancel to Log In
            </Button>
          </Grid>
        </Grid>
      </Box>
    </FrontLayout>
  );
};

export default CompleteProfile;
