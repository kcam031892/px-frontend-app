import {
  Grid,
  CardContent,
  Select,
  FormControl,
  InputLabel,
  Card,
  Typography,
  Menu,
  MenuItem,
  Divider,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Input } from 'themes/elements';
import { useStyles } from './Statistics.styles';
import { Autocomplete } from '@material-ui/lab';
import age from 'data/Age.json';
import gender from 'data/Gender.json';
import region from 'data/Region.json';
import metric from 'data/Metric.json';
import hairColor from 'data/HairColor.json';
import eyeColor from 'data/EyeColor.json';
import complexion from 'data/Complexion.json';

const Statistics = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={0}>
      <Grid container spacing={2}>
        <Grid xs={12} md={12} item>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistics Settings
              </Typography>
              <Grid container spacing={2}>
                <Grid xs={12} md={6} lg={3} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelCountry" shrink>
                      Region
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline defaultValue={region[0].value}>
                      {region.map((i) => (
                        <MenuItem key={i.key} value={i.value}>
                          {i.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelAgeType" shrink>
                      Adult/Minor
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline defaultValue={age[0].value}>
                      {age.map((i) => (
                        <MenuItem key={i.key} value={i.value}>
                          {i.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelSizeUnit" shrink>
                      Imperial/ Metric
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline defaultValue={metric[0].value}>
                      {metric.map((i) => (
                        <MenuItem key={i.key} value={i.value}>
                          {i.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelGender" shrink>
                      Gender
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline defaultValue={gender[0].value}>
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
        <Grid xs={12} md={12} item>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile
              </Typography>
              <Grid container className={classes.profileItemsContainer} spacing={2}>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelCountry" shrink>
                      Hair Colour
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline defaultValue={hairColor[0].value}>
                      {hairColor.map((i) => (
                        <MenuItem key={i.key} value={i.value}>
                          {i.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelAgeType" shrink>
                      Eye Colour
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline defaultValue={eyeColor[0].value}>
                      {eyeColor.map((i) => (
                        <MenuItem key={i.key} value={i.value}>
                          {i.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelSizeUnit" shrink>
                      Complexion
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline defaultValue={complexion[0].value}>
                      {complexion.map((i) => (
                        <MenuItem key={i.key} value={i.value}>
                          {i.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelGender" shrink>
                      Height
                    </InputLabel>
                    <Input
                      label={'Height'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Input
                      label={'Waist Size'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container className={classes.profileItemsContainer} spacing={2}>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Input
                      label={'Suit Size'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Input
                      label={'Chest Size'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Input
                      label={'Collar Size'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Input
                      label={'Inside Leg'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Input
                      label={'Outside Leg'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container className={classes.profileItemsContainer} spacing={2}>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Input
                      label={'Shoe Size'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Input
                      label={'T-Shirt Size'}
                      fullWidth
                      InputProps={{ disableUnderline: true }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Divider style={{ margin: '24px 0px' }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Statistics;
