import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { SearchIcon } from '../../../components/Icons';
import { Country } from '../../../types';
import { AgencySupportedCountries } from '../../../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { searchAgency } from '../profileSlice';
import { AgencySerachViewModel, ProfileState } from '../profileTypes';
import { RootState } from '../../../app/rootReducer';
import _ from 'lodash';
import BackspaceIcon from '@material-ui/icons/Backspace';
import ClearIcon from '@material-ui/icons/Clear';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

export interface NewProfileDialogProps {
  open: boolean;
  onClose: () => void;
  hasFreelance: boolean;
  existedAgencyIds: number[];
  onSubmit?: (agencyId: number, note: string) => void;
}

interface NewProfileDialogState {
  representationType: string;
  selectedCountryCode: string;
  agencyName: string;
  note: string;
  confirm: boolean;
  selectedAgencyId?: number | undefined;
  agency?: AgencySerachViewModel | undefined;
  submitView: boolean;
  largeDialog: boolean;
}

const useStyles = makeStyles({
  list: {
    width: '343px',
    '& .MuiListItem-container': {
      padding: '10px 32px',
    },
  },
  arrowIcon: {
    fontSize: '1rem',
  },
  hidden: {
    display: 'none',
  },
  freelanceError: {
    background: 'rgba(244, 67, 54, 0.08)',
    borderRadius: '6px',
    color: '#F44336',
    fontWeight: 700,
    fontSize: 14,
    width: '100%',
    padding: '10px 16px',
  },
  dialogHeader: {
    '& .MuiTypography-root': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  agencyItem: {
    '& .MuiListItemText-primary': {
      color: '#25282A',
      fontSize: '14px',
      fontWeight: 700,
    },
    '& .MuiListItemText-secondary': {
      color: '#707372',
      fontSize: '12px',
    },
  },
  dialogBackDrop: {
    backgroundColor: 'transparent',
  },
  dialogPaper: {
    position: 'absolute',
    right: 16,
    top: 160,
    width: 512,
  },
  dialogPaperLarge: {
    position: 'absolute',
    right: 16,
    top: 60,
    width: 512,
    height: `calc(100% - 110px)`,
  },
});

const visibleAgencyCount = 3;
const visibleAgencyCountLarge = 6;

function NewProfileDialog(props: NewProfileDialogProps) {
  const classes = useStyles();
  const [dialogState, setDialogState] = useState<NewProfileDialogState>({
    representationType: 'AGNC',
    selectedCountryCode: 'US',
    agencyName: '',
    note: '',
    confirm: false,
    submitView: true,
    largeDialog: false,
  });

  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const profile: ProfileState = useSelector((state: RootState) => state.profile);

  const dispatch = useDispatch();
  const handleCountryChange = (countryCode: string) => {
    handleAgencySearch(dialogState.agencyName, countryCode);
    setDialogState({ ...dialogState, selectedCountryCode: countryCode });
  };

  const hanldeAgencyNameChange = (agencyName: string) => {
    handleAgencySearch(agencyName, dialogState.selectedCountryCode);
    setDialogState({ ...dialogState, agencyName: agencyName });
  };

  const handleAgencySearch = (agencyName: string, countryCode: string) => {
    if (agencyName.length > 1) {
      dispatch(searchAgency(agencyName, countryCode));
    }
  };

  const handleContinue = () => {
    if (dialogState.selectedAgencyId !== null) {
      const selectedAgency = profile.agencies?.find((x) => x.agencyId === dialogState.selectedAgencyId);
      setDialogState({ ...dialogState, agency: selectedAgency });
    }
  };

  const handleSubmit = () => {
    if (props.onSubmit) {
      props.onSubmit(dialogState.selectedAgencyId || 0, dialogState.note);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth={'sm'}
      classes={{
        paper: !dialogState.largeDialog ? classes.dialogPaper : classes.dialogPaperLarge,
      }}
      BackdropProps={{
        classes: {
          root: classes.dialogBackDrop,
        },
      }}
    >
      <DialogTitle id="form-dialog-title" className={classes.dialogHeader}>
        <span>Add New Profile</span>
        <Box>
          <IconButton onClick={() => setDialogState({ ...dialogState, largeDialog: !dialogState.largeDialog })}>
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
                error={dialogState.representationType === 'FREE' && props.hasFreelance}
                value={dialogState.representationType}
                disableUnderline
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setDialogState({ ...dialogState, representationType: event.target.value as string });
                }}
              >
                <MenuItem key={'AGNC'} value={'AGNC'}>
                  Agency Representation
                </MenuItem>
                <MenuItem key={'FREE'} value={'FREE'}>
                  Freelance
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl margin={'normal'} fullWidth disabled={dialogState.representationType === 'FREE'}>
              <InputLabel id="lblCountry" shrink>
                Select Country
              </InputLabel>
              <Select
                labelId={'lblCountry'}
                value={dialogState.selectedCountryCode}
                disableUnderline
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  handleCountryChange(event.target.value as string);
                }}
              >
                {AgencySupportedCountries.map((item: Country) => {
                  return (
                    <MenuItem key={item.code} value={item.code}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          {dialogState.representationType !== 'FREE' && (
            <Grid item xs={12}>
              <TextField
                label={'Select Agency/Manager'}
                fullWidth
                margin={'normal'}
                value={dialogState.agencyName}
                InputProps={{
                  disableUnderline: true,
                  endAdornment:
                    dialogState.agencyName.length > 1 ? (
                      <InputAdornment
                        position="end"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setDialogState({ ...dialogState, agencyName: '' })}
                      >
                        <ClearIcon width="24" height="24" viewBox="0 0 24 24" />
                      </InputAdornment>
                    ) : (
                      ''
                    ),
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon width="24" height="24" viewBox="0 0 24 24" />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => {
                  hanldeAgencyNameChange(event.target.value);
                }}
              />
            </Grid>
          )}
          {!dialogState.agency && (
            <Grid item xs={12}>
              {dialogState.agencyName.length > 1 && (profile.agencies || []).length > visibleAgencyCount && (
                <Typography style={{ fontSize: 12, color: '#707372' }}>
                  {(profile.agencies || []).length} results found. Not all results have been shown, please refine your
                  search criteria
                </Typography>
              )}
              {dialogState.agencyName.length > 1 && (profile.agencies || []).length > 0 && (
                <List style={{ border: '1px solid #E1E1E1', borderRadius: 6, marginTop: 16 }}>
                  {_(profile.agencies || [])
                    .take(dialogState.largeDialog ? visibleAgencyCountLarge : visibleAgencyCount)
                    .value()
                    .map((x, index) => {
                      const imageUrl = `${process.env.REACT_APP_IMAGE_URL}/${x.agencyLogo}`;
                      return (
                        <>
                          <ListItem className={classes.agencyItem} key={x.agencyId}>
                            <ListItemAvatar>
                              <Avatar alt={x.agencyName} src={imageUrl} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={x.agencyName}
                              secondary={`Talent Agency - ${x.stateName}, ${x.countryName}`}
                            />
                            <ListItemSecondaryAction>
                              <Radio
                                color="primary"
                                disabled={props.existedAgencyIds.findIndex((y) => y === x.agencyId) > -1}
                                checked={dialogState.selectedAgencyId === x.agencyId}
                                onChange={() =>
                                  setDialogState({
                                    ...dialogState,
                                    selectedAgencyId: x.agencyId,
                                  })
                                }
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                          {(profile.agencies || []).length > 1 &&
                          index < (dialogState.largeDialog ? visibleAgencyCountLarge : visibleAgencyCount) - 1 ? (
                            <Divider light />
                          ) : (
                            ''
                          )}
                        </>
                      );
                    })}
                </List>
              )}

              {dialogState.representationType === 'FREE' && props.hasFreelance && (
                <Typography className={classes.freelanceError}>You can only have one freelance profile</Typography>
              )}
            </Grid>
          )}
          {dialogState.agency && (
            <Grid item xs={12}>
              <FormControl margin={'normal'} fullWidth disabled={dialogState.representationType === 'FREE'}>
                <InputLabel id="lblCountry" shrink>
                  Agency / Manager
                </InputLabel>
              </FormControl>
              <List style={{ border: '1px solid #E1E1E1', borderRadius: 6, marginTop: 16 }}>
                <ListItem className={classes.agencyItem}>
                  <ListItemAvatar>
                    <Avatar alt={dialogState.agency.agencyName} src="/GooglePlay.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={dialogState.agency.agencyName}
                    secondary={`Talent Agency - ${dialogState.agency.stateName}, ${dialogState.agency.countryName}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => setDialogState({ ...dialogState, agency: undefined, note: '' })}>
                      <BackspaceIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              <TextField
                label={'Addintional Note to Agency/Manager'}
                placeholder={'Optional'}
                fullWidth
                margin={'normal'}
                value={dialogState.note}
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{ shrink: true }}
                onChange={(event) => {
                  setDialogState({ ...dialogState, note: event.target.value as string });
                }}
              />
              <FormControlLabel
                style={{ alignItems: 'baseline' }}
                control={
                  <Checkbox
                    name="confirmPolicy"
                    value={dialogState.confirm}
                    color="primary"
                    style={{ fontSize: 12 }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setDialogState({ ...dialogState, confirm: !dialogState.confirm });
                    }}
                  />
                }
                label="I confirm that I am currently represented by this Agency/Manager and understand I may be removed from the system for submitting profiles to an agency that I am not officially represented by."
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        {!dialogState.agency && (
          <Button
            color="primary"
            variant="contained"
            disableElevation
            disabled={
              !((dialogState.selectedAgencyId || 0) > 0) ||
              (dialogState.representationType === 'FREE' && props.hasFreelance)
            }
            onClick={() => handleContinue()}
          >
            Continue
          </Button>
        )}
        {dialogState.agency && (
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={() => handleSubmit()}
            disabled={dialogState.representationType === 'FREE' && props.hasFreelance}
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default NewProfileDialog;
