import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    dialog: {
      '& .MuiPaper-rounded': {
        borderRadius: '24px !important',
      },
    },
    dialog__endContent: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
);
