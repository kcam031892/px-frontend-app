import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    dialogPaper: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: 512,
    },
    dialogPaperLarge: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
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
    chipContainer: {
      margin: '10px 0 0',
      '& .MuiChip-root': {
        margin: '0 5px 10px 0',
      },
    },
    dialogContentContainer: {
      padding: '8px 24px 24px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '20px',
    },
  }),
);
