import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  TextField,
} from '@material-ui/core';
import { useQueryClient } from 'react-query';
import { IAlertStatus } from 'shared/interfaces/utils/IAlert';
import { AxiosError } from 'axios';
import { IErrorResponse } from 'shared/interfaces/utils/IErrorResonse';
import { errorResponseToArray } from 'shared/utils/errorResponseToArray';
import { ContactInput, Input, InputPassword } from 'themes/elements';
import { useStyles } from './MyAccount.styles';
import { useCardContentStyle } from 'themes/styles/useCardContentStyle';
import { IAccount, IAccountResponsePayload, IAccountUpdatePayload } from 'shared/interfaces/IAccount';
import gender from 'data/Gender.json';
import country from 'data/Countries.json';
import state from 'data/States.json';
import age from 'data/Age.json';
import talentTypes from 'data/TalentTypes.json';
import { accountService } from 'shared/services/accountService';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';

const { getAccount, updateAccount } = accountService();

const MyAccount = () => {
  const { data } = getAccount();
  const { mutate, isLoading: isMutationLoading } = updateAccount();
  const queryClient = useQueryClient();

  const classes = useStyles();
  const cardContentStyle = useCardContentStyle();

  const [selectAgeValue, setSelectAgeValue] = useState('');
  const [selectCountryValue, setSelectCountryValue] = useState(data?.data.attributes.country_of_residence);

  const initialValues: IAccountUpdatePayload = {
    email: data ? data.data.attributes.email : '',
    full_name: data ? data.data.attributes.full_name : '',
    first_name: data ? data.data.attributes.first_name : '',
    last_name: data ? data.data.attributes.last_name : '',
    gender: data ? data.data.attributes.gender : '',
    contact_no: data ? data.data.attributes.contact_no : '',
    country_of_residence: data ? data.data.attributes.country_of_residence : '',
    primary_type: data ? data.data.attributes.primary_type : '',
    adult_minor: data ? data.data.attributes.adult_minor : '',
    state_region: data ? data.data.attributes.state_region : '',
    age_range_from: data ? data.data.attributes.age_range_from : '',
    age_range_to: data ? data.data.attributes.age_range_to : '',
    birth_date: data ? data.data.attributes.birth_date : '',
    representation: false,
    preferred_contact_method: data ? data.data.attributes.preferred_contact_method : '',
  };

  const updateAccountValidationScheme: yup.SchemaOf<IAccountUpdatePayload> = yup.object().shape({
    email: yup.string().required(),
    full_name: yup.string().required(),
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    gender: yup.string().required(),
    contact_no: yup.string().required(),
    country_of_residence: yup.string().required(),
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
        alert('success');
        console.log(values);
      },
      onError: (errors: any, variables, context) => {
        if (errors?.response?.data?.errors) {
          const errorsData = errors?.response?.data?.errors as IErrorResponse;
          const errorResponseArray = errorResponseToArray(errorsData);
          alert('error' + errorResponseArray.join(','));
        } else {
          alert('Something went wrong');
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

  const selectCountry = (event: React.ChangeEvent<{ value: any }>) => {
    if (data?.data.attributes.country_of_residence) {
      setSelectCountryValue(data ? data.data.attributes.country_of_residence : '');
    } else {
      setSelectCountryValue(event.target.value);
    }
  };

  useEffect(() => {
    if (data) {
      form.setFieldValue('first_name', data.data.attributes.first_name);
      form.setFieldValue('last_name', data.data.attributes.last_name);
      form.setFieldValue('gender', data.data.attributes.gender);
      form.setFieldValue('email', data.data.attributes.email);
      // form.setFieldValue('contact_no', data.data.attributes.contact_no);
      form.setFieldValue('country_of_residence', data.data.attributes.country_of_residence);
      form.setFieldValue('state_region', data.data.attributes.state_region);
      form.setFieldValue('primary_type', data.data.attributes.primary_type);
      form.setFieldValue('adult_minor', data.data.attributes.adult_minor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const minorAgeRange = () => {
    const range = [];
    for (let i = 1; i <= 18; i++) {
      return i;
    }
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
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="lblType" shrink>
                      Gender
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline value={form.values.gender} name="gender">
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
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <ContactInput />
                </Grid>
                <Grid xs={12} md={6} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="lblType" shrink>
                      Country of Residence
                    </InputLabel>
                    <Select
                      labelId={'lblType'}
                      onChange={selectCountry}
                      disableUnderline
                      value={form.values.country_of_residence}
                      name="country_of_residence"
                    >
                      {country.map((i) => (
                        <MenuItem key={i.code} value={i.name}>
                          {i.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="lblType" shrink>
                      State/Region
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline name="state_region" value={form.values.state_region}>
                      {state.countries
                        .filter((country) => country.country === selectCountryValue)
                        .map((i) => (
                          <div>
                            {i.states
                              .filter((state) => state != null)
                              .map((j) => (
                                <MenuItem key={j} value={j}>
                                  {j}
                                </MenuItem>
                              ))}
                          </div>
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
                    <Select labelId={'lblType'} disableUnderline name="primary_type" value={form.values.primary_type}>
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
                      onChange={selectAge}
                      labelId={'lblType'}
                      disableUnderline
                      name="adult_minor"
                      value={form.values.adult_minor}
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
                            label={'Birthday'}
                            fullWidth
                            InputProps={{ disableUnderline: true }}
                            InputLabelProps={{ shrink: true }}
                            name="birth_date"
                            value={form.values.birth_date}
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
                            <Select labelId={'lblType'} disableUnderline>
                              <MenuItem key={'ADULT'} value={'ADULT'}>
                                Adult
                              </MenuItem>
                              <MenuItem key={'MINOR'} value={'MINOR'}>
                                Minor
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid lg={6} xs={6} item>
                          <FormControl fullWidth>
                            <InputLabel id="lblAgeRange" shrink>
                              Age Range To
                            </InputLabel>
                            <Select labelId={'lblType'} disableUnderline>
                              <MenuItem key={'ADULT'} value={'ADULT'}>
                                Adult
                              </MenuItem>
                              <MenuItem key={'MINOR'} value={'MINOR'}>
                                Minor
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </FormControl>
                  </Grid>
                )}
              </Grid>
              <FormControlLabel
                control={<Checkbox name="checkedC" value={'model'} />}
                label="I am seeking representation and would like to be contacted by Agents and Managers"
              />
              <Grid container spacing={2}>
                <Grid xs={12} md={6} lg={3} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="lblType" shrink>
                      Preferred Method of Contact
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline>
                      <MenuItem key={'AU'} value={'AUSRALIA'}>
                        Australia
                      </MenuItem>
                      <MenuItem key={'US'} value={'UNITED STATES'}>
                        United States
                      </MenuItem>
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
                  <Typography variant="subtitle2">
                    Your password must be at least 8 characters in length and include:
                  </Typography>
                  <Typography variant="body2">• &nbsp;a minimum of 1 lower case letter [a-z] and</Typography>
                  <Typography variant="body2">• &nbsp;a minimum of 1 upper case letter [A-Z] and</Typography>
                  <Typography variant="body2">• &nbsp;a minimum of 1 numeric character [0-9] and</Typography>
                  <Typography variant="body2">
                    • &nbsp;a minimum of 1 special character: &nbsp;&nbsp;
                    {'~`!@#$%^&*()-_+={}[]|;:"<>,./?'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Button variant="contained" disableElevation onClick={() => form.handleSubmit()}>
          Save Changes
        </Button>
      </Box>
    </Grid>
  );
};

export default MyAccount;
