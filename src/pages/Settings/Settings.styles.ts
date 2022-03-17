import { createStyles, makeStyles } from '@material-ui/core';
import { capitalize, unset } from 'lodash';

export const useStyles = makeStyles(() =>
  createStyles({
    tabContainer: {
      padding: '16px 28px',
    },
    tabItems: {
      fontWeight: 600,
    },
  }),
);
