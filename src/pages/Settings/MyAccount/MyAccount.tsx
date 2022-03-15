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

const selectAge = (event: React.ChangeEvent<{}>) => {
  console.log(event.target);
};

const MyAccount = () => {
  const classes = useStyles();
  const cardContentStyle = useCardContentStyle();

  return (
    <Box className={classes.contentContainer}>
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
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <Input
                    label={'Last Name'}
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="lblType" shrink>
                      Gender
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline>
                      <MenuItem key={'MALE'} value={'MALE'}>
                        Male
                      </MenuItem>
                      <MenuItem key={'FEMALE'} value={'FEMALE'}>
                        Female
                      </MenuItem>
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
                <Grid xs={12} md={6} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="lblType" shrink>
                      State/Region
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
                Talent Details
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12} md={6} lg={3} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="lblType" shrink>
                      Primary Talent Type
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline>
                      <MenuItem key={'ACTOR'} value={'ACTOR'}>
                        Actor
                      </MenuItem>
                      <MenuItem key={'US'} value={'UNITED STATES'}>
                        United States
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="lblType" shrink>
                      Adult/Minor
                    </InputLabel>
                    <Select onChange={selectAge} labelId={'lblType'} disableUnderline>
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
    </Box>
  );
};

export default MyAccount;
