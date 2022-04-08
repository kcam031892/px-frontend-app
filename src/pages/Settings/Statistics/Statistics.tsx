import React, { useState } from 'react';
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
  Box,
  Button,
  InputAdornment,
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

const Statistics = () => {
  const classes = useStyles();
  const { data } = getStatistics();

  const [selectValue, setSelectValue] = useState('');
  const [query, setQuery] = useState<string>('');
  const [queryValue] = useDebounce(query, 500);

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
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid xs={6} md={6} item>
                        <InputNumber label={' '} InputProps={{ disableUnderline: true }} />
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
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid xs={6} md={6} item>
                        <Input label={' '} InputProps={{ disableUnderline: true }} />
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container className={classes.profileItemsContainer} spacing={2}>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Grid container spacing={2}>
                      <Grid xs={6} md={6} item>
                        <Input
                          label={'Suit Size'}
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid xs={6} md={6} item>
                        <Input label={' '} InputProps={{ disableUnderline: true }} />
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Grid container spacing={2}>
                      <Grid xs={6} md={6} item>
                        <Input
                          label={'Chest Size'}
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid xs={6} md={6} item>
                        <Input label={' '} InputProps={{ disableUnderline: true }} />
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Grid container spacing={2}>
                      <Grid xs={6} md={6} item>
                        <Input
                          label={'Collar Size'}
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid xs={6} md={6} item>
                        <Input label={' '} InputProps={{ disableUnderline: true }} />
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Grid container spacing={2}>
                      <Grid xs={6} md={6} item>
                        <Input
                          label={'Inside Leg'}
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid xs={6} md={6} item>
                        <Input label={' '} InputProps={{ disableUnderline: true }} />
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Grid container spacing={2}>
                      <Grid xs={6} md={6} item>
                        <Input
                          label={'Outside Leg'}
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid xs={6} md={6} item>
                        <Input label={' '} InputProps={{ disableUnderline: true }} />
                      </Grid>
                    </Grid>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container className={classes.profileItemsContainer} spacing={2}>
                <Grid xs={12} md={6} lg={2} item>
                  <FormControl margin={'normal'} fullWidth>
                    <Grid container spacing={2}>
                      <Grid xs={6} md={6} item>
                        <Input
                          label={'Shoe Size'}
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid xs={6} md={6} item>
                        <Input label={' '} InputProps={{ disableUnderline: true }} />
                      </Grid>
                    </Grid>
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
              <Grid spacing={2} container>
                <Grid xs={12} md={6} lg={6} item>
                  <Input
                    label={'Ethnicities'}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    fullWidth
                    margin={'normal'}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <InputAdornment position="end" style={{ cursor: 'pointer' }} onClick={() => setQuery('')}>
                          <ClearIcon width="24" height="24" viewBox="0 0 24 24" />
                        </InputAdornment>
                      ),
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon width="24" height="24" viewBox="0 0 24 24" />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <Button id="viewAllEthnicities" variant="contained" color="default" disableElevation>
                    View All
                  </Button>
                </Grid>
                <Grid xs={12} md={6} lg={6} item>
                  <Input label={'Other Talent Types'} fullWidth margin={'normal'} InputLabelProps={{ shrink: true }} />
                  <Button id="viewAllOtherTalentTypes" variant="contained" color="default" disableElevation>
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
