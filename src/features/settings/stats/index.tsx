import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { EthnicityItem, StatsOption, StatsState } from './statsTypes';
import { RootState } from '../../../app/rootReducer';
import { AgeType, SelectListItem, SizeUnit } from '../../../types';
import { EnumToMap } from '../../../utils/enumUtil';
import Button from '@material-ui/core/Button';
import {
  fetchMyStatsData,
  changeStatsItem,
  saveStatsData,
  resetEthnicityTemp,
  clearGroupSelectedItems,
  changeEthnicityItemStatus,
  applyEthnicityChange,
  removeEthnicityItem,
  resetArtistTypeTemp,
  changeArtistTypeStatus,
  applyArtistTypeChange,
  removeArtistType,
} from './statsSlice';
import { Gender } from '../../../types/commonTypes';
import { useConfirm } from 'material-ui-confirm';
import { Chip, Divider, Paper, Select, TextField } from '@material-ui/core';
import EthnicityDialog from './ethnicityDialog';
import ArtistTypeDialog from './artistTypeDialog';
import { AppState } from '../../../app/appSlice';
import { Close } from '@material-ui/icons';
import Search from '../../../components/icon/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentContainer: {
      padding: '0 144px',
      marginTop: '16px',
    },
    chipContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      padding: '0px 0px',
      margin: '16px 0px',
      boxShadow: 'none',
      borderRadius: '0',
    },
    chip: {
      margin: theme.spacing(1),
    },
    clickAbleText: {
      '& .MuiInput-input': {
        cursor: 'pointer',
        paddingLeft: '13px',
      },
    },
  }),
);

