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
    uploadCard: {
      width: '100%',
      marginTop: '20px',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 10,
      backgroundColor: 'white',
      border: '1px solid rgb(0 0 0 / 10%)',
      padding: '30px 20px',
    },
    uploadCard__icon: {
      marginRight: 20,
    },
    uploadCard__info: {
      display: 'flex',
      flexDirection: 'column',
    },
    uploadCard__fileName: {
      fontSize: '16px',
      fontWeight: 'bold',
      margin: 0,
      minWidth: '200px',
    },
    uploadCard__fileSize: {
      margin: 0,
    },
    uploadCard__progress: {
      marginLeft: '50px',
      display: 'flex',
      width: '100%',
      alignItems: 'center',
    },
    uploadCard__progressCompleted: {
      margin: 0,
    },
    uploadCard__progressBar: {
      margin: 0,
      width: 'calc(100% - 20px)',
      backgroundColor: 'black',
      height: '5px',
      borderRadius: '5px',
    },
  }),
);
