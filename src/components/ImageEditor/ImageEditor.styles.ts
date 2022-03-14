import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      overflow: 'hidden',
      justifyContent: 'center',
    },
    editorPanel: {
      background: '#25282A',
      width: 1136,
      padding: '24px 12px 34px 12px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),
);
