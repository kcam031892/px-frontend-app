import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
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
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { useStyles } from './NewProfileDialog.styles';
import { SearchIcon } from 'components/Icons';
import { Input } from 'themes/elements';
import { IProfileCreatePayload } from 'shared/interfaces/IProfile';
import { RepresentationType } from 'shared/enums/RepresentationType';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { useDebounce } from 'use-debounce';
import { agencyService } from 'shared/services/agencyService';

type Props = {
  open: boolean;
  onClose: () => void;
  hasFreelance: boolean;
};

const { searchAgency } = agencyService();
const NewProfileDialog: React.FC<Props> = ({ open, onClose, hasFreelance }) => {
  const classes = useStyles();
  const [isLargeDialog, setIsLargeDialog] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [queryValue] = useDebounce(query, 500);

  const toggleLargeDialog = () => setIsLargeDialog((curr) => !curr);

  const initialValues: IProfileCreatePayload = {
    representation_type: RepresentationType.AGENCY_REPRESENTATION,
    country: '',
    note: '',
    agency_name: '',
  };

  const createProfileValidationSchema: yup.SchemaOf<IProfileCreatePayload> = yup.object().shape({
    representation_type: yup.mixed<RepresentationType>().oneOf(Object.values(RepresentationType)).required(),
    country: yup.string().required(),
    note: yup.string(),
    agency_name: yup.string(),
  });

  const form: FormikProps<IProfileCreatePayload> = useFormik({
    initialValues,
    validationSchema: createProfileValidationSchema,
    onSubmit: () => console.log('hello'),
  });

  const { data: agencies } = searchAgency(form.values.country, queryValue);

  useEffect(() => {
    if (agencies && agencies.data.length > 5) {
      setIsLargeDialog(true);
    } else {
      setIsLargeDialog(false);
    }
  }, [agencies]);

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
                onChange={form.handleChange}
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
            )}
            {searchAgency.length > 0 && agencies && agencies.data.length > 0 && (
              <List className={classes.agencyList}>
                {agencies.data.map((agency) => (
                  <ListItem className={classes.agencyList__item}>
                    <ListItemAvatar>
                      <Avatar src={'https://picsum.photos/200/300'} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={agency.attributes.name}
                      secondary={`Talent Agency - ${agency.attributes.country} }`}
                    />
                    <ListItemSecondaryAction>
                      <Radio color="primary" />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}

            {form.values.representation_type === RepresentationType.FREELANCE && hasFreelance && (
              <Typography className={classes.freelanceError}>You can only have one freelance profile</Typography>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewProfileDialog;
