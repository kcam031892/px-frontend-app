import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) =>
  createStyles({
    titleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    templateContainer: {
      // marginTop: theme.spacing(1),
    },
    actionContainer: {
      display: 'flex',
      gap: '1rem',
    },
    contentContainer: {
      marginTop: theme.spacing(2),
    },
    dialog: {
      paper: {
        maxWidth: 1000,
      },
    },
    dialog__headerContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    dialog__titleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    },
    dialog__imageList: {
      display: 'flex',
      alignItems: 'center',
    },
    dialog__scroll: {
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      padding: theme.spacing(2, 0),

      gap: '1rem',
      cursor: 'grab',

      '&::-webkit-scrollbar': {
        padding: '2rem 0',
        height: 5,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 5px grey',
        borderRadius: 10,
      },
    },
  }),
);
