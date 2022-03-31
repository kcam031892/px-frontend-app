import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) =>
  createStyles({
    audioTab: {},
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    selectedAudios: {},
    selectedAudios__audioList: {
      marginTop: theme.spacing(0.5),
    },
    selectedAudios__scroll: {
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden',
      padding: theme.spacing(2, 0),
      paddingRight: 24,
      gap: '1rem',
      cursor: 'grab',
      scrollBehavior: 'smooth',
      '&::-webkit-scrollbar': {
        padding: '2rem 0',
        height: 5,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 5px grey',
        borderRadius: 10,
      },
    },
    selectedAudios__dragContainer: {
      display: 'flex',
      gap: '1rem',
      overflow: 'auto',

      '&::-webkit-scrollbar': {
        padding: '2rem 0',
        height: 5,
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 5px grey',
        borderRadius: 10,
      },
    },
    otherImages: {
      marginTop: theme.spacing(4),
    },
    dialogPaper: {
      background: '#cfcfcf',
    },
    dialogContent: {
      padding: '50px',
      margin: 'auto',
      overflow: 'visible',
    },
  }),
);
