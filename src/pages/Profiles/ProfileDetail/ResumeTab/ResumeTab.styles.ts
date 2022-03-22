import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) =>
  createStyles({
    resumeTab: {},
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    selectedResume: {},
    selectedResume__dragContainer: {},
    selectedResume__sectionList: {
      padding: theme.spacing(4.5, 0),
    },
    otherResume: {
      marginTop: theme.spacing(2),
    },
    otherResume__sectionList: {
      padding: theme.spacing(4.5, 0),
    },
  }),
);
