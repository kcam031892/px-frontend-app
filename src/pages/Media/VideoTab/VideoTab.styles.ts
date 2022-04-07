import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {},
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    header__title: {
      fontWeight: 700,
      fontSize: 34,
    },
    header__sliderContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    newButtonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
    },

    filters__radio: {
      '& .MuiRadio-colorSecondary.Mui-checked': {
        color: '#2962FF',
      },
    },
    filters__tagContainer: {
      marginTop: 24,
    },
    filters__tagHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    filters__tag: {
      color: '#707372',
      fontWeight: 400,
      fontSize: 12,
      marginRight: 10,
    },
    filters__progressBar: {
      marginTop: 16,
      marginBottom: 8,
      display: 'flex',
      justifyContent: 'space-between',
    },
    filters__linearProgress: {
      backgroundColor: '#E1E1E1',
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: '#00C853',
      },
    },
    videoList: {
      '& .MuiImageListItem-item': {
        borderRadius: 6,
      },
    },
    dialogPaper: {
      background: '#cfcfcf',
    },
    dialogContent: {
      padding: '50px',
      margin: 'auto',
      overflow: 'visible',
    },
    emptyImageList: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  }),
);
