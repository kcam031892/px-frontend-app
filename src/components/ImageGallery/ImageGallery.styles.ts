import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    dialog: {
      minHeight: 500,
      paper: {
        maxWidth: 1000,
      },
    },
  }),
);
