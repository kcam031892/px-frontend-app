import { createStyles, makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      padding: theme.spacing(2),
      paddingBottom: 0,
      minWidth: 600,
      position: 'relative',
    },
    card__isDragging: {
      transform: 'scale(0.9)',
    },
    card__hideImage: {
      minWidth: 300,
    },
    card__media: {
      paddingTop: theme.spacing(3),
    },
    card__content: {
      padding: 0,
      paddingTop: theme.spacing(2),
      paddingBottom: '0 !important',
    },

    card__title: {},
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
      left: 0,
      top: 0,
    },
    card__actions: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
);
