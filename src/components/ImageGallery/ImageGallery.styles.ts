import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    dialog: {
      paper: {
        maxWidth: 1000,
      },
    },
  }),
);
