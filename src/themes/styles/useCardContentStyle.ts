import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
export const useCardContentStyle = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      padding: '24px',
      '& .MuiTypography-h6': {
        fontWeight: 600,
      },
      '& .MuiInputLabel-formControl': {
        fontWeight: 600,
      },
      [theme.breakpoints.up('sm')]: {
        minWidth: '0',
        //paddingRight: '48px'
      },
    },
  });
});
