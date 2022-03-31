import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
export const useTabStyle = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      padding: '0 12px',
      marginRight: '48px',
      '& .MuiTab-wrapper': {
        fontSize: '14px',
        fontWeight: 600,
        textTransform: 'capitalize',
        alignItems: 'flex-start',
      },
      [theme.breakpoints.up('sm')]: {
        minWidth: '0',
        //paddingRight: '48px'
      },
    },
  });
});
