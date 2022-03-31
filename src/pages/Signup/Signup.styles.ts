import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    location__container: {},
    password__container: {
      position: 'relative',
    },
    password__helper: {
      fontWeight: 500,
      position: 'absolute',
      top: '48px',
      right: '-22px',
      cursor: 'pointer',
    },
    button__container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      '& > button, & > a': {
        marginTop: '20px',
        maxWidth: '305px',
      },
    },
  }),
);
