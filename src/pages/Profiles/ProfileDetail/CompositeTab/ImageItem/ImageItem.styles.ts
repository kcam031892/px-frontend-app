import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) =>
  createStyles({
    imageItem: {
      height: 250,
      minWidth: 200,
      border: '3px solid transparent',

      '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      },
    },
    imageItem__isSelected: {
      border: `3px solid ${theme.palette.primary.main}`,
      borderRadius: 8,
    },
  }),
);
