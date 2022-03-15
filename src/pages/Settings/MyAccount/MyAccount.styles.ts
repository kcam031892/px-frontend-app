import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    contentContainer: {
      padding: '0 86px',
      marginTop: '16px',
    },
    passwordPrinciples: {
      '& h6': {
        marginBottom: '30px',
        color: '#707372',
      },
      '& p': {
        marginTop: '5px',
        color: '#707372',
      },
    },
  }),
);
