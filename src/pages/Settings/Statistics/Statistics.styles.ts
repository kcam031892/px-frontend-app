import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    contentContainer: {
      padding: '0 144px',
      marginTop: '16px',
    },
    profileItemsContainer: {
      '& .MuiGrid-grid-lg-2': {
        maxWidth: '20%',
        flexBasis: '20%',
      },
    },
  }),
);
