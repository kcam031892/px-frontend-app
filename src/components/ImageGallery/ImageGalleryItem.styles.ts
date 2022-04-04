import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      minHeight: 420,
    },
    card__active: {
      borderColor: '#333',
    },
    card__media: {
      padding: theme.spacing(2),
      paddingBottom: 0,
    },
  }),
);
