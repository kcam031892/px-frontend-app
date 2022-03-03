import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
    },
    profileFlag: {
      height: 24,
      backgroundColor: '#25282A',
      padding: '4px 8px',
      borderRadius: '6px',
      color: '#fff',
      fontWeight: 900,
      fontSize: 10,
      position: 'absolute',
      top: 28,
      left: 28,
      zIndex: 2,
    },
    card: {
      width: '304px',
      height: '236px',
      position: 'relative',
      borderRadius: 12,
    },
    card__media: {
      height: 172,
      backgroundSize: 'cover',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card__avatar: {
      width: 96,
      height: 96,
    },
    card__content: {
      padding: '12px 16px',
    },

    agency__type: {
      fontWeight: 700,
      fontSize: 16,
      lineHeight: '24px',
      color: '#25282A',
      maxWidth: '220px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    agency__detail: {
      fontWeight: 400,
      fontSize: 12,
      color: '#707372',
      lineHeight: '16px',
    },
    profile__action__button: {
      position: 'absolute',
      right: '0px',
      bottom: '20px',
      '& .MuiIconButton-label .MuiSvgIcon-root': {
        fontSize: 16,
      },
    },
    action__item: {
      fontSize: '12px',
    },
    action__link: {
      textDecoration: 'none',
      color: 'inherit',
    },
  }),
);
