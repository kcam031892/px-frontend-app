import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {},
    header: {
      fontWeight: 700,
      fontSize: 34,
    },
    pageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '3rem',
    },
    sectionTitle: {
      fontWeight: 700,
      fontSize: 20,
      marginBottom: 16,
    },
    imageList: {
      '& .MuiImageListItem-item': {
        borderRadius: 6,
      },
    },
  }),
);
