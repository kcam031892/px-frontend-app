import { createStyles, makeStyles } from '@material-ui/core';

export const useSkillStyle = makeStyles(() =>
  createStyles({
    contentContainer: {
      padding: '0',
      '& h2': {
        fontWeight: '700',
        margin: '0',
      },
    },
    small: {
      fontSize: '12px',
      marginLeft: '5px',
      color: '#707372',
    },
    headerContainer: {
      display: 'flex',
      marginBottom: '10px',
      '& .MuiTypography-body1': {
        display: 'flex',
      },
    },
    flexRight: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    btnPrimary: {
      marginLeft: '15px',
      backgroundColor: '#2962FF',
    },
    chipContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, 100px);',
      columnGap: '20px',
      rowGap: '10px',
      marginTop: '20px',
    },
  }),
);
