import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {},
    heading: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: 20,
    },
    item: {
      position: 'relative',
    },
    selectBtn: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'white',
    },
    selectBtnActive: {
      backgroundColor: 'black',
      color: 'white',
    },
    videoContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridGap: 4,
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    audioItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 10,
    },
    audioSelectBtn: {
      position: 'static',
      marginLeft: 10,
    },
  }),
);
