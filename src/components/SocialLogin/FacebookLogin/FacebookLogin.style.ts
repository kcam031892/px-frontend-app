import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    facebookButtonContainer: {
      '& button:hover': {
        backgroundColor: '#3052b3',
      },
    },
  }),
);
