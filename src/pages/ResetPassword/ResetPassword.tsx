import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { FrontLayout } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { IResetPasswordRequestPayload } from 'shared/interfaces/IUser';
import { InputPassword, Backdrop } from 'themes/elements';
import { selectUserState, userResetPassword, setErrorMessage } from 'shared/redux/slicers/user.slicer';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { getErrorMessage } from 'shared/utils/getErrorMessage';
import { ROUTES } from 'shared/constants/ROUTES';
import { PasswordPrinciple, validatePassword } from 'shared/utils/passwordUtil';
import { PasswordStrength } from 'components/PasswordStrength';
import { useStyles } from './ResetPassword.styles';

const Signup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [passwordValidationResult, setPasswordValidationResult] = useState<PasswordPrinciple | null>(null);

  const { isLoading, errorMessage, isLoggedIn } = useSelector(selectUserState);

  useEffect(() => {
    if (isLoggedIn) {
      history.push(ROUTES.TALENT.PROFILE);
    }
  }, [isLoggedIn, history]);

  // Forms
  const initialValues: IResetPasswordRequestPayload = {
    password: '',
    password_confirmation: '',
  };

  const resetPasswordValidationSchema: yup.SchemaOf<IResetPasswordRequestPayload> = yup.object({
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
      .required('Password confirmation is required')
      .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  });

  const handleSnackBarClose = () => {
    dispatch(setErrorMessage(null));
  };

  const handleSignUpSubmit = async (values: IResetPasswordRequestPayload) => {
    dispatch(userResetPassword(values));
  };

  const form: FormikProps<IResetPasswordRequestPayload> = useFormik({
    initialValues,
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values) => handleSignUpSubmit(values),
  });

  return (
    <FrontLayout containerWidth={400}>
      <Box>
        <Grid container spacing={2}>
          <Grid item>
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
              <PasswordStrength />
            </Box>
          </Grid>
          <Grid className={classes.button__container}>
            <Button variant="contained" disableElevation fullWidth tabIndex={10} onClick={() => form.handleSubmit()}>
              Update Password
            </Button>
            <Button variant="outlined" disableElevation fullWidth component={Link} to={'/login'} tabIndex={11}>
              Back
            </Button>
          </Grid>
          <Grid>
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
