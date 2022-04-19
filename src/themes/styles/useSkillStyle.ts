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
      display: 'flex',
      flexDirection: 'column',
      // gridTemplateColumns: 'repeat(auto-fill, 100px);',
      // columnGap: '20px',
      // rowGap: '10px',
      marginTop: '20px',
    },
    chipsDisplay: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridColumnGap: '10px',
      gridRowGap: '20px',
    },
    horizontalDivider: {
      margin: '5px 0px 15px 0px',
      border: 'solid 1px #e5e5e5',
    },
    badgeStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#2862ff',
      borderRadius: '50%',
      color: '#ffffff !important',
      height: '18.33px !important',
      width: '18.33px !important',
    },
    selectedDisplay: {
      display: 'flex',
      flexWrap: 'wrap',

      '& > *': {
        marginRight: '15px',
        marginBottom: '15px',
      },
    },
    subgroup: {
      marginBottom: '30px',
    },
  }),
);
