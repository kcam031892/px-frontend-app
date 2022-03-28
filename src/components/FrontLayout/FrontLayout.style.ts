import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    bodyContainer: {
      minHeight: '100vh',
      backgroundImage: 'url(/loginBg.jpg)',
      backgroundSize: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainContainer: {
      width: '400px',
      borderRadius: '16px',
      boxShadow:
        '0px 8px 8px rgba(55, 71, 79, 0.04), 0px 8px 16px rgba(55, 71, 79, 0.08), 0px 10px 48px rgba(55, 71, 79, 0.08)',
      padding: '32px 48px',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
    },
    avatarStyle: {
      width: '57px',
      height: '64px',
    },
  }),
);
