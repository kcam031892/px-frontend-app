import React, { useState } from 'react';
import {
  Grid,
  CardContent,
  Select,
  Chip,
  FormControl,
  InputLabel,
  Card,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Box,
  Button,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { SearchIcon } from 'components/Icons';
import { Input, InputNumber } from 'themes/elements';
import { useStyles } from './Statistics.styles';
import { Autocomplete } from '@material-ui/lab';
import age from 'data/Age.json';
import gender from 'data/Gender.json';
import region from 'data/Region.json';
import metric from 'data/Metric.json';
import hairColor from 'data/HairColor.json';
import eyeColor from 'data/EyeColor.json';
import complexion from 'data/Complexion.json';
import ethnicity from 'data/Ethnicities.json';
import talentTypes from 'data/TalentTypes.json';
import chestSize from 'data/ChestSize.json';
import { IStatistics, IStatisticsResponsePayload } from 'shared/interfaces/IStatistics';
import { statisticsService } from 'shared/services/statisticsService';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { useDebounce } from 'use-debounce';
import { useQueryClient } from 'react-query';
import { IAlertStatus } from 'shared/interfaces/utils/IAlert';
import { AxiosError } from 'axios';
import { IErrorResponse } from 'shared/interfaces/utils/IErrorResonse';
import { errorResponseToArray } from 'shared/utils/errorResponseToArray';

const { getStatistics } = statisticsService();

const ethnicityOptions = ethnicity.map((i) => i);
const talentTypesOptions = talentTypes.map((i) => i);

const Statistics = () => {
  const classes = useStyles();
  const { data } = getStatistics();

  const [selectValue, setSelectValue] = useState('');
  // const [ethnicityValue, setEthnicityValue] = React.useState<string | null>(ethnicityOptions[0]);
  // const [inputEthnicityValue, setEthnicityInputValue] = React.useState('');
  // const [talentTypeValue, setTalentTypeValue] = React.useState<string | null>(talentTypesOptions[0]);
  // const [inputTalentTypeValue, setInputTalentTypeValue] = React.useState('');

  const selectRegion = (event: React.ChangeEvent<{ value: any }>) => {
    setSelectValue(event.target.value);
  };

  const selectGender = (event: React.ChangeEvent<{ value: any }>) => {
    setSelectValue(event.target.value);
  };

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
                    <Select labelId={'lblType'} onChange={selectRegion} disableUnderline defaultValue={region[0].value}>
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
                      Imperial/Metric
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
                    <Grid container spacing={2}>
                      <Grid xs={6} md={6} item>
                        <InputNumber
                          label={'Height'}
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                          }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid xs={6} md={6} item>
                        <InputNumber
                          label={' '}
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: <InputAdornment position="end">in</InputAdornment>,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Grid container spacing={2}>
                      <Grid xs={6} md={6} item>
                        <InputNumber
                          label={'Waist Size'}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                          }}
                        />
                      </Grid>
                      <Grid xs={6} md={6} item>
                        <Input
                          label={' '}
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: <InputAdornment position="end">lb</InputAdornment>,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container className={classes.profileItemsContainer} spacing={2}>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelAgeType" shrink>
                      Suit Size
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline>
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
                    <InputLabel id="labelAgeType" shrink>
                      Chest Size
                    </InputLabel>
                    <Select labelId={'lblType'} disableUnderline defaultValue={chestSize[0].name}>
                      {chestSize.map((i) => (
                        <MenuItem key={i.name} value={i.name}>
                          {i.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelAgeType" shrink>
                      Collar Size
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
                    <InputLabel id="labelAgeType" shrink>
                      Inside Leg
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
                    <InputLabel id="labelAgeType" shrink>
                      Outside Leg
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
              </Grid>
              <Grid container className={classes.profileItemsContainer} spacing={2}>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelAgeType" shrink>
                      Shoe Size
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
                    <InputLabel id="labelAgeType" shrink>
                      T-shirt Size
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
              </Grid>
              <Divider style={{ margin: '24px 0px' }} />
              <Grid spacing={2} container>
                <Grid xs={12} md={6} lg={6} item>
                  <InputLabel id="labelAgeType" shrink>
                    Ethnicity
                  </InputLabel>
                  <div className={classes.autocompleteContainer}>
                    <Autocomplete
                      multiple
                      limitTags={2}
                      getOptionLabel={(ethnicityOptions) => ethnicityOptions.name}
                      id="multiple-limit-tags"
                      options={ethnicityOptions}
                      renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                  </div>
                  <Button
                    id="viewAllEthnicities"
                    style={{ marginTop: '10px' }}
                    variant="contained"
                    color="default"
                    disableElevation
                  >
                    View All
                  </Button>
                </Grid>
                <Grid xs={12} md={6} lg={6} item>
                  <InputLabel id="labelAgeType" shrink>
                    Other Talent Types
                  </InputLabel>
                  <div className={classes.autocompleteContainer}>
                    <Autocomplete
                      multiple
                      limitTags={2}
                      getOptionLabel={(talentTypesOptions) => talentTypesOptions.value}
                      id="multiple-limit-tags"
                      options={talentTypesOptions}
                      renderInput={(params) => <TextField {...params} variant="outlined" />}
                    />
                  </div>
                  <Button
                    id="viewAllOtherTalentTypes"
                    style={{ marginTop: '10px' }}
                    variant="contained"
                    color="default"
                    disableElevation
                  >
                    View All
                  </Button>
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

export default Statistics;
