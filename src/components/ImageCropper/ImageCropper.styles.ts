import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    card: {
      background: '#212121',
      padding: '0px 40px 0px 40px',
      borderRadius: '8px',
      border: 'none',
    },
    cropperContainer: {
      height: '450px',

      position: 'relative',
    },
    card__action: {
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '0px 12px 12px 12px',
    },
    action: {
      zIndex: 3,
    },
    action__buttonActive: {
      color: '#fff',
    },
    action__buttonDisable: {
      color: '#D9D9D9 !important',
    },
    slider: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 20,
      width: '100%',
      zIndex: 2,
    },
  }),
);
