import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    templateContainer: {
      marginTop: theme.spacing(1),
    },
    actionContainer: {
      display: 'flex',
      gap: '1rem',
    },
    contentContainer: {
      marginTop: theme.spacing(2),
    },
  }),
);
