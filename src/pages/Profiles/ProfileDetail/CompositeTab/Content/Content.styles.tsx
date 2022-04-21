import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      padding: theme.spacing(2, 4),
    },
    template: {},
    template__item: {},
    imageContainer: {
      height: 215,
      width: '100%',
      position: 'relative',
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    },
    bigImageContainer: {
      position: 'relative',
      height: 360,
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    },
    leftBigImageContainer: {
      position: 'relative',
      height: 430,
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    },
    twoImageContainer: {
      marginTop: '2.5rem',
    },
    profileContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    agencyContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    editIconContainer: {
      position: 'absolute',
      left: '50%',
      top: ' 50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
      backgroundColor: '#fff',
      borderRadius: '50%',
    },
    isEditing: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 999,
      left: 0,
      top: 0,
    },
  }),
);
