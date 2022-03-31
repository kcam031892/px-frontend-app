import React, { useState } from 'react';
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
} from '@material-ui/core';
import { ContactInput, Input, InputPassword } from 'themes/elements';
import { useStyles } from './MyAccount.styles';
import { useCardContentStyle } from 'themes/styles/useCardContentStyle';
import { IAccount } from 'shared/interfaces/IAccount';
import gender from 'data/Gender.json';
import country from 'data/Countries.json';
import state from 'data/States.json';
import age from 'data/Age.json';
import talentTypes from 'data/TalentTypes.json';
import { accountService } from 'shared/services/accountService';

const { getAccount } = accountService();

const MyAccount = () => {
  const { data } = getAccount();

  const classes = useStyles();
  const cardContentStyle = useCardContentStyle();

  const [selectAgeValue, setSelectAgeValue] = useState('');
  const [selectCountryValue, setSelectCountryValue] = useState('');

  const selectAge = (event: React.ChangeEvent<{ value: any }>) => {
    setSelectAgeValue(event.target.value);
  };

  const selectCountry = (event: React.ChangeEvent<{ value: any }>) => {
    setSelectCountryValue(event.target.value);
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
                    value={data?.data.attributes.first_name}
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <Input
                    label={'Last Name'}
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    InputLabelProps={{ shrink: true }}
                    value={data?.data.attributes.last_name}
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="lblType" shrink>
                      Gender
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline value={data?.data.attributes.gender}>
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
                    value={data?.data.attributes.email}
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
                    <Select labelId={'lblType'} onChange={selectCountry} disableUnderline>
                      <MenuItem key={'N/A'} value={''}>
                        Select Country
                      </MenuItem>
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
                    {state.countries
                      .filter((country) => country.country === selectCountryValue)
                      .map((i) => (
                        <Select labelId={'lblType'} disableUnderline defaultValue={'Select State'}>
                          {i.states
                            .filter((state) => state != null)
                            .map((j) => (
                              <MenuItem key={j} value={j}>
                                {j}
                              </MenuItem>
                            ))}
                        </Select>
                      ))}
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
                    <Select labelId={'lblType'} disableUnderline defaultValue={talentTypes[0].value}>
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
                    <Select onChange={selectAge} labelId={'lblType'} disableUnderline defaultValue={age[0].value}>
                      {age.map((i) => (
                        <MenuItem key={i.key} value={i.value}>
                          {i.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {selectAgeValue === 'Minor' ? (
                  <Grid xs={6} item>
                    <FormControl margin={'normal'} fullWidth>
                      <Grid container spacing={2} style={{ marginTop: -2 }}>
                        <InputLabel id="lblDob" shrink>
                          Date of Birth <span style={{ fontWeight: 400 }}>(For Security Only)</span>
                        </InputLabel>
                        <Grid xs={6} item>
                          <FormControl margin={'normal'} style={{ marginBottom: '0px' }} fullWidth>
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
                        <Grid lg={3} style={{ paddingTop: '2px' }} item>
                          <FormControl fullWidth>
                            <InputLabel id="lblAgeRange" shrink>
                              Age Range
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
                        <Grid lg={3} md={6} xs={12} item>
                          <FormControl margin={'normal'} style={{ marginBottom: '0px' }} fullWidth>
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
                ) : (
                  <Grid lg={6} item>
                    <FormControl margin={'normal'} fullWidth>
                      <Grid container spacing={2} style={{ marginTop: -2 }}>
                        <Grid lg={6} style={{ paddingTop: '2px' }} item>
                          <FormControl fullWidth>
                            <InputLabel id="lblAgeRange" shrink>
                              Age Range
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
                        <Grid lg={6} item>
                          <FormControl margin={'normal'} style={{ marginBottom: '0px' }} fullWidth>
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
        <Button variant="contained" disableElevation>
          Save Changes
        </Button>
      </Box>
    </Grid>
  );
};

export default MyAccount;
