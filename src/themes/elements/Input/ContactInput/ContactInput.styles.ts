import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    inputContainer: {
      marginTop: 22,
      display: 'flex',
    },
    contactInput_class: {
      height: '40px !important',
      padding: '10px 16px 10px 50px',
      fontSize: '14px !important',
      background: '#F5F5F5 !important',
      caretColor: '#2962FF !important',
      borderRadius: '6px !important',
      border: 'none !important',
      width: '96px !important',
      marginRight: '10px !important',
    },
    contactContainer_class: {
      width: 'unset',
    },
    contactButton_class: {
      border: 'solid 2px #F5F5F5 !important',
      borderTopLeftRadius: '6px !important',
      borderBottomLeftRadius: '6px !important',
      height: '40px !important',
    },
  }),
);
