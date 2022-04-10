import { createStyles, makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      padding: theme.spacing(2),
      paddingBottom: 24,
      height: '100%',

      position: 'relative',
    },
    card__isDragging: {
      cursor: 'pointer',
      background: 'red',
    },
    card__hideImage: {},
    card__media: {
      paddingTop: theme.spacing(3),
      // maxHeight: 300,
    },
    card__content: {
      padding: 0,
      paddingTop: theme.spacing(2),
      paddingBottom: '0 !important',
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
      right: 0,
      top: 0,
    },
    card__actions: {
      position: 'absolute',
      bottom: 0,
      right: 0,
    },
  }),
);
