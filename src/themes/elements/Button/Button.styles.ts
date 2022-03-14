import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    newButton: {
      background: '#FFFFFF',
      boxShadow:
        '0px 6px 8px rgba(37, 40, 42, 0.02), 0px 8px 16px rgba(37, 40, 42, 0.04), 0px 10px 24px rgba(37, 40, 42, 0.06)',
      borderRadius: '24px',
      color: '#25282A',
      fontWeight: 700,
      fontSize: 18,
      '&:hover, &:focus, &:active': {
        color: '#fff',
        '& > *:first-child path': {
          fill: '#fff',
          color: '#fff',
        },
      },
    },
  }),
);
