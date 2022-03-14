import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    imageItemContainer: {
      height: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    },
    imageBadQuality: {
      border: '2px solid #F44336',
    },
    iconContainer: {
      position: 'absolute',
      right: 4,
      top: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    menuButton: {
      background: 'rgba(37, 40, 42, 0.6)',
      marginLeft: 8,
      padding: 8,
      fontSize: 16,
      '& svg': {
        fontSize: 16,
        color: '#fff',
      },
      '&.MuiIconButton-root:hover': {
        background: 'rgba(37, 40, 42, 0.6)',
      },
    },
    imageInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    imageInfo__imageContainer: {
      marginRight: '20px',
    },
    imageInfo__imageName: {
      fontWeight: 700,
      fontSize: 14,
      color: '#25282A',
      width: '170px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    imageInfo__imageDetails: {
      color: '#707372',
      fontWeight: 400,
      fontSize: 12,
    },
    imageInfo__tags: {
      fontWeight: 900,
      color: '#707372',
      fontSize: 10,
    },
  }),
);
