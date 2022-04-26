import { Box, Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FrontLayout } from 'components';
import { Link, useHistory } from 'react-router-dom';
import { IForgotPasswordRequestPayload } from 'shared/interfaces/IUser';
import { Input, Backdrop } from 'themes/elements';
import { selectUserState, userSendEmail } from 'shared/redux/slicers/user.slicer';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { getErrorMessage } from 'shared/utils/getErrorMessage';
import { ROUTES } from 'shared/constants/ROUTES';
import { useStyles } from './ForgotPassword.styles';

const ForgotPassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, isLoggedIn } = useSelector(selectUserState);

  useEffect(() => {
    if (isLoggedIn) {
      history.push(ROUTES.TALENT.PROFILE);
    }
  }, [isLoggedIn, history]);

  const initialValues: IForgotPasswordRequestPayload = {
    email: '',
  };

  const forgotPasswordValidationSchema: yup.SchemaOf<IForgotPasswordRequestPayload> = yup.object({
    email: yup.string().email('Wrong email format').required('Email is required'),
  });

  const handleforgotPasswordSubmit = async (values: IForgotPasswordRequestPayload) => {
    dispatch(userSendEmail(values, history));
  };

  const form: FormikProps<IForgotPasswordRequestPayload> = useFormik({
    initialValues,
    validationSchema: forgotPasswordValidationSchema,
    onSubmit: (values) => handleforgotPasswordSubmit(values),
  });

  return (
    <FrontLayout containerWidth={400}>
      <Box>
        <Grid>
          <br />
          <Typography variant="subtitle2">
            Send us your email address and we will send a password reset link to your email account.
          </Typography>
          <br />
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
        </Grid>
        <Grid xs={12} md={12} lg={12} className={classes.button__container}>
          <Button variant="contained" disableElevation fullWidth tabIndex={10} onClick={() => form.handleSubmit()}>
            Send Email
          </Button>
          <Button
            variant="outlined"
            disableElevation
            fullWidth
            style={{ marginTop: 10 }}
            component={Link}
            to={'/login'}
            tabIndex={11}
          >
            Cancel
          </Button>
        </Grid>
        <Grid xs={12} md={12} lg={12}>
          <Backdrop isLoading={isLoading} />
        </Grid>
      </Box>
    </FrontLayout>
  );
};

export default ForgotPassword;
