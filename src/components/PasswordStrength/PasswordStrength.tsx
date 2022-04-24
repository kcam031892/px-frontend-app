import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';

import { Props } from '.';

const PasswordStrength: React.FC<Props> = ({ password }) => {
  const hasLowerCase = (str: string) => {
    const hasLC = /[a-z]/.test(str) ? 'primary' : 'initial';
    return hasLC;
  };

  const hasUpperCase = (str: string) => {
    const hasUC = /[A-Z]/.test(str) ? 'primary' : 'initial';
    return hasUC;
  };

  const hasNumber = (str: string) => {
    const hasNum = /[0-9]/.test(str) ? 'primary' : 'initial';
    return hasNum;
  };

  const hasSpecialCharacter = (str: string) => {
    const hasSC = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str) ? 'primary' : 'initial';
    return hasSC;
  };

  return (
    <Fragment>
      <Typography variant="subtitle2">Your password must be at least 8 characters in length and include:</Typography>
      <br />
      <Typography variant="body2" color={hasLowerCase(password)}>
        • &nbsp;a minimum of 1 lower case letter [a-z]
      </Typography>
      <Typography variant="body2" color={hasUpperCase(password)}>
        • &nbsp;a minimum of 1 upper case letter [A-Z]
      </Typography>
      <Typography variant="body2" color={hasNumber(password)}>
        • &nbsp;a minimum of 1 numeric character [0-9]
      </Typography>
      <Typography variant="body2" color={hasSpecialCharacter(password)}>
        • &nbsp;a minimum of 1 special character:
        <br />
        &nbsp;&nbsp;&nbsp;
        {'~`!@#$%^&*()-_+={}[]|;:"<>,./?'}
      </Typography>
    </Fragment>
  );
};

export default PasswordStrength;
