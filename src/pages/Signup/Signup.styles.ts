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
  }),
);
