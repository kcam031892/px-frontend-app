import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { SelectListItem } from '../../../types';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';
export interface ArtistTypeDialogProps {
  open: boolean;
  artistTypes: SelectListItem[];
  onClose: () => void;
  onChangeItemStatus: (artistTypeCode: string, checked: boolean) => void;
  onApplyChanges: () => void;
}

function ArtistTypeDialog(props: ArtistTypeDialogProps) {
  const handleClose = () => {
    props.onClose();
  };
  return (
    <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={'md'}>
      <DialogTitle id="form-dialog-title">Other Talent Types</DialogTitle>
      <DialogContent>
        <div>
          <Grid container spacing={2}>
            {props.artistTypes &&
              props.artistTypes.map((item: SelectListItem) => {
                return (
                  <Grid xs={12} md={4} item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="checkedC"
                          checked={item.selected}
                          color="default"
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            props.onChangeItemStatus(item.value, event.target.checked)
                          }
                        />
                      }
                      label={item.text}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ background: '#2962FF' }}
          onClick={() => {
            props.onApplyChanges();
            handleClose();
          }}
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ArtistTypeDialog;
