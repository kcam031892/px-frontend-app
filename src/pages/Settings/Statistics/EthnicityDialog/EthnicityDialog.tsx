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

const ProfeciencyDialog: React.FC<Props> = ({ open, onClose }) => {
  const [selected, setSelected] = React.useState(true);
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
      <DialogContent>
        <Grid className={classes.chipContainer}>
          <Grid item xs={12} md={12}>
            {ethnicity.map((i) => (
              <Chip
                onClick={() => setSelected((s) => !s)}
                // onDelete={selected && (() => {})}
                color={selected ? 'primary' : 'default'}
                variant={selected ? 'default' : 'outlined'}
                deleteIcon={<Done />}
                key={i.name}
                label={i.name}
              />
            ))}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProfeciencyDialog;
