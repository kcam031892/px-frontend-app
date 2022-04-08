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
  Select,
  Typography,
} from '@material-ui/core';
import { useQueryClient } from 'react-query';
import { IAlertStatus } from 'shared/interfaces/utils/IAlert';
import { AxiosError } from 'axios';
import { IErrorResponse } from 'shared/interfaces/utils/IErrorResonse';
import { errorResponseToArray } from 'shared/utils/errorResponseToArray';
import { ContactInput, Input, InputPassword } from 'themes/elements';
import { useCardContentStyle } from 'themes/styles/useCardContentStyle';
import { IAccount, IAccountResponsePayload, IAccountUpdatePayload } from 'shared/interfaces/IAccount';
import gender from 'data/Gender.json';
import country from 'data/Countries.json';
import state from 'data/States.json';
import age from 'data/Age.json';
import talentTypes from 'data/TalentTypes.json';
import contactMethod from 'data/ContactMethod.json';
import { accountService } from 'shared/services/accountService';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { PasswordStrength } from 'components/PasswordStrength';

type Props = {
  account: IAccount[];
  AlertOpen: (success: IAlertStatus, message: string) => void;
};

const { getAccount, updateAccount } = accountService();

import { useStyles } from './MyAccount.styles';
import { Type } from 'typescript';

const MyAccount: React.FC<Props> = ({ account, AlertOpen }) => {
  const { data } = getAccount();
  const { mutate, isLoading: isMutationLoading } = updateAccount();
  const queryClient = useQueryClient();

  const classes = useStyles();
  const cardContentStyle = useCardContentStyle();

  const [selectAgeValue, setSelectAgeValue] = useState(data ? data.data.attributes.adult_minor : '');
  const [isTrue, setIsTrue] = useState(data ? data.data.attributes.representation : false);
  const [selectCountryValue, setSelectCountryVaue] = useState(data ? data.data.attributes.country : '');

  const initialValues: IAccountUpdatePayload = {
    email: data ? data.data.attributes.email : '',
    full_name: data ? data.data.attributes.full_name : '',
    first_name: data ? data.data.attributes.first_name : '',
    last_name: data ? data.data.attributes.last_name : '',
    gender: data ? data.data.attributes.gender : '',
    contact_no: data ? data.data.attributes.contact_no : '',
    country: data ? data.data.attributes.country : '',
    country_code: data ? data.data.attributes.country_code : '',
    primary_type: data ? data.data.attributes.primary_type : '',
    adult_minor: data ? data.data.attributes.adult_minor : 'Adult',
    state_region: data ? data.data.attributes.state_region : '',
    age_range_from: data ? data.data.attributes.age_range_from : '',
    age_range_to: data ? data.data.attributes.age_range_to : '',
    birth_date: data ? data.data.attributes.birth_date : '',
    representation: data ? data.data.attributes.representation : false,
    preferred_contact_method: data ? data.data.attributes.preferred_contact_method : '',
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
    state_region: yup.string().required(),
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
        AlertOpen('success', 'Account has been updated');
      },
      onError: (errors: any, variables, context) => {
        if (errors?.response?.data?.errors) {
          const errorResponseArray = errorResponseToArray(errors.response.data.errors);
          AlertOpen('error', errorResponseArray.join(','));
        } else {
          AlertOpen('error', 'Something went wrong');
        }
      },
    });
  };

  const form = useFormik({
    initialValues,
    validationSchema: updateAccountValidationScheme,
    onSubmit: (values) => handleSubmit(values),
  });

  const selectAge = (event: React.ChangeEvent<{ value: any }>) => {
    setSelectAgeValue(event.target.value);
  };

  const selectCountry = (e: React.ChangeEvent<{ value: any }>) => {
    const value = country.filter(function (item) {
      return item.name == e.target.value;
    });
    form.setFieldValue('country_code', value[0].code);
  };

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getDisabled = (val: any) => {
    if (val) return { disabled: true };
    return {};
  };

  return (
    <Grid container spacing={0}>
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
                      onChange={form.handleChange}
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
                  <ContactInput value={form.values.contact_no} onChange={form.handleChange} name="contact_no" />
                </Grid>
                <Grid xs={12} md={6} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="lblType" shrink>
                      Country of Residence
                    </InputLabel>
                    <Select
                      labelId={'lblType'}
                      disableUnderline
                      value={form.values.country}
                      name="country"
                      onChange={(e) => {
                        form.handleChange(e);
                        selectCountry(e);
                      }}
                    >
                      {country.map((i) => (
                        <MenuItem key={i.code} value={i.name}>
                          {i.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <input
                      id="country_code"
                      value={form.values.country_code}
                      name="country_code"
                      onChange={form.handleChange}
                      type="hidden"
                    ></input>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="lblType" shrink>
                      State/Region
                    </InputLabel>
                    <Select
                      labelId={'lblType'}
                      disableUnderline
                      name="state_region"
                      value={form.values.state_region}
                      onChange={form.handleChange}
                    >
                      {state
                        .filter((state) => state.countryCode === form.values.country_code)
                        .map((i) => (
                          <MenuItem key={i.id} value={i.name}>
                            {i.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} item>
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
                      onChange={form.handleChange}
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
                        form.handleChange(e);
                        selectAge(e);
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
                {selectAgeValue === 'Minor' ? (
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
                            onChange={form.handleChange}
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
                              onChange={form.handleChange}
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
                        <Grid lg={6} xs={6} item>
                          <FormControl fullWidth>
                            <InputLabel id="lblAgeRange" shrink>
                              Age Range To
                            </InputLabel>
                            <Select
                              labelId={'lblType'}
                              value={form.values.age_range_to}
                              onChange={form.handleChange}
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
                      setIsTrue(e.target.checked);
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
                      onChange={form.handleChange}
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
        <Grid xs={12} item>
          <Card variant="outlined">
            <CardContent className={cardContentStyle.root}>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={6} spacing={2} item container>
                  <Grid xs={12} lg={6} item>
                    <InputPassword
                      id={'currentPassword'}
                      label={'Current Password'}
                      margin={'normal'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid xs={12} lg={6} item></Grid>
                  <Grid xs={12} lg={6} item>
                    <InputPassword
                      id={'newPassword'}
                      label={'New Password'}
                      margin={'normal'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid xs={12} lg={6} item>
                    <InputPassword
                      id={'confirmPassword'}
                      label={'Confirm New Password'}
                      margin={'normal'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
                <Grid xs={6} item className={classes.passwordPrinciples}>
                  <PasswordStrength />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Button variant="contained" disableElevation onClick={() => form.handleSubmit()} disabled={isMutationLoading}>
          {isMutationLoading ? 'Saving Changes...' : 'Save Changes'}
        </Button>
      </Box>
    </Grid>
  );
};

export default MyAccount;
