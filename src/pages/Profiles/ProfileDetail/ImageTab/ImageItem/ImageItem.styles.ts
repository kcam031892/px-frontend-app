import { createStyles, makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      // paddingBottom: 24,
      height: '100%',
      boxShadow: '6px 6px 6px rgba(0,0,0,0.1)',
      position: 'relative',
    },
    card__isDragging: {
      cursor: 'pointer',
      background: 'red',
    },
    card__hideImage: {},
    card__media: {
      // paddingTop: theme.spacing(4),
      // maxHeight: 300,
    },
    card__content: {
      // padding: theme.spacing(2),
      paddingBottom: '0 !important',
      maxWidth: '100px !important',
      width: 100,
    },

    card__title: {
      fontSize: 16,
    },
    card__subtitle: {
      color: grey['600'],
      fontSize: 14,
    },
    card__caption: {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
    card__moveIcon: {
      position: 'absolute',
      right: 2,
      top: 2,
    },
    card__actions: {
      position: 'absolute',
      bottom: 2,
      right: 2,
    },
  }),
);
