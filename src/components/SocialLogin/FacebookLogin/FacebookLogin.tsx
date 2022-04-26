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
        containerStyle={{ width: '100%' }}
        buttonStyle={{
          width: '100%',
          padding: 7.5,
          fontSize: 16,
          fontWeight: 'normal',
          textTransform: 'initial',
          borderRadius: 4,
        }}
        textButton="Sign in with Facebook"
      />
    </Box>
  );
};

export default FacebookLogin;
