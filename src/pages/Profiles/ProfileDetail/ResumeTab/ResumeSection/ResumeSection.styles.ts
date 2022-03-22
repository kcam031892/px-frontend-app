import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    card: {
      border: '1px solid #D9D9D9',
      boxSizing: 'border-box',
      borderRadius: '4px',
      background: '#FFFFFF',
      // padding: '24px',
      // marginBottom: '16px',
      position: 'relative',
      overflow: 'visible',
      '&:hover': {
        outline: '2px solid #A4A4A4',
      },
    },
    actionContainer: {
      backgroundColor: '#FFFFFF',
      boxShadow:
        '0px 8px 8px rgba(55, 71, 79, 0.04), 0px 8px 16px rgba(55, 71, 79, 0.08), 0px 10px 48px rgba(55, 71, 79, 0.08)',
      borderRadius: '8px',
      height: '48px',
      padding: '14px 18px',
      position: 'absolute',
      right: '-16px',
      top: '-56px',
      display: 'none',
      '& svg': {
        cursor: 'pointer',
      },
    },
    actionContainer__item: {
      display: 'flex',
      justifyContent: 'space-between',
      marginRight: '12px',
    },
    actionContainer__selected: {
      display: 'flex',
    },
  }),
);
