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
import { useStyles } from './EthnicityDialog.styles';
import { boolean } from 'yup/lib/locale';

type Props = {
  open: boolean;
  onClose: () => void;
};

const EthnicityDialog: React.FC<Props> = ({ open, onClose }) => {
  const [allChips, setAllChips] = React.useState(ethnicity);
  const [selected, setSelected] = React.useState(new Set());
  console.log(ethnicity);

  const [isLargeDialog, setIsLargeDialog] = useState<boolean>(false);
  const toggleLargeDialog = () => setIsLargeDialog((curr) => !curr);
  const classes = useStyles();

  function handleSelectionChanged(id: any) {
    const newSet = new Set(selected);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelected(newSet);
  }

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
        <span>Select Ethnicity</span>
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
        <Grid className={classes.chipContainer}>
          <Grid item xs={12} md={12}>
            {allChips.map((c: any) => (
              <Chip
                label={c.name}
                key={c.id}
                onClick={() => handleSelectionChanged(c.id)}
                variant={selected.has(c.id) ? 'outlined' : 'default'}
              ></Chip>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} className={classes.buttonContainer}>
          <Button variant="contained" disableElevation>
            Save Changes
          </Button>
          <Button onClick={() => onClose()} disableElevation>
            Cancel
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default EthnicityDialog;
