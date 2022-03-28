import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    allowanceList: {
      '& .MuiListItemIcon-root': {
        minWidth: 36,
      },
      '& .MuiListItemText-primary': {
        fontSize: 12,
        color: '#25282A',
      },
      '& .MuiTypography-body1': {
        fontSize: 12,
        color: '#707372',
      },
      '& .MuiSvgIcon-root': {
        fontSize: 18,
      },
    },
    progressBar: {
      marginTop: 16,
      marginBottom: 8,
      display: 'flex',
      justifyContent: 'space-between',
    },
    linearProgress: {
      backgroundColor: '#E1E1E1',
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: '#00C853',
      },
    },
  }),
);
