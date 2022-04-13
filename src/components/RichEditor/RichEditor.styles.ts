import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      position: 'relative',
      fontSize: '16px',
      padding: '0px 16px',
      border: 'solid 1px #2962FF',
      borderRadius: 6,
    },
    toolbar: {
      position: 'absolute',
      right: '5px',
      top: '-50px',
      zIndex: 2,
      background: '#FFFFFF',
      boxShadow:
        '0px 8px 8px rgba(55, 71, 79, 0.04), 0px 8px 16px rgba(55, 71, 79, 0.08), 0px 10px 48px rgba(55, 71, 79, 0.08)',
      borderRadius: '8px',
    },
  }),
);
