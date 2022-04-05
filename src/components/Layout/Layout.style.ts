import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(2, 4),
      backgroundColor: theme.palette.secondary.main,
      minHeight: '100vh',
      overflow: 'hidden',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(2, 0),

      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  }),
);
