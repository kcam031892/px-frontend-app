import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Password } from '../../../components/textField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Grid, Select, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { MyAccountState } from './myAccountTypes';
import { RootState } from '../../../app/rootReducer';
import { EnumToMap } from '../../../utils/enumUtil';
import { Gender, SelectListItem, AgeType, ContactType, Months } from '../../../types';
import { Range } from '../../../utils/array';
import Checkbox from '@material-ui/core/Checkbox';
import { saveAccountPageData, updateAccount } from './myAccountSlice';
import { PasswordPrinciple, validatePassword } from '../../../utils/passwordUtil';
import PasswordStrength from '../../../components/PasswordStrength';
import ContactNumber from '../../../components/ContactNumber';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentContainer: {
      padding: '0 144px',
      marginTop: '16px',
    },
    passwordPrinciples: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '15px 55px',
    },
  }),
);

export default function MyAccount() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [passwordValidateResult, setPasswordValidateResult] = useState<PasswordPrinciple | undefined>(undefined);
  const myAccount: MyAccountState = useSelector((state: RootState) => state.myAccount);

  const handleSaveChanges = () => {
    dispatch(saveAccountPageData(myAccount.model));
  };

  const handleAccountModelUpdate = (fieldName: string, value: string) => {
    dispatch(updateAccount({ fieldName, value }));
  };

  const handlePasswordChange = (password: string) => {
    const passwordValidateResult = validatePassword(password);
    setPasswordValidateResult(passwordValidateResult);
    dispatch(updateAccount({ fieldName: 'newPassword', value: password }));
  };

  const hasError = (fieldName: string): boolean => {
    return myAccount.valdiateErrors.findIndex((x) => x.field === fieldName) > -1;
  };

  function getErrorText(fieldName: string): string {
    return myAccount.valdiateErrors.find((x) => x.field === fieldName)?.message || '';
  }

  return (
    <Box className={classes.contentContainer}>
      <Grid container spacing={2}>
        <Grid xs={12} md={6} item>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                My Details
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12} md={6} item>
                  <TextField
                    label={'First Name'}
                    error={hasError('firstName')}
                    helperText={getErrorText('firstName')}
                    fullWidth
                    margin={'normal'}
                    value={myAccount.model.firstName}
                    InputProps={{ disableUnderline: true }}
                    InputLabelProps={{ shrink: true }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleAccountModelUpdate('firstName', (event.target as HTMLInputElement).value);
                    }}
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    label={'Last Name'}
                    error={hasError('lastName')}
                    helperText={getErrorText('lastName')}
                    fullWidth
                    margin={'normal'}
                    InputProps={{ disableUnderline: true }}
                    InputLabelProps={{ shrink: true }}
                    value={myAccount.model.lastName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleAccountModelUpdate('lastName', (event.target as HTMLInputElement).value);
                    }}
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelGender" shrink>
                      Gender
                    </InputLabel>
                    <Select
                      labelId={'labelGender'}
                      value={myAccount.model.gender}
                      disableUnderline
                      onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                        handleAccountModelUpdate('gender', event.target.value as string);
                      }}
                    >
                      {EnumToMap(Gender, true).map((item: SelectListItem) => {
                        return (
                          <MenuItem key={item.value} value={item.value}>
                            {item.text}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText></FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={6} item>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact Details
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12} md={6} item>
                  <TextField
                    label={'Email Address'}
                    error={hasError('email')}
                    helperText={getErrorText('email')}
                    placeholder={''}
                    margin={'normal'}
                    fullWidth
                    value={myAccount.model.email}
                    InputProps={{ disableUnderline: true }}
                    InputLabelProps={{ shrink: true }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleAccountModelUpdate('email', (event.target as HTMLInputElement).value);
                    }}
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <ContactNumber
                    contactNumber={myAccount.model.contactNumber}
                    contactNumberCode={myAccount.model.contactNumberCountryCode}
                    onCodeChange={(value) => handleAccountModelUpdate('contactNumberCountryCode', value)}
                    onNumberChange={(value) => handleAccountModelUpdate('contactNumber', value)}
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelCountry" shrink>
                      Country of Residence
                    </InputLabel>
                    <Select
                      labelId={'labelCountry'}
                      disableUnderline
                      value={myAccount.model.countryCode}
                      onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                        handleAccountModelUpdate('countryCode', event.target.value as string);
                      }}
                    >
                      {myAccount.countries.map((x) => (
                        <MenuItem key={x.code} value={x.code}>
                          {x.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} item>
                  <FormControl margin={'normal'} error={hasError('homeStateId')} fullWidth>
                    <InputLabel id="lblHomeState" shrink>
                      State/Region
                    </InputLabel>
                    <Select
                      labelId={'labelState'}
                      disableUnderline
                      placeholder={'Please select a state'}
                      value={myAccount.model.homeStateId}
                      onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                        handleAccountModelUpdate('homeStateId', event.target.value as string);
                      }}
                    >
                      {myAccount.states
                        .filter((x) => x.countryCode === myAccount.model.countryCode)
                        .map((x) => (
                          <MenuItem key={x.id} value={x.id}>
                            {x.name}
                          </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{getErrorText('homeStateId')}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} item>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Talent Details
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12} md={6} lg={3} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelArtistType" shrink>
                      Primary Talent Type
                    </InputLabel>
                    <Select labelId={'labelArtistType'} disableUnderline value={myAccount.model.primaryArtistTypeCode}>
                      {myAccount.artistTypes.map((x) => (
                        <MenuItem key={x.code} value={x.code}>
                          {x.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="lblAgeType" shrink>
                      Adult/Minor
                    </InputLabel>
                    <Select
                      labelId={'labellblAgeTypeAdult'}
                      disableUnderline
                      value={myAccount.model.ageType}
                      onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                        handleAccountModelUpdate('ageType', event.target.value as string);
                      }}
                    >
                      {EnumToMap(AgeType).map((item: SelectListItem) => {
                        return (
                          <MenuItem key={item.value} value={item.value}>
                            {item.text}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                {myAccount.model.ageType === AgeType.Adult && (
                  <Grid xs={12} md={6} lg={3} item>
                    <FormControl margin={'normal'} fullWidth>
                      <InputLabel id="labelAgeFrom" shrink>
                        Age range from
                      </InputLabel>
                      <Select
                        labelId={'labelAgeFrom'}
                        disableUnderline
                        value={myAccount.model.ageFrom}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                          handleAccountModelUpdate('ageFrom', event.target.value as string);
                        }}
                      >
                        {myAccount.ageOptions.map((x) => {
                          return (
                            <MenuItem key={x} value={x}>
                              {x} years old
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {myAccount.model.ageType === AgeType.Adult && (
                  <Grid xs={12} md={6} lg={3} item>
                    <FormControl margin={'normal'} fullWidth>
                      <InputLabel id="labelAgeTo" shrink>
                        Age range to
                      </InputLabel>
                      <Select
                        labelId={'labelAgeTo'}
                        disableUnderline
                        value={myAccount.model.ageTo}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                          handleAccountModelUpdate('ageTo', event.target.value as string);
                        }}
                      >
                        {myAccount.ageOptions.map((x) => {
                          return (
                            <MenuItem key={x} value={x}>
                              {x} years old
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
                {myAccount.model.ageType === AgeType.Minor && (
                  <Grid xs={12} md={6} lg={3} item>
                    <FormControl margin={'normal'} fullWidth>
                      <InputLabel id="lblDob" shrink>
                        Date of Birth <span style={{ fontWeight: 400 }}>(For Security Only)</span>
                      </InputLabel>
                      <Grid container spacing={2} style={{ marginTop: -2 }}>
                        <Grid xs={4} item>
                          <FormControl margin={'normal'} style={{ marginBottom: '0px' }} fullWidth>
                            <Select
                              value={myAccount.model.day}
                              disableUnderline
                              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                handleAccountModelUpdate('day', event.target.value as string);
                              }}
                            >
                              {Range(1, 30).map((x) => (
                                <MenuItem key={x} value={x}>
                                  {x}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid xs={4} item>
                          <FormControl margin={'normal'} style={{ marginBottom: '0px' }} fullWidth>
                            <Select
                              value={myAccount.model.month}
                              disableUnderline
                              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                handleAccountModelUpdate('month', event.target.value as string);
                              }}
                            >
                              {EnumToMap(Months).map((x) => (
                                <MenuItem key={x.value} value={x.value}>
                                  {x.text}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid xs={4} item>
                          <FormControl margin={'normal'} style={{ marginBottom: '0px' }} fullWidth>
                            <Select
                              value={myAccount.model.year}
                              disableUnderline
                              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                handleAccountModelUpdate('year', event.target.value as string);
                              }}
                            >
                              {Range(new Date().getUTCFullYear(), 1900)
                                .reverse()
                                .map((x) => (
                                  <MenuItem key={x} value={x}>
                                    {x}
                                  </MenuItem>
                                ))}
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
                    name="checkedC"
                    value={myAccount.model.seekRepresentation}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleAccountModelUpdate('seekRepresentation', event.target.checked ? 'true' : 'false');
                    }}
                  />
                }
                label="I am seeking representation and would like to be contacted by Agents and Managers"
              />
              <Grid container spacing={2}>
                <Grid xs={12} md={6} lg={3} item>
                  <FormControl margin={'normal'} fullWidth disabled={!myAccount.model.seekRepresentation}>
                    <InputLabel id="lablContactMethod" shrink>
                      Preferred method of contact
                    </InputLabel>
                    <Select
                      labelId={'lablContactMethod'}
                      disableUnderline
                      value={myAccount.model.preferContactMethod}
                      onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                        handleAccountModelUpdate('preferContactMethod', event.target.value as string);
                      }}
                    >
                      {EnumToMap(ContactType).map((item: SelectListItem) => {
                        return (
                          <MenuItem key={item.text} value={item.text}>
                            {item.text}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} item>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={6} spacing={2} item container>
                  <Grid xs={12} lg={6} item>
                    <Password
                      id={'currentPassword'}
                      label={'Current Password'}
                      margin={'normal'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                      value={myAccount.model.currentPassword}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleAccountModelUpdate('currentPassword', (event.target as HTMLInputElement).value);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} lg={6} item></Grid>
                  <Grid xs={12} lg={6} item>
                    <Password
                      id={'newPassword'}
                      label={'New Password'}
                      margin={'normal'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                      value={myAccount.model.newPassword}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handlePasswordChange((event.target as HTMLInputElement).value);
                      }}
                    />
                  </Grid>
                  <Grid xs={12} lg={6} item>
                    <Password
                      id={'confirmPassword'}
                      label={'Confirm New Password'}
                      margin={'normal'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                      value={myAccount.model.confirmPassword}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleAccountModelUpdate('confirmPassword', (event.target as HTMLInputElement).value);
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid xs={6} item container className={classes.passwordPrinciples}>
                  <PasswordStrength validateResult={passwordValidateResult} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={3}>
        <Button variant="contained" disableElevation onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
