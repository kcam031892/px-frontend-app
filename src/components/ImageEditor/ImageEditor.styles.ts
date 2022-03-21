import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      overflow: 'hidden',
      justifyContent: 'center',
    },
    editorPanel: {
      background: '#25282A',
      width: 1136,
      padding: '24px 12px 34px 12px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    editorPanel__imageContainer: {
      display: 'flex',
      height: 500,
      margin: '2rem 0 3rem 0',
    },
    editorPanel__image: {
      width: '100%',
      objectFit: 'contain',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailPanel: {
      width: 296,
      padding: '20px 16px',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
    },
    detailPanel__title: {
      fontSize: 20,
      fontWeight: 700,
    },
    detailPanel__subTitle: {
      fontSize: 14,
      fontWeight: 700,
    },
    detailPanel__infoContent: {
      color: '#25282A',
      fontWeight: 400,
      fontSize: 14,
    },
    detailPanel__infoTitle: {
      color: '#707372',
      fontWeight: 400,
      fontSize: 12,
    },
    detailPanel__settings: {
      '& .MuiListItemText-primary': {
        fontSize: 14,
      },
      '& .MuiListItem-root': {
        paddingLeft: '0 !important',
      },
    },
    orientationMenu: {
      '& .MuiListItemText-primary': {
        fontSize: 12,
      },
    },
    loadingPanel: {
      height: 840,
      width: '100%',
      zIndex: 2,
      background: '#000',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      '& svg': {
        color: '#fff',
      },
    },
  }),
);
