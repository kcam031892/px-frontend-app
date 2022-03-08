import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    card: {
      padding: '16px',
      width: '296px',
      height: '456px',
      borderRadius: '8px',
      marginTop: '16px',
    },
    card__content: {
      padding: '20px 0px',
      minHeight: '100px',
    },
    card__media: {
      height: 0,
      paddingTop: '125%',
    },
    card__info: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    card__text__pixels: {
      fontSize: 12,
    },
    card__text__primaryImage: {
      marginTop: '10px',
      fontWeight: 'bold',
      fontSize: '12px',
      color: 'blue',
    },
    autocomplete__tagSelect: {
      width: '310px',
      marginTop: '24px',
      '& .MuiAutocomplete-inputRoot': {
        paddingTop: '8px',
        paddingBottom: '8px',
      },
      '& .MuiInputBase-input': {
        paddingTop: '3px !important',
        paddingBottom: '2px !important',
        fontSize: '14px',
      },
      '& .MuiInputBase-root.Mui-focused': {
        boxShadow: 'none !important',
      },
    },
    autocomplete__listBoxOption: { fontSize: '12px' },
    tag: {
      marginTop: '1.25rem',
    },
    tag__chip: {
      marginRight: '8px',
      marginBottom: '8px',
      background: 'rgba(41, 98, 255, 0.08)',
      border: '1.5px solid rgba(41, 98, 255, 0.4)',
      color: '#2962FF',
      fontWeight: 500,
    },
    action: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    action__buttonContainer: {
      display: 'flex',
      gap: '1rem',
    },
  }),
);
