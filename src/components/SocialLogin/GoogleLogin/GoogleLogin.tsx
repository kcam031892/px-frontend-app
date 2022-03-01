import { Box } from '@material-ui/core';
import React from 'react';
import GoogleButton from 'react-google-button';
import { GoogleLogin as GLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { CONFIG } from 'shared/config';

type Props = {
  handleLoginSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
};
const GoogleLogin: React.FC<Props> = ({ handleLoginSuccess }) => {
  return (
    <Box style={{ marginBottom: 16, backgroundColor: 'red' }}>
      <GLogin
        clientId={CONFIG.GOOGLE_APP_ID}
        onSuccess={handleLoginSuccess}
        render={(renderProps) => <GoogleButton onClick={renderProps.onClick} style={{ width: '100%' }} />}
      />
    </Box>
  );
};

export default GoogleLogin;
