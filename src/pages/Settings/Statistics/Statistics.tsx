import React, { useState, useEffect } from 'react';
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
import { Input, InputNumber, useAlert, Backdrop } from 'themes/elements';
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
import suitSize from 'data/SuitSize.json';
import femaleSuitSize from 'data/FemaleSuitSizes.json';
import kidClothing from 'data/KidClothesSize.json';
import maleShoeSize from 'data/MaleShoeSize.json';
import femaleShoeSize from 'data/FemaleShoeSize.json';
import kidShoeSize from 'data/KidShoeSize.json';

import EthnicityDialog from './EthnicityDialog/EthnicityDialog';
import TalentTypesDialog from './TalentTypesDialog/TalentTypesDialog';
import ConfirmationDialog from './ConfirmationDialog/ConfirmationDialog';

import { ITalentUpdatePayload } from 'shared/interfaces/ITalent';
import { talentService } from 'shared/services/talentService';
import * as yup from 'yup';
import { FormikConsumer, FormikProps, useFormik } from 'formik';
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
  const { data, isLoading } = getStatistics();
  const queryClient = useQueryClient();
  const { mutate, isLoading: isUpdateLoading } = updateTalent();
  const { isOpen: isAlertOpen, alertRef, AlertOpen } = useAlert({ autoHideDuration: 2000, horizontal: 'center' });

  const [isEthnicityDialogOpen, setIsEthnicityDialogOpen] = useState<boolean>(false);
  const handleOpenEthnicityDialog = () => setIsEthnicityDialogOpen(true);
  const handleCloseEthnicityDialog = () => setIsEthnicityDialogOpen(false);

  const [isTalentTypesDialogOpen, setIsTalentTypesDialogOpen] = useState<boolean>(false);
  const handleOpenTalentTypesDialog = () => setIsTalentTypesDialogOpen(true);
  const handleCloseTalentTypesDialog = () => setIsTalentTypesDialogOpen(false);

  const [isConfirmationDialog, setIsConfirmationDialog] = useState<boolean>(false);
  const handleOpenConfirmationDialog = () => setIsConfirmationDialog(true);
  const handleCloseConfirmationDialog = () => setIsConfirmationDialog(false);

  const [ethncitiyData, setEthnicityData] = useState(data ? data.data.attributes.statistics.ethnicity : []);

  const initialValues: ITalentUpdatePayload = {
    statistics: {
      region: data ? data.data.attributes.statistics.region : '',
      adult_minor: data ? data.data.attributes.statistics.adult_minor : '',
      metric_system: data ? data.data.attributes.statistics.metric_system : '',
      gender: data ? data.data.attributes.statistics.gender : '',
      hair_color: data ? data.data.attributes.statistics.hair_color : '',
      eye_color: data ? data.data.attributes.statistics.eye_color : '',
      complexion: data ? data.data.attributes.statistics.complexion : '',
      height_cm: data ? data.data.attributes.statistics.height_cm : '',
      height_in: data ? data.data.attributes.statistics.height_in : '',
      hat_cm: data ? data.data.attributes.statistics.hat_cm : '',
      hat_in: data ? data.data.attributes.statistics.hat_in : '',
      waist_cm: data ? data.data.attributes.statistics.waist_cm : '',
      waist_in: data ? data.data.attributes.statistics.waist_in : '',
      weight_kg: data ? data.data.attributes.statistics.weight_kg : '',
      weight_lb: data ? data.data.attributes.statistics.weight_lb : '',
      suit_size: data ? data.data.attributes.statistics.suit_size : '',
      chest_size_cm: data ? data.data.attributes.statistics.chest_size_cm : '',
      chest_size_in: data ? data.data.attributes.statistics.chest_size_in : '',
      collar_size_cm: data ? data.data.attributes.statistics.collar_size_cm : '',
      collar_size_in: data ? data.data.attributes.statistics.collar_size_in : '',
      inside_leg_cm: data ? data.data.attributes.statistics.inside_leg_cm : '',
      inside_leg_in: data ? data.data.attributes.statistics.inside_leg_in : '',
      outside_leg_cm: data ? data.data.attributes.statistics.outside_leg_cm : '',
      outside_leg_in: data ? data.data.attributes.statistics.outside_leg_in : '',
      shoe_size: data ? data.data.attributes.statistics.shoe_size : '',
      t_shirt_size: data ? data.data.attributes.statistics.t_shirt_size : '',
      hip_size_cm: data ? data.data.attributes.statistics.hip_size_cm : '',
      hip_size_in: data ? data.data.attributes.statistics.hip_size_in : '',
      ethnicity: data ? data.data.attributes.statistics.ethnicity : [],
      other_talent_types: data ? data.data.attributes.statistics.other_talent_types : [],
    },
  };

  const statisticsValidationScheme: yup.SchemaOf<ITalentUpdatePayload> = yup.object().shape({
    resume: yup.array(),
    resume_show_year: yup.boolean(),
    biography: yup.string(),
    statistics: yup.object().shape({
      region: yup.string()!,
      adult_minor: yup.string(),
      metric_system: yup.string(),
      gender: yup.string(),
      hair_color: yup.string(),
      eye_color: yup.string(),
      complexion: yup.string(),
      height_cm: yup.string(),
      height_in: yup.string(),
      waist_cm: yup.string(),
      waist_in: yup.string(),
      suit_size: yup.string(),
      weight_kg: yup.string(),
      weight_lb: yup.string(),
      hat_cm: yup.string(),
      hat_in: yup.string(),
      chest_size_cm: yup.string(),
      chest_size_in: yup.string(),
      collar_size_cm: yup.string(),
      collar_size_in: yup.string(),
      inside_leg_cm: yup.string(),
      inside_leg_in: yup.string(),
      outside_leg_cm: yup.string(),
      outside_leg_in: yup.string(),
      shoe_size: yup.string(),
      t_shirt_size: yup.string(),
      hip_size_cm: yup.string(),
      hip_size_in: yup.string(),
      ethnicity: yup.array(),
      other_talent_types: yup.array(),
    }),
  });

  const handleUpdateStatistics = (values: ITalentUpdatePayload) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries('talents/statistics');
        AlertOpen('success', 'Statistics has been successfully updated');
      },
    });
  };

  const form: FormikProps<ITalentUpdatePayload> = useFormik({
    initialValues,
    validationSchema: statisticsValidationScheme,
    onSubmit: (values) => handleUpdateStatistics(values),
    enableReinitialize: true,
  });

  useEffect(() => {
    if (data) {
      form.setFieldValue('attributes.region', data.data.attributes.statistics.region);
      form.setFieldValue('attributes.adult_minor', data.data.attributes.statistics.adult_minor);
      form.setFieldValue('attributes.metric_system', data.data.attributes.statistics.metric_system);
      form.setFieldValue('attributes.gender', data.data.attributes.statistics.gender);
      form.setFieldValue('attributes.hair_color', data.data.attributes.statistics.hair_color);
      form.setFieldValue('attributes.eye_color', data.data.attributes.statistics.eye_color);
      form.setFieldValue('attributes.complexion', data.data.attributes.statistics.complexion);
      form.setFieldValue('attributes.height_cm', data.data.attributes.statistics.height_cm);
      form.setFieldValue('attributes.height_in', data.data.attributes.statistics.height_in);
      form.setFieldValue('attributes.hat_cm', data.data.attributes.statistics.hat_cm);
      form.setFieldValue('attributes.hat_in', data.data.attributes.statistics.hat_in);
      form.setFieldValue('attributes.waist_cm', data.data.attributes.statistics.waist_cm);
      form.setFieldValue('attributes.waist_in', data.data.attributes.statistics.waist_in);
      form.setFieldValue('attributes.weight_kg', data.data.attributes.statistics.weight_kg);
      form.setFieldValue('attributes.weight_lb', data.data.attributes.statistics.weight_lb);
      form.setFieldValue('attributes.suit_size', data.data.attributes.statistics.suit_size);
      form.setFieldValue('attributes.chest_size_cm', data.data.attributes.statistics.chest_size_cm);
      form.setFieldValue('attributes.chest_size_in', data.data.attributes.statistics.chest_size_in);
      form.setFieldValue('attributes.collar_size_cm', data.data.attributes.statistics.collar_size_cm);
      form.setFieldValue('attributes.collar_size_in', data.data.attributes.statistics.collar_size_in);
      form.setFieldValue('attributes.inside_leg_cm', data.data.attributes.statistics.inside_leg_cm);
      form.setFieldValue('attributes.inside_leg_in', data.data.attributes.statistics.inside_leg_in);
      form.setFieldValue('attributes.outside_leg_in', data.data.attributes.statistics.outside_leg_in);
      form.setFieldValue('attributes.outside_leg_cm', data.data.attributes.statistics.outside_leg_cm);
      form.setFieldValue('attributes.shoe_size', data.data.attributes.statistics.shoe_size);
      form.setFieldValue('attributes.t_shirt_size', data.data.attributes.statistics.t_shirt_size);
      form.setFieldValue('attributes.hip_size_cm', data.data.attributes.statistics.hip_size_cm);
      form.setFieldValue('attributes.hip_size_in', data.data.attributes.statistics.hip_size_in);
      form.setFieldValue('attributes.ethnicity', data.data.attributes.statistics.ethnicity);
      form.setFieldValue('attributes.other_talent_types', data.data.attributes.statistics.other_talent_types);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function cmtoIn(e: any, field: string) {
    const inches = e.target.value / 2.54;
    const num = Math.round(inches / 0.5) * 0.5;
    form.setFieldValue(field, num);
  }

  function inToCm(e: any, field: string) {
    const cm = e.target.value * 0.3937;
    const num = Math.round(cm / 0.5) * 0.5;
    form.setFieldValue(field, num);
  }

  function kgToLb(e: any, field: string) {
    const kg = e.target.value / 2.2046;
    const num = Math.round(kg);
    form.setFieldValue(field, num);
  }

  function lbToKg(e: any, field: string) {
    const lb = e.target.value * 2.2046;
    const num = Math.round(lb);
    form.setFieldValue(field, num);
  }

  interface ChipData {
    id: number;
    value: string;
  }

  const onEthnicityChipDelete = (e: ChipData) => () => {
    setEthnicityData((chips: any) => chips.filter((chip: any) => chip.id !== e.id));
    console.log(e);
  };

  const onTalentChipDelete = (e: ChipData) => () => {
    form.setFieldValue('statistics.other_talent_types', (chips: any) => chips.filter((chip: any) => chip.id !== e.id));
  };

  return (
    <Grid container spacing={0}>
      {isAlertOpen && alertRef}
      {!isLoading && (
        <>
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
                            form.handleChange(e);
                            form.setFieldValue('statistics.region', e.target.value);
                          }}
                          name="statistics.region"
                          value={form.values.statistics?.region}
                          disableUnderline
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
                          onChange={(e) => {
                            handleOpenConfirmationDialog();
                            form.handleChange(e);
                            form.setFieldValue('statistics.adult_minor', e.target.value);
                          }}
                          name="statistics.adult_minor"
                          value={form.values.statistics?.adult_minor}
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
                            form.handleChange(e);
                            form.setFieldValue('statistics.metric_system', e.target.value);
                          }}
                          name="statistics.metric_system"
                          value={form.values.statistics?.metric_system}
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
                            form.handleChange(e);
                            form.setFieldValue('statistics.gender', e.target.value);
                          }}
                          name="statistics.gender"
                          value={form.values.statistics?.gender}
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

                  {form.values.statistics?.adult_minor === 'Minor' ? (
                    <Grid>
                      <Grid container className={classes.profileItemsContainer} spacing={2}>
                        <Grid xs={12} md={6} lg={2} item>
                          <FormControl margin={'normal'} fullWidth>
                            <InputLabel id="labelCountry" shrink>
                              Hair Color
                            </InputLabel>
                            <Select
                              labelId={'lblType'}
                              disableUnderline
                              onChange={(e) => {
                                form.handleChange(e);
                                form.setFieldValue('statistics.hair_color', e.target.value);
                              }}
                              name="statistics.hair_color"
                              value={form.values.statistics?.hair_color}
                            >
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
                            <Select
                              labelId={'lblType'}
                              disableUnderline
                              onChange={(e) => {
                                form.handleChange(e);
                                form.setFieldValue('statistics.eye_color', e.target.value);
                              }}
                              name="statistics.eye_color"
                              value={form.values.statistics?.eye_color}
                            >
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
                            <Select
                              labelId={'lblType'}
                              disableUnderline
                              onChange={(e) => {
                                form.handleChange(e);
                                form.setFieldValue('statistics.complexion', e.target.value);
                              }}
                              name="statistics.complexion"
                              value={form.values.statistics?.complexion}
                            >
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
                            {data?.data.attributes.statistics.metric_system === 'Imperial/Metric' ? (
                              <Grid container spacing={2}>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={'Height'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      form.handleChange(e);
                                      cmtoIn(e, 'statistics.height_in');
                                    }}
                                    name="statistics.height_cm"
                                    value={form.values.statistics?.height_cm}
                                  />
                                </Grid>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={' '}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">in</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    onChange={(e) => {
                                      inToCm(e, 'statistics.height_cm');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.height_in"
                                    value={form.values.statistics?.height_in}
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
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      form.handleChange(e);
                                    }}
                                    name="statistics.height_cm"
                                    value={form.values.statistics?.height_cm}
                                  />
                                </Grid>
                              </Grid>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid xs={12} md={6} lg={2} item>
                          <FormControl margin={'normal'} fullWidth>
                            {form.values.statistics?.metric_system === 'Imperial/Metric' ? (
                              <Grid container spacing={2}>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={'Waist Size'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      cmtoIn(e, 'statistics.waist_in');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.waist_cm"
                                    value={form.values.statistics?.waist_cm}
                                  />
                                </Grid>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={' '}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">in</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    onChange={(e) => {
                                      inToCm(e, 'statistics.waist_cm');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.waist_in"
                                    value={form.values.statistics?.waist_in}
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
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      form.handleChange(e);
                                    }}
                                    name="statistics.waist_cm"
                                    value={form.values.statistics?.waist_cm}
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
                            {form.values.statistics?.metric_system === 'Imperial/Metric' ? (
                              <Grid container spacing={2}>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={'Hat Size'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      cmtoIn(e, 'statistics.hat_in');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.hat_cm"
                                    value={form.values.statistics?.hat_cm}
                                  />
                                </Grid>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={' '}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">in</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    onChange={(e) => {
                                      inToCm(e, 'statistics.hat_cm');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.hat_in"
                                    value={form.values.statistics?.hat_in}
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
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      form.handleChange(e);
                                    }}
                                    name="statistics.hat_cm"
                                    value={form.values.statistics?.hat_cm}
                                  />
                                </Grid>
                              </Grid>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid xs={12} md={6} lg={2} item>
                          <FormControl margin={'normal'} fullWidth>
                            {form.values.statistics?.metric_system === 'Imperial/Metric' ? (
                              <Grid container spacing={2}>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={'Weight'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      form.handleChange(e);
                                      kgToLb(e, 'statistics.weight_lb');
                                    }}
                                    name="statistics.weight_kg"
                                    value={form.values.statistics?.weight_kg}
                                  />
                                </Grid>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={' '}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">lb</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    onChange={(e) => {
                                      form.handleChange(e);
                                      lbToKg(e, 'statistics.weight_kg');
                                    }}
                                    name="statistics.weight_lb"
                                    value={form.values.statistics?.weight_lb}
                                  />
                                </Grid>
                              </Grid>
                            ) : (
                              <Grid container spacing={2}>
                                <Grid xs={12} md={12} item>
                                  <InputNumber
                                    label={'Weight'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      form.handleChange(e);
                                    }}
                                    name="statistics.weight_kg"
                                    value={form.values.statistics?.weight_kg}
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
                            <Select
                              labelId={'lblType'}
                              disableUnderline
                              onChange={(e) => {
                                form.handleChange(e);
                                form.setFieldValue('statistics.suit_size', e.target.value);
                              }}
                              name="statistics.suit_size"
                              value={form.values.statistics?.suit_size}
                            >
                              {kidClothing
                                .filter((c) => c.region == form.values.statistics?.region)
                                .map((i) => (
                                  <MenuItem key={i.value} value={i.value}>
                                    {i.value}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid xs={12} md={6} lg={2} item>
                          <FormControl margin={'normal'} fullWidth>
                            {form.values.statistics?.metric_system === 'Imperial/Metric' ? (
                              <Grid container spacing={2}>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={'Inside Leg'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      cmtoIn(e, 'statistics.inside_leg_in');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.inside_leg_cm"
                                    value={form.values.statistics?.inside_leg_cm}
                                  />
                                </Grid>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={' '}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">in</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    onChange={(e) => {
                                      inToCm(e, 'statistics.inside_leg_cm');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.inside_leg_in"
                                    value={form.values.statistics?.inside_leg_in}
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
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      form.handleChange(e);
                                    }}
                                    name="statistics.inside_leg_cm"
                                    value={form.values.statistics?.inside_leg_cm}
                                  />
                                </Grid>
                              </Grid>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid xs={12} md={6} lg={2} item>
                          <FormControl margin={'normal'} fullWidth>
                            {form.values.statistics?.metric_system === 'Imperial/Metric' ? (
                              <Grid container spacing={2}>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={'Outside Leg'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      cmtoIn(e, 'statistics.outside_leg_in');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.outside_leg_cm"
                                    value={form.values.statistics?.outside_leg_cm}
                                  />
                                </Grid>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={' '}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">in</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    onChange={(e) => {
                                      inToCm(e, 'statistics.outside_leg_cm');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.outside_leg_in"
                                    value={form.values.statistics?.outside_leg_in}
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
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      form.handleChange(e);
                                    }}
                                    name="statistics.outside_leg_cm"
                                    value={form.values.statistics?.outside_leg_cm}
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
                            <Select
                              labelId={'lblType'}
                              disableUnderline
                              onChange={(e) => {
                                form.handleChange(e);
                                form.setFieldValue('statistics.t_shirt_size', e.target.value);
                              }}
                              name="statistics.t_shirt_size"
                              value={form.values.statistics?.t_shirt_size}
                            >
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
                            <Select
                              labelId={'lblType'}
                              disableUnderline
                              onChange={(e) => {
                                form.handleChange(e);
                                form.setFieldValue('statistics.hair_color', e.target.value);
                              }}
                              name="statistics.hair_color"
                              value={form.values.statistics?.hair_color}
                            >
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
                              Eye Color
                            </InputLabel>
                            <Select
                              labelId={'lblType'}
                              disableUnderline
                              onChange={(e) => {
                                form.handleChange(e);
                                form.setFieldValue('statistics.eye_color', e.target.value);
                              }}
                              name="statistics.eye_color"
                              value={form.values.statistics?.eye_color}
                            >
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
                            <Select
                              labelId={'lblType'}
                              disableUnderline
                              onChange={(e) => {
                                form.handleChange(e);
                                form.setFieldValue('statistics.complexion', e.target.value);
                              }}
                              name="statistics.complexion"
                              value={form.values.statistics?.complexion}
                            >
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
                            {form.values.statistics?.metric_system === 'Imperial/Metric' ? (
                              <Grid container spacing={2}>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={'Height'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      form.handleChange(e);
                                      cmtoIn(e, 'statistics.height_in');
                                    }}
                                    name="statistics.height_cm"
                                    value={form.values.statistics?.height_cm}
                                  />
                                </Grid>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={' '}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">in</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    onChange={(e) => {
                                      inToCm(e, 'statistics.height_cm');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.height_in"
                                    value={form.values.statistics?.height_in}
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
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      form.handleChange(e);
                                    }}
                                    name="statistics.height_cm"
                                    value={form.values.statistics?.height_cm}
                                  />
                                </Grid>
                              </Grid>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid xs={12} md={6} lg={2} item>
                          <FormControl margin={'normal'} fullWidth>
                            {form.values.statistics?.metric_system === 'Imperial/Metric' ? (
                              <Grid container spacing={2}>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={'Waist'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      cmtoIn(e, 'statistics.waist_in');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.waist_cm"
                                    value={form.values.statistics?.waist_cm}
                                  />
                                </Grid>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={' '}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">in</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    onChange={(e) => {
                                      inToCm(e, 'statistics.waist_cm');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.waist_in"
                                    value={form.values.statistics?.waist_in}
                                  />
                                </Grid>
                              </Grid>
                            ) : (
                              <Grid container spacing={2}>
                                <Grid xs={12} md={12} item>
                                  <InputNumber
                                    label={'Waist'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      form.handleChange(e);
                                    }}
                                    name="statistics.waist_cm"
                                    value={form.values.statistics?.waist_cm}
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
                            {form.values.statistics?.gender === 'Female' ? (
                              <Select
                                labelId={'lblType'}
                                disableUnderline
                                onChange={(e) => {
                                  form.handleChange(e);
                                  form.setFieldValue('statistics.suit_size', e.target.value);
                                }}
                                name="statistics.suit_size"
                                value={form.values.statistics?.suit_size}
                              >
                                {femaleSuitSize
                                  .filter((c) => c.region === form.values.statistics?.region)
                                  .map((i) => (
                                    <MenuItem key={i.value} value={i.value}>
                                      {i.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            ) : (
                              <Select
                                labelId={'lblType'}
                                disableUnderline
                                onChange={(e) => {
                                  form.handleChange(e);
                                  form.setFieldValue('statistics.suit_size', e.target.value);
                                }}
                                name="statistics.suit_size"
                                value={form.values.statistics?.suit_size}
                              >
                                {suitSize
                                  .filter((c) => c.region === form.values.statistics?.region)
                                  .map((i) => (
                                    <MenuItem key={i.value} value={i.value}>
                                      {i.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid xs={12} md={6} lg={2} item>
                          <FormControl margin={'normal'} fullWidth>
                            {form.values.statistics?.metric_system === 'Imperial/Metric' ? (
                              <Grid container spacing={2}>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={'Weight'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      form.handleChange(e);
                                      kgToLb(e, 'statistics.weight_lb');
                                    }}
                                    name="statistics.weight_kg"
                                    value={form.values.statistics?.weight_kg}
                                  />
                                </Grid>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={' '}
                                    onChange={(e) => {
                                      form.handleChange(e);
                                      lbToKg(e, 'statistics.weight_kg');
                                    }}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">lb</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    name="statistics.weight_lb"
                                    value={form.values.statistics?.weight_lb}
                                  />
                                </Grid>
                              </Grid>
                            ) : (
                              <Grid container spacing={2}>
                                <Grid xs={12} md={12} item>
                                  <InputNumber
                                    label={'Weight'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={form.handleChange}
                                    name="statistics.weight_kg"
                                    value={form.values.statistics?.weight_kg}
                                  />
                                </Grid>
                              </Grid>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid xs={12} md={6} lg={2} item>
                          <FormControl margin={'normal'} fullWidth>
                            {form.values.statistics?.metric_system === 'Imperial/Metric' ? (
                              <Grid container spacing={2}>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={'Collar Size'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      cmtoIn(e, 'statistics.collar_size_in');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.collar_size_cm"
                                    value={form.values.statistics?.collar_size_cm}
                                  />
                                </Grid>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={' '}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">in</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    onChange={(e) => {
                                      inToCm(e, 'statistics.collar_size_cm');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.collar_size_in"
                                    value={form.values.statistics?.collar_size_in}
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
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={form.handleChange}
                                    name="statistics.collar_size_cm"
                                    value={form.values.statistics?.collar_size_cm}
                                  />
                                </Grid>
                              </Grid>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid xs={12} md={6} lg={2} item>
                          <FormControl margin={'normal'} fullWidth>
                            {form.values.statistics?.metric_system === 'Imperial/Metric' ? (
                              <Grid container spacing={2}>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={'Inside Leg'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      cmtoIn(e, 'statistics.inside_leg_in');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.inside_leg_cm"
                                    value={form.values.statistics?.inside_leg_cm}
                                  />
                                </Grid>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={' '}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">in</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    onChange={(e) => {
                                      inToCm(e, 'statistics.inside_leg_cm');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.inside_leg_in"
                                    value={form.values.statistics?.inside_leg_in}
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
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={form.handleChange}
                                    name="statistics.inside_leg_cm"
                                    value={form.values.statistics?.inside_leg_cm}
                                  />
                                </Grid>
                              </Grid>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid xs={12} md={6} lg={2} item>
                          <FormControl margin={'normal'} fullWidth>
                            {form.values.statistics?.metric_system === 'Imperial/Metric' ? (
                              <Grid container spacing={2}>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={'Outside Leg'}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => {
                                      cmtoIn(e, 'statistics.outside_leg_in');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.outside_leg_cm"
                                    value={form.values.statistics?.outside_leg_cm}
                                  />
                                </Grid>
                                <Grid xs={6} md={6} item>
                                  <InputNumber
                                    label={' '}
                                    InputProps={{
                                      disableUnderline: true,
                                      endAdornment: <InputAdornment position="end">in</InputAdornment>,
                                      inputProps: { min: 0 },
                                    }}
                                    onChange={(e) => {
                                      inToCm(e, 'statistics.outside_leg_cm');
                                      form.handleChange(e);
                                    }}
                                    name="statistics.outside_leg_in"
                                    value={form.values.statistics?.outside_leg_in}
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
                                    onChange={form.handleChange}
                                    name="statistics.outside_leg_cm"
                                    value={form.values.statistics?.outside_leg_cm}
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
                            {form.values.statistics?.adult_minor === 'Minor' ? (
                              <Select
                                labelId={'lblType'}
                                disableUnderline
                                onChange={(e) => {
                                  form.handleChange(e);
                                  form.setFieldValue('statistics.shoe_size', e.target.value);
                                }}
                                name="statistics.shoe_size"
                                value={form.values.statistics?.shoe_size}
                              >
                                {kidShoeSize
                                  .filter((c) => c.region === form.values.statistics?.region)
                                  .map((i) => (
                                    <MenuItem key={i.value} value={i.value}>
                                      {i.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            ) : form.values.statistics?.gender === 'Female' ? (
                              <Select
                                labelId={'lblType'}
                                disableUnderline
                                onChange={(e) => {
                                  form.handleChange(e);
                                  form.setFieldValue('statistics.shoe_size', e.target.value);
                                }}
                                name="statistics.shoe_size"
                                value={form.values.statistics?.shoe_size}
                              >
                                {femaleShoeSize
                                  .filter((c) => c.region === form.values.statistics?.region)
                                  .map((i) => (
                                    <MenuItem key={i.value} value={i.value}>
                                      {i.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            ) : (
                              <Select
                                labelId={'lblType'}
                                disableUnderline
                                onChange={(e) => {
                                  form.handleChange(e);
                                  form.setFieldValue('statistics.shoe_size', e.target.value);
                                }}
                                name="statistics.shoe_size"
                                value={form.values.statistics?.shoe_size}
                              >
                                {maleShoeSize
                                  .filter((c) => c.region === form.values.statistics?.region)
                                  .map((i) => (
                                    <MenuItem key={i.value} value={i.value}>
                                      {i.value}
                                    </MenuItem>
                                  ))}
                              </Select>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid xs={12} md={6} lg={2} item>
                          <FormControl margin={'normal'} fullWidth>
                            <InputLabel id="labelAgeType" shrink>
                              T-shirt Size
                            </InputLabel>
                            <Select
                              labelId={'lblType'}
                              disableUnderline
                              onChange={(e) => {
                                form.handleChange(e);
                                form.setFieldValue('statistics.t_shirt_size', e.target.value);
                              }}
                              name="statistics.t_shirt_size"
                              value={form.values.statistics?.t_shirt_size}
                            >
                              {tshirtSize.map((i) => (
                                <MenuItem key={i.key} value={i.value}>
                                  {i.value}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        {form.values.statistics?.gender === 'Male' ? (
                          <></>
                        ) : (
                          <Grid xs={12} md={6} lg={2} item>
                            <FormControl margin={'normal'} fullWidth>
                              {form.values.statistics?.metric_system === 'Imperial/Metric' ? (
                                <Grid container spacing={2}>
                                  <Grid xs={6} md={6} item>
                                    <InputNumber
                                      label={'Hip Size'}
                                      InputProps={{
                                        disableUnderline: true,
                                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                        inputProps: { min: 0 },
                                      }}
                                      InputLabelProps={{ shrink: true }}
                                      name="statistics.hip_size_cm"
                                      value={form.values.statistics?.hip_size_cm}
                                      onChange={(e) => {
                                        cmtoIn(e, 'statistics.hip_size_in');
                                        form.handleChange(e);
                                      }}
                                    />
                                  </Grid>
                                  <Grid xs={6} md={6} item>
                                    <InputNumber
                                      label={' '}
                                      InputProps={{
                                        disableUnderline: true,
                                        endAdornment: <InputAdornment position="end">in</InputAdornment>,
                                        inputProps: { min: 0 },
                                      }}
                                      name="statistics.hip_size_in"
                                      value={form.values.statistics?.hip_size_in}
                                      onChange={(e) => {
                                        inToCm(e, 'statistics.hip_size_cm');
                                        form.handleChange(e);
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
                                        inputProps: { min: 0 },
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
                          value={form.values.statistics?.ethnicity}
                          onChange={(e, newValue) => {
                            form.setFieldValue('statistics.ethnicity', newValue);
                            form.handleChange(e);
                          }}
                          renderTags={() => null}
                          renderInput={(params) => (
                            <Grid className={classes.autoCompleteGrid}>
                              <Link onClick={handleOpenEthnicityDialog}>View All</Link>
                              <TextField
                                {...params}
                                variant="outlined"
                                onChange={form.handleChange}
                                placeholder="Ethnicities"
                              />
                            </Grid>
                          )}
                        />
                      </div>

                      <Grid className={classes.chipContainer}>
                        {form.values.statistics?.ethnicity
                          ? form.values.statistics?.ethnicity?.map((v) => (
                              <Chip
                                key={v.name}
                                label={v.name}
                                onDelete={(e) => {
                                  onEthnicityChipDelete(v);
                                }}
                                onMouseDown={(event) => {
                                  event.stopPropagation();
                                }}
                              />
                            ))
                          : ''}
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
                          value={form.values.statistics?.other_talent_types}
                          onChange={(e, newValue) => {
                            form.setFieldValue('statistics.other_talent_types', newValue);
                            form.handleChange(e);
                          }}
                          renderTags={() => null}
                          renderInput={(params) => (
                            <Grid className={classes.autoCompleteGrid}>
                              <Link onClick={handleOpenTalentTypesDialog}>View All</Link>
                              <TextField {...params} variant="outlined" placeholder="Other Talent Types" />
                            </Grid>
                          )}
                        />
                      </div>
                      <Grid className={classes.chipContainer}>
                        {form.values.statistics?.other_talent_types?.map((v) => (
                          <Chip
                            key={v.value}
                            label={v.value}
                            onDelete={(e) => {
                              onTalentChipDelete(v.value);
                              form.handleChange(e);
                            }}
                          />
                        ))}
                      </Grid>
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
      <EthnicityDialog
        key={form.values.statistics?.ethnicity?.length}
        open={isEthnicityDialogOpen}
        onClose={handleCloseEthnicityDialog}
        selectedChips={form.values.statistics?.ethnicity}
        setSelectedChips={(field: any, value: any) => form.setFieldValue(field, value)}
      />
      <TalentTypesDialog
        open={isTalentTypesDialogOpen}
        onClose={handleCloseTalentTypesDialog}
        selectedChips={form.values.statistics?.other_talent_types}
        setSelectedChips={(e) => form.setFieldValue('statistics.other_talent_types', e)}
      />
      <ConfirmationDialog
        open={isConfirmationDialog}
        onClose={handleCloseConfirmationDialog}
        submitForm={() => form.handleSubmit()}
      />
      <Backdrop isLoading={isLoading || isUpdateLoading} />
    </Grid>
  );
};

export default Statistics;
