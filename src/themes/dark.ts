import { createMuiTheme } from '@material-ui/core/styles';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    secondary: {
      main: '#2B2B2B',
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: '#fff',
        '&.Mui-focused': {
          color: '#fff',
        },
      },
    },
    MuiTextField: {
      root: {
        '& .MuiInputBase-root': {
          border: 'solid 1px #A4A4A4',
          color: '#A4A4A4',
          borderRadius: '2px',
          '&:hover': {
            boxShadow: `0 0 0 1px #2962FF`,
          },
        },
      },
    },
    MuiSelect: {
      root: {
        border: 'solid 1px #A4A4A4',
      },
    },
  },
});
