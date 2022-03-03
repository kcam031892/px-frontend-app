import { Box } from '@material-ui/core';
import React from 'react';
import FBLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import { CONFIG } from 'shared/config';

type Props = {
  handleLoginSuccess: (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => void;
};
const FacebookLogin: React.FC<Props> = ({ handleLoginSuccess }) => {
  return (
    <Box style={{ marginBottom: 16 }}>
      <FBLogin
        appId={CONFIG.FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={handleLoginSuccess}
        containerStyle={{ width: '100%', padding: 4 }}
        buttonStyle={{ width: '100%', padding: 8, fontSize: 16, fontWeight: 'normal', textTransform: 'initial' }}
        textButton="Sign in with Facebook"
      />
    </Box>
  );
};

export default FacebookLogin;
