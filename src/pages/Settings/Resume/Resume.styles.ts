import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      paddingBottom: '4rem',
    },
    showYearContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '.5rem',
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
    dialog: {
      paper: {
        maxWidth: 1000,
      },
    },
    isDragging: {
      display: 'none',
    },
  }),
);
