import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {},
    card: {
      border: '2px solid #A4A4A4',
      boxShadow: 'none',
    },
    card__title: {
      marginBottom: '10px',
    },
    note: {
      fontSize: '12px',
      color: '#4A4A4A',
    },
    actionContainer: {
      marginTop: '11px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'middle',
    },
  }),
);
