import React from 'react';
import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { PasswordPrinciple } from '../utils/passwordUtil';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    passwordPrinciples: {
      '& h6': {
        marginBottom: '20px',
      },
      '& p': {
        marginTop: '5px',
      },
    },
  }),
);

interface PasswordStrengthProps {
  validateResult: PasswordPrinciple | undefined;
}

export default function PasswordStrength(props: PasswordStrengthProps) {
  const classes = useStyles();
  return (
    <Box className={classes.passwordPrinciples}>
      <Typography variant="subtitle2" color={props.validateResult?.LengthInValid === true ? 'error' : 'inherit'}>
        Your password must be at least 8 characters in length and include:
      </Typography>
      <Typography variant="body2" color={props.validateResult?.LowerCaseInValid === true ? 'error' : 'inherit'}>
        • a minimum of 1 lower case letter [a-z] and
      </Typography>
      <Typography variant="body2" color={props.validateResult?.UpperCaseInValid === true ? 'error' : 'inherit'}>
        • a minimum of 1 upper case letter [A-Z] and
      </Typography>
      <Typography variant="body2" color={props.validateResult?.NumbericInValid === true ? 'error' : 'inherit'}>
        • a minimum of 1 numeric character [0-9] and
      </Typography>
      <Typography variant="body2" color={props.validateResult?.SpecialInValid === true ? 'error' : 'inherit'}>
        • a minimum of 1 special character: &nbsp;&nbsp;
        {'~`!@#$%^&*()-_+={}[]|;:"<>,./?'}
      </Typography>
    </Box>
  );
}
