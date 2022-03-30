import { Theme, createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabContainer: {
      marginTop: theme.spacing(4),
    },
  }),
);
