import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';

const PasswordStrength = () => {
  return (
    <Fragment>
      <Typography variant="subtitle2">Your password must be at least 8 characters in length and include:</Typography>
      <br />
      <Typography variant="body2">• &nbsp;a minimum of 1 lower case letter [a-z] and</Typography>
      <Typography variant="body2">• &nbsp;a minimum of 1 upper case letter [A-Z] and</Typography>
      <Typography variant="body2">• &nbsp;a minimum of 1 numeric character [0-9] and</Typography>
      <Typography variant="body2">
        • &nbsp;a minimum of 1 special character:
        <br />
        &nbsp;&nbsp;&nbsp;
        {'~`!@#$%^&*()-_+={}[]|;:"<>,./?'}
      </Typography>
    </Fragment>
  );
};

export default PasswordStrength;
