import React from 'react';
import FrontLayout from '..';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function SignUpConfirm() {
  return (
    <FrontLayout title1="Now confirm your" title2="Email Address">
      <Typography variant="subtitle2" style={{ marginTop: '24px' }}>
        Please check your email now
      </Typography>
      <Typography variant="body2" style={{ marginTop: '8px' }}>
        If the email you entered is in our database, we will send you an email to reset your password. If you are new,
        then you will click the email to activate your account. Thank you and welcome again to audition magic.
      </Typography>
      <Typography variant="body2" style={{ fontWeight: 700, marginTop: '24px' }}>
        Thank you and welcome again to audition magic.
      </Typography>
      <Button
        variant="contained"
        disableElevation
        fullWidth
        component={Link}
        to={'/login'}
        style={{ margin: '44px 0px 14px 0px' }}
      >
        Return to Login
      </Button>
    </FrontLayout>
  );
}
