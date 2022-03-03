import React from 'react';
import { Backdrop as MUIBackdrop, CircularProgress } from '@material-ui/core';
import { useStyles } from './Backdrop.styles';

type Props = {
  isLoading?: boolean;
};
const Backdrop: React.FC<Props> = ({ isLoading = false }) => {
  const classes = useStyles();
  return (
    <MUIBackdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="inherit" />
    </MUIBackdrop>
  );
};

export default Backdrop;
