import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Chip,
} from '@material-ui/core';
import React, { useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import Done from '@material-ui/icons/Done';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ethnicity from 'data/Ethnicities.json';
import { useStyles } from './ConfirmationDialog.styles';
import { boolean } from 'yup/lib/locale';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ProfeciencyDialog: React.FC<Props> = ({ open, onClose }) => {
  //   const [selected, setSelected] = React.useState(true);
  const [isLargeDialog, setIsLargeDialog] = useState<boolean>(false);
  const toggleLargeDialog = () => setIsLargeDialog((curr) => !curr);
  const classes = useStyles();

  // const onChipSelect = (name: any) => () => {
  //   setSelected((value) => value.filter((v) => v.name !== name));
  // };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
      classes={{ paper: !isLargeDialog ? classes.dialogPaper : classes.dialogPaperLarge }}
    >
      <DialogTitle id="form-dialog-title" className={classes.dialog__header}>
        <span>Warning</span>
        <Box>
          <IconButton onClick={toggleLargeDialog}>
            <UnfoldMoreIcon style={{ fontSize: 14 }} />
          </IconButton>
          <IconButton onClick={() => onClose()}>
            <ClearIcon style={{ fontSize: 14 }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.dialogContentContainer}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            There are some unsaved changes, you will lose these changes. Click "Save Changes" if you wish to keep them.
          </Grid>
          <Grid item xs={12} md={12} className={classes.buttonContainer}>
            <Button variant="contained" disableElevation>
              Save Changes
            </Button>
            <Button onClick={() => onClose()} disableElevation>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProfeciencyDialog;
