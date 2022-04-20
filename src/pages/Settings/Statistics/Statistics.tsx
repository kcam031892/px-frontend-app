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
  Link,
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
import tshirtSize from 'data/TShirtSize.json';
import chestSize from 'data/ChestSize.json';
import suitSize from 'data/SuitSize.json';

import EthnicityDialog from './EthnicityDialog/EthnicityDialog';
import ConfirmationDialog from './ConfirmationDialog/ConfirmationDialog';

import { IStatistics, ITalentStatisticsResponsePayload, ITalentUpdatePayload } from 'shared/interfaces/ITalent';
import { talentService } from 'shared/services/talentService';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { useDebounce } from 'use-debounce';
import { useQueryClient } from 'react-query';
import { IAlertStatus } from 'shared/interfaces/utils/IAlert';
import { AxiosError } from 'axios';
import { IErrorResponse } from 'shared/interfaces/utils/IErrorResonse';
import { errorResponseToArray } from 'shared/utils/errorResponseToArray';
import _ from 'lodash';

const { getStatistics, updateTalent } = talentService();

const ethnicityOptions = ethnicity.map((i) => i);
const talentTypesOptions = talentTypes.map((i) => i);

const Statistics = () => {
  const classes = useStyles();
  const { data } = getStatistics();

  const [ethnicityChipValue, setEthnicityChipValue] = useState<any[]>([]);
  const [talentChipValue, setTalentChipValue] = useState<any[]>([]);

  const [chestSizeInValue, setChestSizeInValue] = useState('');
  const [chestSizeCmValue, setChestSizeCmValue] = useState('');

  const onEthnicityChipDelete = (name: any) => () => {
    setEthnicityChipValue((value) => value.filter((v) => v.name !== name));
  };

  const onTalentChipDelete = (name: any) => () => {
    setTalentChipValue((value) => value.filter((v) => v.value !== value));
  };

  const [selectValue, setSelectValue] = useState('');
  // const [ethnicityValue, setEthnicityValue] = React.useState<string | null>(ethnicityOptions[0]);
  // const [inputEthnicityValue, setEthnicityInputValue] = React.useState('');
  // const [talentTypeValue, setTalentTypeValue] = React.useState<string | null>(talentTypesOptions[0]);
  // const [inputTalentTypeValue, setInputTalentTypeValue] = React.useState('');

  const [regionValue, setRegionValue] = useState('');
  const [ageValue, setAgeValue] = useState('');
  const [metricValue, setMetricValue] = useState(metric[0].value);
  const [genderValue, setGenderValue] = useState('');

  const selectRegion = (event: React.ChangeEvent<{ value: any }>) => {
    setRegionValue(event.target.value);
    console.log(event.target);
    if (event.target.value === 'US' || event.target.value === 'UK') {
      setMetricValue('Imperial/Metric');
    } else {
      setMetricValue('Metric');
    }
  };

  const selectAge = (event: React.ChangeEvent<{ value: any }>) => {
    setAgeValue(event.target.value);
  };

  const selectMetric = (event: React.ChangeEvent<{ value: any }>) => {
    setMetricValue(event.target.value);
  };

  const selectGender = (event: React.ChangeEvent<{ value: any }>) => {
    setGenderValue(event.target.value);
  };

  const [isEthnicityDialogOpen, setIsEthnicityDialogOpen] = useState<boolean>(false);
  const handleOpenEthnicityDialog = () => setIsEthnicityDialogOpen(true);
  const handleCloseEthnicityDialog = () => setIsEthnicityDialogOpen(false);

  const [isConfirmationDialog, setIsConfirmationDialog] = useState<boolean>(false);
  const handleOpenConfirmationDialog = () => setIsConfirmationDialog(true);
  const handleCloseConfirmationDialog = () => setIsConfirmationDialog(false);

  // const initialValues: ITalentUpdatePayload = {
  //   statistics: {},
  // };

  // const statisticsValidationScheme: yup.SchemaOf<ITalentUpdatePayload> = yup.object().shape({
  //   statistics: yup.array(),
  // });

  const { mutate, isLoading: isUpdateLoading } = updateTalent();

  // const form: FormikProps<ITalentUpdatePayload> = useFormik({
  //   initialValues,
  //   validationSchema: statisticsValidationScheme,
  //   onSubmit: (values) => handleSubmit(values),
  //   enableReinitialize: true,
  // });

  function cmtoIn(e: any, set: any) {
    const inches = e.target.value / 2.54;
    const num = Math.round(inches / 0.5) * 0.5;
    set(num);
  }

  function inToCm(e: any, set: any) {
    const cm = e.target.value * 0.3937;
    const num = Math.round(cm / 0.5) * 0.5;
    set(num);
  }

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
                    <Select
                      labelId={'lblType'}
                      onChange={(e) => {
                        handleOpenConfirmationDialog();
                        selectRegion(e);
                      }}
                      disableUnderline
                      defaultValue={region[0].key}
                    >
                      {region.map((i) => (
                        <MenuItem key={i.key} value={i.key}>
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
                    <Select
                      labelId={'lblType'}
                      disableUnderline
                      defaultValue={age[0].value}
                      onChange={(e) => {
                        handleOpenConfirmationDialog();
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
                <Grid xs={12} md={6} lg={3} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelSizeUnit" shrink>
                      Imperial/Metric
                    </InputLabel>
                    <Select
                      labelId={'lblType'}
                      disableUnderline
                      onChange={(e) => {
                        handleOpenConfirmationDialog();
                        selectMetric(e);
                      }}
                      value={metricValue}
                      defaultValue={metric[0].value}
                    >
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
                    <Select
                      labelId={'lblType'}
                      disableUnderline
                      onChange={(e) => {
                        handleOpenConfirmationDialog();
                        selectGender(e);
                      }}
                      defaultValue={gender[0].value}
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

        <Grid xs={12} md={12} item>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile
              </Typography>

              {ageValue === 'Minor' ? (
                <Grid>
                  <Grid container className={classes.profileItemsContainer} spacing={2}>
                    <Grid xs={12} md={6} lg={2} item>
                      <FormControl margin={'normal'} fullWidth>
                        <InputLabel id="labelCountry" shrink>
                          Hair Color
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
                        {metricValue === 'Imperial/Metric' ? (
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
                        ) : (
                          <Grid container spacing={2}>
                            <Grid xs={12} md={12} item>
                              <InputNumber
                                label={'Height'}
                                InputProps={{
                                  disableUnderline: true,
                                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </Grid>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={6} lg={2} item>
                      <FormControl margin={'normal'} fullWidth>
                        {metricValue === 'Imperial/Metric' ? (
                          <Grid container spacing={2}>
                            <Grid xs={6} md={6} item>
                              <InputNumber
                                label={'Waist Size'}
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
                        ) : (
                          <Grid container spacing={2}>
                            <Grid xs={12} md={12} item>
                              <InputNumber
                                label={'Waist Size'}
                                InputProps={{
                                  disableUnderline: true,
                                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </Grid>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.profileItemsContainer} spacing={2}>
                    <Grid xs={12} md={6} lg={2} item>
                      <FormControl margin={'normal'} fullWidth>
                        {metricValue === 'Imperial/Metric' ? (
                          <Grid container spacing={2}>
                            <Grid xs={6} md={6} item>
                              <InputNumber
                                label={'Hat Size'}
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
                        ) : (
                          <Grid container spacing={2}>
                            <Grid xs={12} md={12} item>
                              <InputNumber
                                label={'Hat Size'}
                                InputProps={{
                                  disableUnderline: true,
                                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </Grid>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={6} lg={2} item>
                      <FormControl margin={'normal'} fullWidth>
                        {metricValue === 'Imperial/Metric' ? (
                          <Grid container spacing={2}>
                            <Grid xs={6} md={6} item>
                              <InputNumber
                                label={'Waist Size'}
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
                        ) : (
                          <Grid container spacing={2}>
                            <Grid xs={12} md={12} item>
                              <InputNumber
                                label={'Waist Size'}
                                InputProps={{
                                  disableUnderline: true,
                                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </Grid>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={6} lg={2} item>
                      <FormControl margin={'normal'} fullWidth>
                        <InputLabel id="labelAgeType" shrink>
                          Kid Clothing
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
                        {metricValue === 'Imperial/Metric' ? (
                          <Grid container spacing={2}>
                            <Grid xs={6} md={6} item>
                              <InputNumber
                                label={'Inside Leg'}
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
                        ) : (
                          <Grid container spacing={2}>
                            <Grid xs={12} md={12} item>
                              <InputNumber
                                label={'Inside Leg'}
                                InputProps={{
                                  disableUnderline: true,
                                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </Grid>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={6} lg={2} item>
                      <FormControl margin={'normal'} fullWidth>
                        {metricValue === 'Imperial/Metric' ? (
                          <Grid container spacing={2}>
                            <Grid xs={6} md={6} item>
                              <InputNumber
                                label={'Outside Leg'}
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
                        ) : (
                          <Grid container spacing={2}>
                            <Grid xs={12} md={12} item>
                              <InputNumber
                                label={'Outside Leg'}
                                InputProps={{
                                  disableUnderline: true,
                                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </Grid>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.profileItemsContainer} spacing={2}>
                    <Grid xs={12} md={6} lg={2} item>
                      <FormControl margin={'normal'} fullWidth>
                        <InputLabel id="labelAgeType" shrink>
                          T-Shirt Size
                        </InputLabel>
                        <Select labelId={'lblType'} disableUnderline defaultValue={tshirtSize[0].value}>
                          {tshirtSize.map((i) => (
                            <MenuItem key={i.key} value={i.value}>
                              {i.value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              ) : (
                <Grid>
                  <Grid container className={classes.profileItemsContainer} spacing={2}>
                    <Grid xs={12} md={6} lg={2} item>
                      <FormControl margin={'normal'} fullWidth>
                        <InputLabel id="labelCountry" shrink>
                          Hair Color
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
                        {metricValue === 'Imperial/Metric' ? (
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
                        ) : (
                          <Grid container spacing={2}>
                            <Grid xs={12} md={12} item>
                              <InputNumber
                                label={'Height'}
                                InputProps={{
                                  disableUnderline: true,
                                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </Grid>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={6} lg={2} item>
                      <FormControl margin={'normal'} fullWidth>
                        {metricValue === 'Imperial/Metric' ? (
                          <Grid container spacing={2}>
                            <Grid xs={6} md={6} item>
                              <InputNumber
                                label={'Waist Size'}
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
                        ) : (
                          <Grid container spacing={2}>
                            <Grid xs={12} md={12} item>
                              <InputNumber
                                label={'Waist Size'}
                                InputProps={{
                                  disableUnderline: true,
                                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </Grid>
                        )}
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
                          {suitSize.map((i) => (
                            <>
                              {i.values
                                .filter((values) => values.region === regionValue)
                                .map((j) => {
                                  <MenuItem key={j.name} value={j.name}>
                                    {j.name}
                                  </MenuItem>;
                                })}
                            </>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={6} lg={2} item>
                      <FormControl margin={'normal'} fullWidth>
                        {metricValue === 'Imperial/Metric' ? (
                          <Grid container spacing={2}>
                            <Grid xs={6} md={6} item>
                              <InputNumber
                                label={'Chest Size'}
                                value={chestSizeCmValue}
                                InputProps={{
                                  disableUnderline: true,
                                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => cmtoIn(e, setChestSizeInValue)}
                              />
                            </Grid>
                            <Grid xs={6} md={6} item>
                              <InputNumber
                                label={' '}
                                value={chestSizeInValue}
                                onChange={(e) => inToCm(e, setChestSizeCmValue)}
                                InputProps={{
                                  disableUnderline: true,
                                  endAdornment: <InputAdornment position="end">in</InputAdornment>,
                                }}
                              />
                            </Grid>
                          </Grid>
                        ) : (
                          <Grid container spacing={2}>
                            <Grid xs={12} md={12} item>
                              <InputNumber
                                label={'Chest Size'}
                                InputProps={{
                                  disableUnderline: true,
                                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </Grid>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={6} lg={2} item>
                      <FormControl margin={'normal'} fullWidth>
                        {metricValue === 'Imperial/Metric' ? (
                          <Grid container spacing={2}>
                            <Grid xs={6} md={6} item>
                              <InputNumber
                                label={'Collar Size'}
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
                        ) : (
                          <Grid container spacing={2}>
                            <Grid xs={12} md={12} item>
                              <InputNumber
                                label={'Collar Size'}
                                InputProps={{
                                  disableUnderline: true,
                                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </Grid>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={6} lg={2} item>
                      <FormControl margin={'normal'} fullWidth>
                        {metricValue === 'Imperial/Metric' ? (
                          <Grid container spacing={2}>
                            <Grid xs={6} md={6} item>
                              <InputNumber
                                label={'Inside Leg'}
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
                        ) : (
                          <Grid container spacing={2}>
                            <Grid xs={12} md={12} item>
                              <InputNumber
                                label={'Inside Leg'}
                                InputProps={{
                                  disableUnderline: true,
                                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </Grid>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={6} lg={2} item>
                      <FormControl margin={'normal'} fullWidth>
                        {metricValue === 'Imperial/Metric' ? (
                          <Grid container spacing={2}>
                            <Grid xs={6} md={6} item>
                              <InputNumber
                                label={'Outside Leg'}
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
                        ) : (
                          <Grid container spacing={2}>
                            <Grid xs={12} md={12} item>
                              <InputNumber
                                label={'Outside Leg'}
                                InputProps={{
                                  disableUnderline: true,
                                  endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </Grid>
                        )}
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
                          {tshirtSize.map((i) => (
                            <MenuItem key={i.key} value={i.value}>
                              {i.value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    {genderValue === 'Male' ? (
                      <></>
                    ) : (
                      <Grid xs={12} md={6} lg={2} item>
                        <FormControl margin={'normal'} fullWidth>
                          {metricValue === 'Imperial/Metric' ? (
                            <Grid container spacing={2}>
                              <Grid xs={6} md={6} item>
                                <InputNumber
                                  label={'Hip Size'}
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
                          ) : (
                            <Grid container spacing={2}>
                              <Grid xs={12} md={12} item>
                                <InputNumber
                                  label={'Hip Size'}
                                  InputProps={{
                                    disableUnderline: true,
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                  }}
                                  InputLabelProps={{ shrink: true }}
                                />
                              </Grid>
                            </Grid>
                          )}
                        </FormControl>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              )}
              <Divider style={{ margin: '24px 0px' }} />
              <Grid spacing={2} container>
                <Grid xs={12} md={6} lg={6} item>
                  <InputLabel id="labelAgeType" shrink>
                    Ethnicity
                  </InputLabel>
                  <div className={classes.autocompleteContainer}>
                    <Autocomplete
                      multiple
                      options={ethnicityOptions}
                      getOptionLabel={(ethnicityOptions) => ethnicityOptions.name}
                      id="multiple-tags"
                      value={ethnicityChipValue}
                      onChange={(e, newValue) => setEthnicityChipValue(newValue)}
                      renderTags={() => null}
                      renderInput={(params) => (
                        <Grid className={classes.autoCompleteGrid}>
                          <Link onClick={handleOpenEthnicityDialog}>View All</Link>
                          <TextField {...params} variant="outlined" placeholder="Ethnicities" />
                        </Grid>
                      )}
                    />
                  </div>

                  <Grid className={classes.chipContainer}>
                    {ethnicityChipValue.map((v) => (
                      <Chip key={v.name} label={v.name} onDelete={onEthnicityChipDelete(v.name)} />
                    ))}
                  </Grid>
                </Grid>
                <Grid xs={12} md={6} lg={6} item>
                  <InputLabel id="labelAgeType" shrink>
                    Other Talent Types
                  </InputLabel>
                  <div className={classes.autocompleteContainer}>
                    <Autocomplete
                      multiple
                      options={talentTypesOptions}
                      getOptionLabel={(talentTypesOptions) => talentTypesOptions.value}
                      id="multiple-tags"
                      value={talentTypesOptions}
                      onChange={(e, newValue) => setTalentChipValue(newValue)}
                      renderTags={() => null}
                      renderInput={(params) => (
                        <Grid className={classes.autoCompleteGrid}>
                          <Link onClick={handleOpenEthnicityDialog}>View All</Link>
                          <TextField {...params} variant="outlined" placeholder="Other Talent Types" />
                        </Grid>
                      )}
                    />
                  </div>
                  <Grid className={classes.chipContainer}>
                    {talentChipValue.map((v) => (
                      <Chip key={v.value} label={v.value} onDelete={onTalentChipDelete(v.value)} />
                    ))}
                  </Grid>
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
      <EthnicityDialog open={isEthnicityDialogOpen} onClose={handleCloseEthnicityDialog} />
      <ConfirmationDialog open={isConfirmationDialog} onClose={handleCloseConfirmationDialog} />
    </Grid>
  );
};

export default Statistics;
