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
import React, { Dispatch, SetStateAction, useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import Done from '@material-ui/icons/Done';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import ethnicity from 'data/Ethnicities.json';
import { useStyles } from './EthnicityDialog.styles';
import { boolean } from 'yup/lib/locale';

type Props = {
  open: boolean;
  onClose: () => void;
  selectedChips: any[];
  setSelectedChips: Dispatch<SetStateAction<any[]>>;
};

const EthnicityDialog: React.FC<Props> = ({ open, onClose, selectedChips, setSelectedChips }) => {
  const [allChips, setAllChips] = React.useState(ethnicity);
  const [selected, setSelected] = React.useState(new Set());

  selectedChips.forEach((e) => {
    selected.add(e.id);
  });

  const [isLargeDialog, setIsLargeDialog] = useState<boolean>(false);
  const toggleLargeDialog = () => setIsLargeDialog((curr) => !curr);
  const classes = useStyles();

  function handleSelectionChanged(id: any) {
    const newSet = new Set(selected);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelected(newSet);
  }

  function onSave() {
    const arr = Array.from(selected);
    const res = allChips.filter((i) => arr.includes(i.id));
    setSelectedChips(res);
  }

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
              >
                {c.name}
              </Chip>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} className={classes.buttonContainer}>
          <Button
            variant="contained"
            onClick={() => {
              onSave();
            }}
            disableElevation
          >
            Save Changes
          </Button>
          <Button
            onClick={() => {
              onClose();
            }}
            disableElevation
          >
            Cancel
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default EthnicityDialog;
