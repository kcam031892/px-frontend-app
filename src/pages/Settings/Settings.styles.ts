import { createStyles, makeStyles } from '@material-ui/core';
import { capitalize, unset } from 'lodash';

export const useStyles = makeStyles((theme) =>
  createStyles({
    tabContainer: {
      marginTop: theme.spacing(4),
    },
    tabItems: {
      fontWeight: 600,
    },
  }),
);
