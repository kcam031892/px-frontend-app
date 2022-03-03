import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import React, { useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { useStyles } from './NewProfileDialog.styles';

type Props = {
  open: boolean;
  onClose: () => void;
};
const NewProfileDialog: React.FC<Props> = ({ open, onClose }) => {
  const [isLargeDialog, setIsLargeDialog] = useState<boolean>(false);
  const toggleLargeDialog = () => setIsLargeDialog((curr) => !curr);
  const classes = useStyles();
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
              <Select labelId={'lblType'} disableUnderline>
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
            <FormControl margin={'normal'} fullWidth>
              <InputLabel id="lblCountry" shrink>
                Select Country
              </InputLabel>
              <Select labelId={'lblCountry'} disableUnderline>
                <MenuItem key={'AGNC'} value={'AGNC'}>
                  Australia
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NewProfileDialog;
