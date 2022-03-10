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
} from '@material-ui/core';
import { Input } from 'themes/elements';
import { useStyles } from './MyAccount.styles';
import { useCardContentStyle } from 'themes/styles/useCardContentStyle';

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
                  <Input
                    label={'Contact Number'}
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    InputLabelProps={{ shrink: true }}
                  />
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
    </Box>
  );
};

export default MyAccount;
