import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) =>
  createStyles({
    dialogPaper: {
      position: 'absolute',
      right: 16,
      top: 160,
      width: 512,
      paddingBottom: theme.spacing(4),
    },
    dialogPaperLarge: {
      position: 'absolute',
      right: 16,
      top: 60,
      width: 512,
      height: `calc(100% - 110px)`,
    },
    dialog__header: {
      '& .MuiTypography-root': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    },
    freelanceError: {
      background: 'rgba(244, 67, 54, 0.08)',
      borderRadius: '6px',
      color: '#F44336',
      fontWeight: 700,
      fontSize: 14,
      width: '100%',
      padding: '10px 16px',
    },
    agencyList: {
      border: '1px solid #E1E1E1',
      borderRadius: 6,
      marginTop: 16,
    },
    agencyList__item: {
      '& .MuiListItemText-primary': {
        color: '#25282A',
        fontSize: '14px',
        fontWeight: 700,
      },
      '& .MuiListItemText-secondary': {
        color: '#707372',
        fontSize: '12px',
      },
    },
  }),
);
