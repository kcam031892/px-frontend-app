import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
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
    googleLoginStyle: {
      height: '36.5px',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      borderRadius: '5px',
      marginBottom: '10px',
      '& > div': {
        width: '100%',
      },
      '& > div > div:hover': {
        backgroundColor: '#166af4 !important',
      },
      '& > div > div > div': {
        height: '34.5px !important',
        borderTopLeftRadius: '4px !important',
        borderBottomLeftRadius: '4px !important',
      },
      '& svg': {
        height: '34.5px !important',
      },
    },
  }),
);
