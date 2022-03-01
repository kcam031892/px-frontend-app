import { Paper, Box, Avatar, Typography, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { ResultType } from 'types';
import { useStyles } from './FrontLayout.style';

type Props = {
  heading?: string;
  subHeading?: string;
  children: React.ReactNode;
};
const FrontLayout: React.FC<Props> = ({ children, heading, subHeading }) => {
  const classes = useStyles();
  return (
    <div className={classes.bodyContainer}>
      <Paper className={classes.mainContainer} style={{ width: 400 }}>
        <Box className={classes.header}>
          <Avatar variant="square" className={classes.avatarStyle} src="/logo.png" />
          <Box style={{ marginLeft: '16px' }}>
            <Typography variant="body1">{heading ? heading : 'Welcome to'} </Typography>
            <Box style={{ display: 'flex' }}>
              <Typography variant="h5" style={{ fontWeight: 700 }}>
                {subHeading ? subHeading : 'Audition'}
              </Typography>
              <Typography variant="h5">{subHeading ? '' : 'magic'}</Typography>
            </Box>
          </Box>
        </Box>
        <Box>{children}</Box>
      </Paper>
      {/* <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={appState.showResult}
        onClose={handleNotificationClose}
        autoHideDuration={6000}
        key={'bottom center'}
      >
        <Alert
          onClose={handleNotificationClose}
          variant="filled"
          severity={
            appState.currentResult?.type === ResultType.success
              ? 'success'
              : appState.currentResult?.type === ResultType.error
              ? 'error'
              : 'warning'
          }
        >
          {appState.currentResult?.message || ''}
        </Alert>
      </Snackbar> */}
    </div>
  );
};

export default FrontLayout;
