import { Avatar, Box, Paper, Snackbar, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { AppState, hideNotification } from '../../app/appSlice';
import { RootState } from '../../app/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ResultType } from '../../types';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bodyContainer: {
      minHeight: '100vh',
      backgroundImage: 'url(/loginBg.jpg)',
      backgroundSize: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainContainer: {
      width: '400px',
      borderRadius: '16px',
      boxShadow:
        '0px 8px 8px rgba(55, 71, 79, 0.04), 0px 8px 16px rgba(55, 71, 79, 0.08), 0px 10px 48px rgba(55, 71, 79, 0.08)',
      padding: '32px 48px',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
    },
    avatarStyle: {
      width: '57px',
      height: '64px',
    },
  }),
);

type FrontLayoutProps = {
  title1?: string;
  title2?: string;
  containerWidth?: number;
};

const FrontLayout: FunctionComponent<FrontLayoutProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const appState: AppState = useSelector((state: RootState) => state.app);

  const handleNotificationClose = () => {
    dispatch(hideNotification());
  };

  return (
    <div className={classes.bodyContainer}>
      <Paper className={classes.mainContainer} style={{ width: props.containerWidth || 400 }}>
        <Box className={classes.header}>
          <Avatar variant="square" className={classes.avatarStyle} src="/logo.png" />
          <Box style={{ marginLeft: '16px' }}>
            <Typography variant="body1">{props.title1 || 'Welcome to'}</Typography>
            <Box style={{ display: 'flex' }}>
              <Typography variant="h5" style={{ fontWeight: 700 }}>
                {props.title2 || 'audition'}
              </Typography>
              {!props.title1 && <Typography variant="h5">magic</Typography>}
            </Box>
          </Box>
        </Box>
        <Box>{props.children}</Box>
      </Paper>
      <Snackbar
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
      </Snackbar>
    </div>
  );
};

export default FrontLayout;
