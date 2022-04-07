import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    card: {
      height: '236px',
      position: 'relative',
      borderRadius: 12,
    },
    card__profileFalgSkeleton: {
      position: 'absolute',
      top: 5,
      left: 10,
      zIndex: 2,
    },
    card__media: {
      height: 172,
      backgroundSize: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card__media__skeleton: {
      width: 96,
      height: 96,
    },
    card__content: {
      padding: '12px 8px',
      position: 'relative',
    },
    card__content__actionSkeleton: {
      position: 'absolute',
      right: '10px',
      top: '12px',
    },
  }),
);
