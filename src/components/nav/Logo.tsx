import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      // height: '80px'
    },
    logo: {
      width: '40px',
      height: '44.91px',
      margin: '18px 24px',
    },
  }),
);

export default function Logo() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img src="/logo.png" alt="Audition Magic" className={classes.logo}></img>
    </div>
  );
}