export default function Stats() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const [enthnicityOpen, setEthnicityOpen] = useState(false);
  const [artistTypeOpen, setArtistTypeOpen] = useState(false);
  const stats: StatsState = useSelector((state: RootState) => state.stats);

  const appState: AppState = useSelector((state: RootState) => state.app);

  useEffect(() => {
    dispatch(fetchMyStatsData(appState.memberId));
  }, [appState.memberId, dispatch]);

  const toChangeGender = (gender: string) => {
    if (stats.isDirty) {
      confirm({
        title: 'Warning',
        description:
          'There are some unsaved changes, you will loose these changes. Click "Save Changes" if you wish to keep them',
      }).then(() => {
        dispatch(
          fetchMyStatsData(appState.memberId, stats.model.region, gender, stats.model.ageType, stats.model.sizeUnit),
        );
      });
    } else {
      dispatch(
        fetchMyStatsData(appState.memberId, stats.model.region, gender, stats.model.ageType, stats.model.sizeUnit),
      );
    }
  };

  const toChangeAgeType = (ageType: number) => {
    if (stats.isDirty) {
      confirm({
        title: 'Warning',
        description:
          'There are some unsaved changes, you will loose these changes. Click "Save Changes" if you wish to keep them',
      }).then(() => {
        dispatch(
          fetchMyStatsData(
            appState.memberId,
            stats.model.region,
            stats.model.gender,
            ageType as AgeType,
            stats.model.sizeUnit,
          ),
        );
      });
    } else {
      dispatch(
        fetchMyStatsData(
          appState.memberId,
          stats.model.region,
          stats.model.gender,
          ageType as AgeType,
          stats.model.sizeUnit,
        ),
      );
    }
  };

  const toChangeStatsItem = (code: string, value: string) => {
    dispatch(changeStatsItem({ code, value }));
  };

  const toChangeSizeUnit = (unit: string) => {
    if (stats.isDirty) {
      confirm({
        title: 'Warning',
        description:
          'There are some unsaved changes, you will loose these changes. Click "Save Changes" if you wish to keep them',
      }).then(() => {
        dispatch(
          fetchMyStatsData(
            appState.memberId,
            stats.model.region,
            stats.model.gender,
            stats.model.ageType,
            unit as SizeUnit,
          ),
        );
      });
    } else {
      dispatch(
        fetchMyStatsData(
          appState.memberId,
          stats.model.region,
          stats.model.gender,
          stats.model.ageType,
          unit as SizeUnit,
        ),
      );
    }
  };

  const toChangeRegion = (countryCode: string) => {
    if (stats.isDirty) {
      confirm({
        title: 'Warning',
        description:
          'There are some unsaved changes, you will loose these changes. Click "Save Changes" if you wish to keep them',
      }).then(() => {
        dispatch(
          fetchMyStatsData(
            appState.memberId,
            countryCode,
            stats.model.gender,
            stats.model.ageType,
            stats.model.sizeUnit,
          ),
        );
      });
    } else {
      dispatch(
        fetchMyStatsData(appState.memberId, countryCode, stats.model.gender, stats.model.ageType, stats.model.sizeUnit),
      );
    }
  };

  const handleSaveChanges = () => {
    dispatch(saveStatsData(stats.model));
  };

  const handleOpenEthnicityDialog = () => {
    dispatch(resetEthnicityTemp());
    setEthnicityOpen(true);
  };

  const handleOpenArtistTypeDialog = () => {
    dispatch(resetArtistTypeTemp());
    setArtistTypeOpen(true);
  };

  const handleClearEthnicityGroup = (groupName: string) => {
    dispatch(clearGroupSelectedItems(groupName));
  };

  const handleApplyEthnicityChange = () => {
    dispatch(applyEthnicityChange());
    setEthnicityOpen(false);
  };

  const handleApplyArtistTypeChange = () => {
    dispatch(applyArtistTypeChange());
    setArtistTypeOpen(false);
  };

  const handleChangeEthnicityItemStatus = (checked: boolean, group: string, itemCode: string) => {
    dispatch(changeEthnicityItemStatus({ checked, group, itemCode }));
  };

  const handleChangeArtistTypeItemStatus = (artistTypeCode: string, checked: boolean) => {
    dispatch(changeArtistTypeStatus({ artistTypeCode, checked }));
  };

  const handleRemoveEthnicityItem = (itemCode: string) => {
    dispatch(removeEthnicityItem(itemCode));
  };

  const handleRemoveArtistTypeItem = (value: string) => {
    dispatch(removeArtistType(value));
  };

  const selectedEthnicities = stats.model.ethnicities.flatMap((x) => x.items.filter((y) => y.selected));
  const selectedArtistTypes = stats.model.artistTypes.filter((x) => x.selected);

  return (
    <Box className={classes.contentContainer}>
      <Grid container spacing={2}>
        <Grid xs={12} item>
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
                      labelId={'labelCountry'}
                      disableUnderline
                      value={stats.model.region}
                      onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                        toChangeRegion(event.target.value as string);
                      }}
                    >
                      <MenuItem value={'US'}>United States</MenuItem>
                      <MenuItem value={'AU'}>Australian</MenuItem>
                      <MenuItem value={'NZ'}>Newzeland</MenuItem>
                      <MenuItem value={'EU'}>Europe</MenuItem>
                      <MenuItem value={'UK'}>United Kingdom</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelAgeType" shrink>
                      Adult/Minor
                    </InputLabel>
                    <Select
                      labelId={'labelAgeType'}
                      disableUnderline
                      value={stats.model.ageType}
                      onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                        toChangeAgeType(event.target.value as number);
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
                <Grid xs={12} md={6} lg={3} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelSizeUnit" shrink>
                      Imperial/ Metric
                    </InputLabel>
                    <Select
                      labelId={'labelSizeUnit'}
                      disableUnderline
                      value={stats.model.sizeUnit.toString()}
                      onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                        toChangeSizeUnit(event.target.value as string);
                      }}
                    >
                      {EnumToMap(SizeUnit).map((item: SelectListItem) => {
                        return (
                          <MenuItem key={item.value} value={item.value}>
                            {item.value}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={3} item>
                  <FormControl margin={'normal'} fullWidth>
                    <InputLabel id="labelGender" shrink>
                      Gender
                    </InputLabel>
                    <Select
                      labelId={'labelGender'}
                      disableUnderline
                      value={stats.model.gender}
                      onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                        toChangeGender(event.target.value as string);
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
                  </FormControl>
                </Grid>
              </Grid>

              {/* <FormControlLabel control={<Checkbox name="saveSettings" onChange={(event: React.ChangeEvent<HTMLInputElement>) => { }} />}
                            label="Save these settings" /> */}
            </CardContent>
          </Card>
        </Grid>
        {stats.model.memberId.length > 0 && (
          <Grid xs={12} item>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Profile
                </Typography>
                <Grid container spacing={2}>
                  {stats.model.options.map((option: StatsOption) => (
                    <Grid xs={12} md={3} item key={option.code}>
                      <FormControl fullWidth margin={'dense'}>
                        <InputLabel id={'label' + option.code.replace(/[\s-]/, '')} shrink>
                          {option.text}
                        </InputLabel>
                        <Select
                          labelId={'label' + option.code.replace(/[\s-]/, '')}
                          disableUnderline
                          value={option.selectedValue}
                          onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                            toChangeStatsItem(option.code, event.target.value as string);
                          }}
                        >
                          <MenuItem value="" style={{ color: 'red' }}>
                            None
                          </MenuItem>
                          {option.items.map((item: SelectListItem) => {
                            return (
                              <MenuItem key={item.value} value={item.value}>
                                {item.text}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                  ))}
                </Grid>
                <Divider style={{ margin: '24px 0px' }} />
                <Grid container spacing={2}>
                  <Grid xs={12} md={6} item>
                    <TextField
                      label={'Ethnicities'}
                      value={'Click to select all that apply'}
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: <Search />,
                        readOnly: true,
                      }}
                      onClick={() => handleOpenEthnicityDialog()}
                      className={classes.clickAbleText}
                    />
                    {selectedEthnicities && selectedEthnicities.length > 0 && (
                      <Paper component="ul" className={classes.chipContainer}>
                        {selectedEthnicities &&
                          selectedEthnicities.map((item: EthnicityItem) => {
                            return (
                              <Chip
                                key={item.code}
                                label={item.text}
                                deleteIcon={<Close style={{ color: 'rgba(41, 98, 255, 0.4)' }} />}
                                variant="outlined"
                                onDelete={() => handleRemoveEthnicityItem(item.code)}
                                className={classes.chip}
                              />
                            );
                          })}
                      </Paper>
                    )}
                  </Grid>
                  <Grid xs={12} md={6} item style={{ position: 'relative' }}>
                    <TextField
                      label={'Other Talent Types'}
                      value={'Click to select all that apply'}
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: <Search />,
                        readOnly: true,
                      }}
                      onClick={() => handleOpenArtistTypeDialog()}
                      className={classes.clickAbleText}
                      style={{ cursor: 'pointer' }}
                    />
                    <InputLabel shrink style={{ position: 'absolute', top: '8px', right: '10px' }}>
                      Primary Type: {stats.model.primaryArtistTypeName}
                    </InputLabel>
                    {selectedArtistTypes && selectedArtistTypes.length > 0 && (
                      <Paper component="ul" className={classes.chipContainer}>
                        {selectedArtistTypes &&
                          selectedArtistTypes.map((item: SelectListItem) => {
                            return (
                              <Chip
                                key={item.value}
                                label={item.text}
                                deleteIcon={<Close style={{ color: 'rgba(41, 98, 255, 0.4)' }} />}
                                variant="outlined"
                                onDelete={() => handleRemoveArtistTypeItem(item.value)}
                                className={classes.chip}
                              />
                            );
                          })}
                      </Paper>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <Box mt={3}>
        <Button variant="contained" disableElevation onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Box>

      <EthnicityDialog
        open={enthnicityOpen}
        onClose={() => setEthnicityOpen(false)}
        ethnicities={stats.model.ethnicitiesTemp}
        onApplyChanges={handleApplyEthnicityChange}
        onChangeItemStatus={handleChangeEthnicityItemStatus}
        onClearGroupItems={handleClearEthnicityGroup}
      ></EthnicityDialog>
      <ArtistTypeDialog
        open={artistTypeOpen}
        onClose={() => setArtistTypeOpen(false)}
        artistTypes={stats.model.artistTypesTemp}
        onApplyChanges={handleApplyArtistTypeChange}
        onChangeItemStatus={handleChangeArtistTypeItemStatus}
      />
    </Box>
  );
}
