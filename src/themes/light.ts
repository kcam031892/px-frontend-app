import { createMuiTheme } from '@material-ui/core/styles';

export const lightTheme = createMuiTheme({
  spacing: 8,
  palette: {
    type: 'light',
    primary: {
      main: '#2962FF',
    },
    secondary: {
      main: '#E5E5E5',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      contained: {
        color: '#FFFFFF',
        backgroundColor: '#2962FF',
        '&:hover': {
          backgroundColor: 'none',
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08)), #2962FF',
        },
        '&:focus': {
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24)), #2962FF',
        },
      },
    },
    MuiInputLabel: {
      root: {
        color: '#212121',
        fontSize: '14px',
        fontWeight: 500,
        letterSpacing: '0.1px',
        '&.Mui-focused': {
          color: '#2962FF',
        },
        '&.Mui-disabled': {
          color: '#A4A4A4',
        },
      },
      shrink: {
        transform: 'none',
      },
    },
    MuiInputBase: {
      root: {
        // "&.Mui-focused:not(:has(.MuiSelect-select))": {
        //     border:'solid 1px #2962FF'
        // },
      },
    },
    MuiTextField: {
      root: {
        '& .MuiInputBase-root': {
          height: 40,
          padding: '10px 16px',
          background: '#F5F5F5',
          borderRadius: '6px',
          caretColor: '#2962FF',
          fontSize: '14px',
          '&.Mui-focused': {
            border: 'solid 1px #2962FF',
            borderRadius: '6px !important',
            background: 'none',
          },
          '&.Mui-error': {
            border: 'solid 1px #F44336',
          },
        },
        '& .MuiInputLabel-root': {
          fontSize: '14px',
          fontWeight: '500',
        },
      },
    },
    MuiSelect: {
      select: {
        color: '#212121',
        fontSize: '14px',
        letterSpacing: '0.1px',
        padding: '10px 16px',
        borderRadius: '6px',
        background: '#F5F5F5',
        '&:focus': {
          borderRadius: '6px',
        },
        '&.Mui-focused': {
          border: 'solid 1px #2962FF',
          borderRadius: '6px',
        },
        '&.Mui-error': {
          border: 'solid 1px #F44336',
        },
        '&.Mui-disabled': {
          color: '#A4A4A4',
        },
      },
      icon: {
        right: '16px',
      },
    },
    MuiFormControl: {
      root: {
        '& label + .MuiInput-formControl': {
          marginTop: 22,
        },
        '& .Mui-error .MuiSelect-select': {
          border: 'solid 1px #F44336',
        },
      },
    },
    MuiTabs: {
      root: {
        '& .MuiTab-wrapper': {
          color: '#212121',
        },
      },
    },
    MuiFormControlLabel: {
      root: {
        fontSize: '14px',
        '& .MuiSvgIcon-root': {
          width: '18px',
          height: '18px',
        },
        '& .MuiFormControlLabel-label': {
          fontSize: '14px',
        },
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: '12px',
        lineHeight: '16px',
      },
    },
    MuiCard: {
      root: {
        border: '1px solid #D9D9D9',
        boxSizing: 'border-box',
        borderRadius: '4px',
      },
    },
    MuiChip: {
      root: {
        boxSizing: 'border-box',
        borderRadius: '32px',
        color: '#2962FF',
        fontWeight: 500,
      },
      outlined: {
        backgroundColor: 'rgba(41, 98, 255, 0.08)',
        border: '1.5px solid rgba(41, 98, 255, 0.4)',
        boxSizing: 'border-box',
      },
    },
    MuiSwitch: {
      root: {
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: '#2962FF',
          '& + $track': {
            background: 'rgba(41, 98, 255, 0.08) !important',
          },
        },
      },
    },
  },
});
