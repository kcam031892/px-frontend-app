import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) =>
  createStyles({
    template: {},
    template__item: {
      backgroundColor: '#C4C4C4',
      padding: theme.spacing(4),
      cursor: 'pointer',
      border: '1px solid transparent',
    },
    template__itemSelected: {
      backgroundColor: '#CEDAFF',
      border: '1px solid #092DAC',
    },
    template__boxDark: {
      backgroundColor: '#4A4949',
    },
    template__greyBox: {
      backgroundColor: '#706D6D',
    },
    smallBox: {
      height: '100%',
      width: '100%',
    },
    flexCenter: {
      display: 'flex',
      justifyContent: 'center',
    },
    nameBox: {
      height: 10,
      width: '80%',
    },
    bigBoxContainer: {
      marginTop: theme.spacing(2),
    },
    bigBox: {
      height: 130,
    },
    leftBigBox: {
      height: 150,
    },
    detailBox: {
      height: 25,
      width: '70%',
    },
    leftDetailBox: {
      height: 25,
      width: '100%',
    },
    agencyBox: {
      height: 20,
      width: '75%',
    },
    twoBoxContainer: {
      gap: '.5rem',
      display: 'flex',
    },
    twoBox: {
      height: 100,
      width: '100%',
      marginTop: '1rem',
    },
  }),
);
