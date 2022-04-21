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
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import Done from '@material-ui/icons/Done';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import talentTypes from 'data/TalentTypes.json';
import { useStyles } from './TalentTypesDialog.styles';
import { boolean } from 'yup/lib/locale';
import { forEach } from 'lodash';

type Props = {
  open: boolean;
  onClose: () => void;
  selectedChips: any[] | undefined;
  setSelectedChips: (e: any) => void;
};

const TalentTypesDialog: React.FC<Props> = ({ open, onClose, selectedChips, setSelectedChips }) => {
  const [allChips, setAllChips] = React.useState(talentTypes);
  const [selected, setSelected] = React.useState(new Set());

  const [isLargeDialog, setIsLargeDialog] = useState<boolean>(false);
  const toggleLargeDialog = () => setIsLargeDialog((curr) => !curr);
  const classes = useStyles();

  useEffect(() => {
    selectedChips!.map((e) => {
      selected.add(e.id);
    });
  });

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
                label={c.value}
                key={c.id}
                onClick={() => handleSelectionChanged(c.id)}
                variant={selected.has(c.id) ? 'outlined' : 'default'}
              >
                {c.value}
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

export default TalentTypesDialog;
