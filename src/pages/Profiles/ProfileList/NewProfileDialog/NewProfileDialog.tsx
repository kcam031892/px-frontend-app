import {
  Avatar,
  Box,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Radio,
  Select,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { useStyles } from './NewProfileDialog.styles';
import { SearchIcon } from 'components/Icons';
import { Button, Input } from 'themes/elements';
import { IProfile, IProfileCreatePayload } from 'shared/interfaces/IProfile';
import { RepresentationType } from 'shared/enums/RepresentationType';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { useDebounce } from 'use-debounce';
import { agencyService } from 'shared/services/agencyService';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { IAgency } from 'shared/interfaces/utils/IAgency';
import { profileService } from 'shared/services/profileService';
import { useQueryClient } from 'react-query';

const VISIBLE_AGENCY_COUNT = 3;
const VISIBLE_AGENCY_COUNT_LARGE = 6;

type Props = {
  open: boolean;
  onClose: () => void;
  hasFreelance: boolean;
  profiles: IProfile[];
};

const { searchAgency } = agencyService();
const { createProfile } = profileService();
const NewProfileDialog: React.FC<Props> = ({ open, onClose, hasFreelance, profiles }) => {
  const classes = useStyles();
  const { mutate, isLoading: isMutationLoading } = createProfile();
  const queryClient = useQueryClient();
  const [isLargeDialog, setIsLargeDialog] = useState<boolean>(false);
  const [selectedAgency, setSelectedAgency] = useState<IAgency | undefined>(undefined);
  const [query, setQuery] = useState<string>('');
  const [queryValue] = useDebounce(query, 500);

  const toggleLargeDialog = () => setIsLargeDialog((curr) => !curr);

  const initialValues: IProfileCreatePayload = {
    representation_type: RepresentationType.AGENCY_REPRESENTATION,
    country: 'United State',
    note: '',
    agency_id: '',
    confirmed_agreement: false,
  };

  const createProfileValidationSchema: yup.SchemaOf<IProfileCreatePayload> = yup.object().shape({
    representation_type: yup.mixed<RepresentationType>().oneOf(Object.values(RepresentationType)).required(),
    country: yup.string().required(),
    note: yup.string(),
    agency_id: yup.string(),
    confirmed_agreement: yup.boolean().default(false),
  });

  const handleSubmit = (values: IProfileCreatePayload) => {
    mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries('profiles');
        onClose();
      },
      onError: (error) => {
        alert(error);
      },
    });
  };

  const form: FormikProps<IProfileCreatePayload> = useFormik({
    initialValues,
    validationSchema: createProfileValidationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const { data: agencies, isLoading: isAgencyLoading } = searchAgency(form.values.country, queryValue);

  const handleRepresentationChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setQuery('');
    form.setFieldValue('representation_type', e.target.value);
    form.setFieldValue('agency_id', '');
    setSelectedAgency(undefined);
    setIsLargeDialog(false);
  };

  const handleAgencyIdChange = (agency: IAgency) => {
    setSelectedAgency(agency);
    // form.setFieldValue('agency_id', agencyId);
  };

  const handleContinue = () => {
    if (selectedAgency) {
      form.setFieldValue('agency_id', selectedAgency.id);
      setIsLargeDialog(true);
    }
  };

  const handleClearAgency = () => {
    form.setFieldValue('agency_id', '');
    setSelectedAgency(undefined);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      classes={{ paper: !isLargeDialog ? classes.dialogPaper : classes.dialogPaperLarge }}
    >
      <DialogTitle id="form-dialog-title" className={classes.dialog__header}>
        <span>Add New Profile</span>
        <Box>
          <IconButton onClick={toggleLargeDialog}>
            <UnfoldMoreIcon style={{ fontSize: 14 }} />
          </IconButton>
          <IconButton onClick={() => onClose()}>
            <ClearIcon style={{ fontSize: 14 }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl margin={'normal'} fullWidth>
              <InputLabel id="lblType" shrink>
                Representation Type
              </InputLabel>
              <Select
                labelId={'lblType'}
                disableUnderline
                value={form.values.representation_type}
                name="representation_type"
                onChange={handleRepresentationChange}
              >
                <MenuItem
                  key={RepresentationType.AGENCY_REPRESENTATION}
                  value={RepresentationType.AGENCY_REPRESENTATION}
                >
                  Agency Representation
                </MenuItem>
                <MenuItem key={RepresentationType.FREELANCE} value={RepresentationType.FREELANCE}>
                  Freelance
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl margin={'normal'} fullWidth>
              <InputLabel id="lblCountry" shrink>
                Select Country
              </InputLabel>
              <Select
                labelId={'lblCountry'}
                disableUnderline
                value={form.values.country}
                name="country"
                onChange={form.handleChange}
              >
                <MenuItem key={'Australia'} value={'Australia'}>
                  Australia
                </MenuItem>
                <MenuItem key={'United State'} value={'United State'}>
                  United States
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {form.values.representation_type === RepresentationType.AGENCY_REPRESENTATION && (
              <Box style={{ position: 'relative' }}>
                <Input
                  label={'Select Agency/Manager'}
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
                {isAgencyLoading && (
                  <Box>
                    <LinearProgress />
                  </Box>
                )}

                {agencies && agencies.data.length > VISIBLE_AGENCY_COUNT && (
                  <Box mt={1}>
                    <Typography style={{ fontSize: 12, color: '#707372' }}>
                      {agencies.data.length} results found. Not all results have been shown, please refine your search
                      criteria.
                    </Typography>
                  </Box>
                )}

                {agencies && agencies.data.length <= 0 && (
                  <Box mt={1}>
                    <Typography style={{ fontSize: 12, color: '#707372' }}>No Results..</Typography>
                  </Box>
                )}

                {!form.values.agency_id && searchAgency.length > 0 && agencies && agencies.data.length > 0 && (
                  <Grid item xs={12}>
                    <List className={classes.agencyList}>
                      {agencies.data
                        .slice(0, isLargeDialog ? VISIBLE_AGENCY_COUNT_LARGE : VISIBLE_AGENCY_COUNT)
                        .map((agency) => (
                          <ListItem className={classes.agencyList__item} key={agency.id}>
                            <ListItemAvatar>
                              <Avatar src={'https://picsum.photos/200/300'} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={agency.attributes.name}
                              secondary={`Talent Agency - ${agency.attributes.country}`}
                            />
                            <ListItemSecondaryAction>
                              <Radio
                                color="primary"
                                checked={selectedAgency?.id === agency.id}
                                disabled={
                                  profiles.filter((profile) => profile.attributes.agency_id === agency.id).length > 0
                                }
                                onChange={() => handleAgencyIdChange(agency.attributes)}
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                    </List>
                  </Grid>
                )}
              </Box>
            )}

            {!!form.values.agency_id && (
              <Grid item xs={12}>
                <FormControl
                  margin={'normal'}
                  fullWidth
                  disabled={form.values.representation_type === RepresentationType.FREELANCE}
                >
                  <InputLabel id="lblCountry" shrink>
                    Agency / Manager
                  </InputLabel>
                </FormControl>

                <List className={classes.agencyList}>
                  <ListItem className={classes.agencyList__item}>
                    <ListItemAvatar>
                      <Avatar src="/GooglePlay.png" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={selectedAgency?.name}
                      secondary={`Talent Agency - ${selectedAgency?.name}, ${selectedAgency?.country}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => handleClearAgency()}>
                        <BackspaceIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>

                <Input
                  label={'Addintional Note to Agency/Manager'}
                  placeholder={'Optional'}
                  fullWidth
                  margin={'normal'}
                  value={form.values.note}
                  name="note"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  InputLabelProps={{ shrink: true }}
                  onChange={form.handleChange}
                />

                <FormControlLabel
                  style={{ alignItems: 'baseline' }}
                  control={
                    <Checkbox
                      name="confirmPolicy"
                      color="primary"
                      style={{ fontSize: 12 }}
                      value={form.values.confirmed_agreement}
                      onChange={form.handleChange}
                    />
                  }
                  label="I confirm that I am currently represented by this Agency/Manager and understand I may be removed from the system for submitting profiles to an agency that I am not officially represented by."
                />
              </Grid>
            )}

            {form.values.representation_type === RepresentationType.FREELANCE && hasFreelance && (
              <Typography className={classes.freelanceError}>You can only have one freelance profile</Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {!form.values.agency_id && form.values.representation_type === RepresentationType.AGENCY_REPRESENTATION && (
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={handleContinue}
            disabled={!selectedAgency}
          >
            Continue
          </Button>
        )}
        {form.values.agency_id ||
          (form.values.representation_type === RepresentationType.FREELANCE && (
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={() => form.handleSubmit()}
              disabled={
                (form.values.representation_type === RepresentationType.FREELANCE && hasFreelance) || isMutationLoading
              }
            >
              {isMutationLoading ? 'Submiting...' : 'Submit'}
            </Button>
          ))}
      </DialogActions>
    </Dialog>
  );
};

export default NewProfileDialog;
