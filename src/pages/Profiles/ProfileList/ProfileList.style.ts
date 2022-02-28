import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(4),
    },

    pageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    header: {
      margin: '50px 0px 41px 8px',
      fontWeight: 700,
      fontSize: 34,
    },
    newProfileButton: {
      background: '#FFFFFF',
      boxShadow:
        '0px 6px 8px rgba(37, 40, 42, 0.02), 0px 8px 16px rgba(37, 40, 42, 0.04), 0px 10px 24px rgba(37, 40, 42, 0.06)',
      borderRadius: '48px',
      color: '#25282A',
      fontWeight: 700,
      fontSize: 18,
    },
  }),
);
