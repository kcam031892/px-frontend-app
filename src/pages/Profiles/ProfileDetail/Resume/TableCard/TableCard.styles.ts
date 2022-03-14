import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    actionContainer: {
      width: 120,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: '16px',
      '& svg': {
        width: 16,
        height: 16,
        marginLeft: 16,
        cursor: 'pointer',
      },
      '& .MuiButtonBase-root': {
        padding: '0',
      },
    },
  }),
);
