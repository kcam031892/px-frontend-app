import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Slide } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import React, { useState } from 'react';

const Transition = React.forwardRef<
  unknown,
  TransitionProps & {
    children?: React.ReactElement;
  }
>((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  open: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
};
const ConfirmDialog: React.FC<Props> = ({ open, handleClose, onConfirm, title, children }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
