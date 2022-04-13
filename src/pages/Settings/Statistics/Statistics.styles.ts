import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    contentContainer: {
      padding: '0 144px',
      marginTop: '16px',
    },
    profileItemsContainer: {
      '& .MuiGrid-grid-lg-2': {
        maxWidth: '20%',
        flexBasis: '20%',
      },
    },
    autocompleteContainer: {
      marginTop: '10px',
      '& > * + *': {
        marginTop: 2,
      },
      '& .MuiAutocomplete-tag': {
        height: '23px',
      },
      '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
        padding: '5px',
      },
      '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input': {
        padding: 0,
      },
    },
  }),
);
