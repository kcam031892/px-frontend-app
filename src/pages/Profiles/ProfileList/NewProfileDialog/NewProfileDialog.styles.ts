import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    dialogPaper: {
      position: 'absolute',
      right: 16,
      top: 160,
      width: 512,
    },
    dialogPaperLarge: {
      position: 'absolute',
      right: 16,
      top: 60,
      width: 512,
      height: `calc(100% - 110px)`,
    },
    dialog__header: {
      '& .MuiTypography-root': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    },
  }),
);
