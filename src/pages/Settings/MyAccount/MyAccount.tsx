import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  TextField,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  Select,
} from '@material-ui/core';
import { useQueryClient } from 'react-query';
import { IAlertStatus } from 'shared/interfaces/utils/IAlert';
import { AxiosError } from 'axios';
import { IErrorResponse } from 'shared/interfaces/utils/IErrorResonse';
import { errorResponseToArray } from 'shared/utils/errorResponseToArray';
import { ContactInput, Input, InputPassword, useAlert, SelectWithData, Backdrop } from 'themes/elements';
import { useCardContentStyle } from 'themes/styles/useCardContentStyle';
import { IAccount, IAccountResponsePayload, IAccountUpdatePayload } from 'shared/interfaces/IAccount';
import { IUserChangePasswordRequestPayload } from 'shared/interfaces/IUser';
import { getErrorMessage } from 'shared/utils/getErrorMessage';
import gender from 'data/Gender.json';
import countriesList from 'data/Countries.json';
import stateLessCountries from 'data/StateLessCountries.json';
import statesList from 'data/States.json';
import age from 'data/Age.json';
import talentTypes from 'data/TalentTypes.json';
import contactMethod from 'data/ContactMethod.json';
import { accountService } from 'shared/services/accountService';
import { authService } from 'shared/services/authService';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { PasswordStrength } from 'components/PasswordStrength';
import { PasswordPrinciple, validatePassword } from 'shared/utils/passwordUtil';

type Props = {
  account: IAccount[];
  AlertOpen: (success: IAlertStatus, message: string) => void;
};

const { getAccount, updateAccount } = accountService();
const { changePassword } = authService();

import { useStyles } from './MyAccount.styles';
import { Type } from 'typescript';

