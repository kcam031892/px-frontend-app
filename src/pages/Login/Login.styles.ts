import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    extraContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '16px',
      marginBottom: '34px',
      '& .MuiFormControlLabel-label': {
        fontSize: '14px',
      },
    },
    forgotLink: {
      color: '#A4A4A4',
      textDecoration: 'none',
    },
  }),
);
