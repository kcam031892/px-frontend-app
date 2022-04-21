import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    mediaItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '5px',
      border: 'solid 1px #e5e5e5',
      padding: '9px',
      borderRadius: '5px',
      boxShadow: '0px 0px 2px 0px #e5e5e5',
    },
    mediaText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '250px',
      marginRight: '5px',
    },
  }),
);