const MyAccount = () => {
  const classes = useStyles();
  const cardContentStyle = useCardContentStyle();

  const { data, isLoading } = getAccount();
  const { mutate, isLoading: isUpdateLoading } = updateAccount();
  const { mutate: changePasswordmutate } = changePassword();
  const { isOpen: isAlertOpen, alertRef, AlertOpen } = useAlert({ autoHideDuration: 2000, horizontal: 'center' });
  const queryClient = useQueryClient();

  const [states, setStates] = useState<any>([]);

  const [passwordState, setPasswordState] = useState<IUserChangePasswordRequestPayload>({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });

  function ifEmpty(val: any) {
    if (!val) {
      setPasswordState({ ...passwordState, current_password: '', new_password: '', new_password_confirmation: '' });
    }
  }

  const initialValues: IAccountUpdatePayload = {
    email: data ? data.data.attributes.email : '',
    full_name: data ? data.data.attributes.full_name : '',
    first_name: data ? data.data.attributes.first_name : '',
    last_name: data ? data.data.attributes.last_name : '',
    gender: data ? data.data.attributes.gender : '',
    contact_no: data ? data.data.attributes.contact_no : '',
    country: data ? data.data.attributes.country : 'US',
    country_code: data ? data.data.attributes.country_code : '1',
    primary_type: data ? data.data.attributes.primary_type : '',
    adult_minor: data ? data.data.attributes.adult_minor : '',
    state_region: data ? data.data.attributes.state_region : '',
    age_range_from: data ? data.data.attributes.age_range_from : '',
    age_range_to: data ? data.data.attributes.age_range_to : '',
    birth_date: data ? data.data.attributes.birth_date : '',
    representation: data ? data.data.attributes.representation : false,
    preferred_contact_method: data ? data.data.attributes.preferred_contact_method : '',
  };

  const handleStateLessCountries = (countryCode: any) => {
    return stateLessCountries.includes(countryCode);
  };

  const updateAccountValidationScheme: yup.SchemaOf<IAccountUpdatePayload> = yup.object().shape({
    email: yup.string().required(),
    full_name: yup.string().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    gender: yup.string().required(),
    contact_no: yup.string().required(),
    country: yup.string().required(),
    country_code: yup.string().required(),
    primary_type: yup.string(),
    adult_minor: yup.string().required(),
    state_region: yup.string().when('country', {
      is: (val: any) => handleStateLessCountries(val),
      then: yup.string().notRequired(),
      otherwise: yup.string().required('State is required'),
    }),
    age_range_from: yup.string(),
    age_range_to: yup.string(),
    birth_date: yup.string(),
    representation: yup.boolean().default(false),
    preferred_contact_method: yup.string().default(''),
  });

  const handleSubmit = (values: IAccountUpdatePayload) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries('accounts');
        AlertOpen('success', 'Account details has been successfully updated');
      },
    });
    changePasswordmutate(passwordState, {
      onSuccess: () => {
        queryClient.invalidateQueries('password');
        AlertOpen('success', 'Password has been successfully updated');
      },
    });
  };

  const validatePassword = () => {
    changePasswordmutate(passwordState, {
      // onSuccess: (e) => {
      //   console.log(e);
      // },
    });
  };

  const form = useFormik({
    initialValues,
    validationSchema: updateAccountValidationScheme,
    onSubmit: (values) => handleSubmit(values),
    enableReinitialize: true,
  });

  useEffect(() => {
    if (data) {
      form.setFieldValue('first_name', data.data.attributes.first_name);
      form.setFieldValue('last_name', data.data.attributes.last_name);
      form.setFieldValue('gender', data.data.attributes.gender);
      form.setFieldValue('email', data.data.attributes.email);
      form.setFieldValue('contact_no', data.data.attributes.contact_no);
      form.setFieldValue('country', data.data.attributes.country);
      form.setFieldValue('country_code', data.data.attributes.country_code);
      form.setFieldValue('primary_type', data.data.attributes.primary_type);
      form.setFieldValue('adult_minor', data.data.attributes.adult_minor);
      form.setFieldValue('representation', data.data.attributes.representation);
      form.setFieldValue('state_region', data.data.attributes.state_region);
      form.setFieldValue('age_range_from', data.data.attributes.age_range_from);
      form.setFieldValue('age_range_to', data.data.attributes.age_range_to);
      form.setFieldValue('birth_date', data.data.attributes.birth_date);
      form.setFieldValue('representation', data.data.attributes.representation);
      form.setFieldValue('preferred_contact_method', data.data.attributes.preferred_contact_method);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getDisabled = (val: any) => {
    if (val) return { disabled: true };
    return {};
  };

  const countries = countriesList.map((country) => ({ key: country.name, value: country.code }));

  const handleSetCountryStates = (countryCode: any) => {
    const filteredStates = statesList.filter((state) => state.countryCode === countryCode);
    const newStates = filteredStates.map((state) => ({ key: state.name, value: state.name }));
    setStates(newStates);
  };

  return (
    <Grid container spacing={0}>
      {isAlertOpen && alertRef}
      {!isLoading && (
        <>
          <Grid container spacing={2}>
            <Grid xs={12} md={6} item>
              <Card variant="outlined">
                <CardContent className={cardContentStyle.root}>
                  <Typography variant="h6" gutterBottom>
                    My Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid xs={12} md={6} item>
                      <Input
                        label={'First Name'}
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        InputLabelProps={{ shrink: true }}
                        name="first_name"
                        value={form.values.first_name}
                        onChange={form.handleChange}
                      />
                    </Grid>
                    <Grid xs={12} md={6} item>
                      <Input
                        label={'Last Name'}
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        InputLabelProps={{ shrink: true }}
                        name="last_name"
                        value={form.values.last_name}
                        onChange={form.handleChange}
                      />
                    </Grid>
                    <Grid xs={12} md={6} item>
                      <FormControl margin={'normal'} fullWidth>
                        <InputLabel id="lblType" shrink>
                          Gender
                        </InputLabel>
                        <Select
                          labelId={'lblType'}
                          disableUnderline
                          onChange={(e) => {
                            form.setFieldValue('gender', e.target.value);
                            form.handleChange(e);
                          }}
                          value={form.values.gender}
                          name="gender"
                        >
                          {gender.map((i) => (
                            <MenuItem key={i.key} value={i.value}>
                              {i.value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid xs={12} md={6} item>
              <Card variant="outlined">
                <CardContent className={cardContentStyle.root}>
                  <Typography variant="h6" gutterBottom>
                    Contact Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid xs={12} md={6} item>
                      <Input
                        label={'Email Address'}
                        fullWidth
                        InputProps={{ disableUnderline: true }}
                        InputLabelProps={{ shrink: true }}
                        value={form.values.email}
                        name="email"
                        onChange={form.handleChange}
                      />
                    </Grid>
                    <Grid xs={12} md={6} item>
                      <ContactInput
                        handleCodeChange={(val: any) => {
                          form.setFieldValue('country_code', val);
                        }}
                        country={form.values.country.toLowerCase()}
                        className={classes.contactInput}
                        name="contact_no"
                        onChange={(e) => {
                          form.setFieldTouched('contact_no');
                          return form.handleChange(e);
                        }}
                        value={form.values.contact_no}
                      />
                    </Grid>
                    <Grid xs={12} md={6} item>
                      <SelectWithData
                        label="Country of Residence"
                        fullWidth
                        data={countries}
                        value={form.values.country}
                        onChange={(e: any) => {
                          form.setFieldValue('country', e.target.value);
                          form.setFieldValue('state_region', '');
                          handleSetCountryStates(e.target.value);
                        }}
                        errorMessage={getErrorMessage(form.touched.country, form.errors.country)}
                      />
                    </Grid>
                    <Grid xs={12} md={6} item>
                      <SelectWithData
                        label="State/Region"
                        fullWidth
                        data={states}
                        value={form.values.state_region}
                        onChange={(e: any) => form.setFieldValue('state_region', e.target.value)}
                        errorMessage={getErrorMessage(form.touched.state_region, form.errors.state_region)}
                        disabled={states.length === 0}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Card variant="outlined">
                <CardContent className={cardContentStyle.root}>
                  <Typography variant="h6" gutterBottom>
                    Talent Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid xs={12} md={6} lg={3} item>
                      <FormControl margin={'normal'} fullWidth>
                        <InputLabel id="lblType" shrink>
                          Primary Talent Type
                        </InputLabel>
                        <Select
                          labelId={'lblType'}
                          disableUnderline
                          name="primary_type"
                          value={form.values.primary_type}
                          onChange={(e) => {
                            form.setFieldValue('primary_type', e.target.value);
                            form.handleChange(e);
                          }}
                        >
                          {talentTypes.map((i) => (
                            <MenuItem key={i.id} value={i.value}>
                              {i.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={6} lg={3} item>
                      <FormControl margin={'normal'} fullWidth>
                        <InputLabel id="lblType" shrink>
                          Adult/Minor
                        </InputLabel>
                        <Select
                          labelId={'lblType'}
                          disableUnderline
                          name="adult_minor"
                          value={form.values.adult_minor}
                          onChange={(e) => {
                            form.setFieldValue('adult_minor', e.target.value);
                            form.handleChange(e);
                          }}
                        >
                          {age.map((i) => (
                            <MenuItem key={i.key} value={i.value}>
                              {i.value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    {form.values.adult_minor === 'Minor' ? (
                      <Grid xs={12} md={12} lg={6} item>
                        <FormControl margin={'normal'} fullWidth>
                          <Grid container spacing={2}>
                            <Grid lg={6} md={6} xs={12} item>
                              <TextField
                                type="date"
                                label={'Date of Birth (For Security Only)'}
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                                InputLabelProps={{ shrink: true }}
                                name="birth_date"
                                value={form.values.birth_date}
                                onChange={(e) => {
                                  form.handleChange(e);
                                  form.setFieldValue('birth_date', e.target.value);
                                }}
                              />
                            </Grid>
                          </Grid>
                        </FormControl>
                      </Grid>
                    ) : (
                      <Grid lg={6} xs={12} item>
                        <FormControl margin={'normal'} fullWidth>
                          <Grid container spacing={2}>
                            <Grid lg={6} xs={6} item>
                              <FormControl fullWidth>
                                <InputLabel id="lblAgeRange" shrink>
                                  Age Range From
                                </InputLabel>
                                <Select
                                  labelId={'lblType'}
                                  value={form.values.age_range_from}
                                  onChange={(e) => {
                                    form.setFieldValue('age_range_from', e.target.value);
                                    form.handleChange(e);
                                  }}
                                  name="age_range_from"
                                  disableUnderline
                                >
                                  {(() => {
                                    const ageRange = [];

                                    for (let i = 18; i <= 120; i++) {
                                      ageRange.push(
                                        <MenuItem key={i} value={i}>
                                          {i} years old
                                        </MenuItem>,
                                      );
                                    }

                                    return ageRange;
                                  })()}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid lg={6} md={6} xs={6} item>
                              <FormControl fullWidth>
                                <InputLabel id="lblAgeRange" shrink>
                                  Age Range To
                                </InputLabel>
                                <Select
                                  labelId={'lblType'}
                                  value={form.values.age_range_to}
                                  onChange={(e) => {
                                    form.setFieldValue('age_range_to', e.target.value);
                                    form.handleChange(e);
                                  }}
                                  name="age_range_to"
                                  disableUnderline
                                >
                                  {(() => {
                                    const ageRange = [];

                                    for (let i = 18; i <= 120; i++) {
                                      ageRange.push(
                                        <MenuItem key={i} value={i}>
                                          {i} years old
                                        </MenuItem>,
                                      );
                                    }

                                    return ageRange;
                                  })()}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </FormControl>
                      </Grid>
                    )}
                  </Grid>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="representation"
                        checked={form.values.representation}
                        value={form.values.representation}
                        onChange={(e) => {
                          form.setFieldValue('representation', e.target.checked);
                          form.handleChange(e);
                        }}
                      />
                    }
                    label="I am seeking representation and would like to be contacted by Agents and Managers"
                  />
                  <Grid container spacing={2}>
                    <Grid xs={12} md={6} lg={3} item>
                      <FormControl margin={'normal'} fullWidth>
                        <InputLabel id="lblType" shrink {...getDisabled(!form.values.representation)}>
                          Preferred Method of Contact
                        </InputLabel>
                        <Select
                          labelId={'lblType'}
                          disableUnderline
                          name="preferred_contact_method"
                          value={form.values.preferred_contact_method}
                          onChange={(e) => {
                            form.handleChange(e);
                            form.setFieldValue('preferred_contact_method', e.target.value);
                          }}
                          {...getDisabled(!form.values.representation)}
                        >
                          {contactMethod.map((i) => (
                            <MenuItem key={i.key} value={i.value}>
                              {i.value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={12} lg={12} item>
              <Card variant="outlined">
                <CardContent className={cardContentStyle.root}>
                  <Typography variant="h6" gutterBottom>
                    Change Password
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid xs={12} md={6} lg={6} spacing={2} item container>
                      <Grid xs={12} md={6} lg={6} item>
                        <InputPassword
                          id={'currentPassword'}
                          label={'Current Password'}
                          margin={'normal'}
                          fullWidth
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                          name="current_password"
                          value={passwordState.current_password}
                          onChange={(e) => {
                            form.handleChange(e);
                            setPasswordState({ ...passwordState, current_password: e.target.value });
                            ifEmpty(e.target.value);
                            validatePassword();
                          }}
                        />
                      </Grid>
                      <Grid xs={12} md={6} lg={6} item></Grid>
                      <Grid xs={12} md={6} lg={6} item>
                        <InputPassword
                          id={'newPassword'}
                          label={'New Password'}
                          margin={'normal'}
                          fullWidth
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                          name="new_password"
                          value={passwordState.new_password}
                          onChange={(e) => {
                            form.handleChange(e);
                            setPasswordState({ ...passwordState, new_password: e.target.value });
                          }}
                          disabled={!passwordState.current_password}
                        />
                      </Grid>
                      <Grid xs={12} md={6} lg={6} item>
                        <InputPassword
                          id={'confirmPassword'}
                          label={'Confirm New Password'}
                          margin={'normal'}
                          fullWidth
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                          name="new_password_confirmation"
                          value={passwordState.new_password_confirmation}
                          onChange={(e) => {
                            form.handleChange(e);
                            setPasswordState({ ...passwordState, new_password_confirmation: e.target.value });
                          }}
                          disabled={!passwordState.current_password}
                        />
                      </Grid>
                    </Grid>
                    <Grid xs={12} md={6} lg={6} item className={classes.passwordPrinciples}>
                      <PasswordStrength />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button variant="contained" onClick={() => form.handleSubmit()} disableElevation>
              Save Changes
            </Button>
          </Box>
        </>
      )}
      <Backdrop isLoading={isLoading || isUpdateLoading} />
    </Grid>
  );
};

export default MyAccount;
