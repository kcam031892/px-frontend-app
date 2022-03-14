import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    header: {
      fontWeight: 700,
      fontSize: 34,
      marginBottom: '3rem',
    },
    dropzone: {
      width: '100%',
      height: 300,
      border: 'solid 1px #cfcfcf',
      background: '#F3F3F3',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    uploadList: {},
    uploadList__action: {
      display: 'flex',
      justifyContent: 'space-between',
      alignITems: 'center',
      marginTop: '2rem',
    },
    uploadList__header: {
      fontWeight: 700,
      fontSize: 34,
    },
  }),
);
