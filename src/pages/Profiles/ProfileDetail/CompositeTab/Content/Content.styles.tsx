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
      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
    bigImageContainer: {
      height: 360,
      '& img': {
        width: '100%',
        height: '100%',
      },
    },
    leftBigImageContainer: {
      height: 430,
      '& img': {
        width: '100%',
        height: '100%',
      },
    },
    twoImageContainer: {
      gap: '.5rem',
      display: 'flex',
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
  }),
);
