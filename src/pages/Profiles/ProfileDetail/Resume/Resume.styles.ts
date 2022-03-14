import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      margin: '0 144px',
      position: 'relative',
      paddingBottom: '4rem',
    },
    actionContainer: {
      marginTop: '11px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    addIcon: {
      padding: '14px',
      backgroundColor: '#000',
      position: 'absolute',
      bottom: 0,
      right: 0,
      '&:hover': {
        backgroundColor: '#333',
      },
    },
  }),
);
