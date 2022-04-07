import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    tabItems: {
      '& .MuiTab-wrapper': {
        color: '#212121',
        fontSize: '16px',
        textTransform: 'capitalize',
        alignItems: 'flex-start',
      },
      padding: '0',
      '& span': {
        padding: '0',
      },
    },
  }),
);
