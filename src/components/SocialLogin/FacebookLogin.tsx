import React from 'react';
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import { CONFIG } from 'shared/config';
import { FacebookLoginWrapper, FBLogin } from './SocialLogin';

const FacebookLogin = () => {
  const handleLoginCallback = (userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    console.log(userInfo);
  };
  return (
    <FacebookLoginWrapper>
      <FBLogin
        size="small"
        appId={CONFIG.FB_APP_ID}
        autoLoad={true}
        fields="name,email,picture"
        callback={handleLoginCallback}
        textButton="Login with Facebook"
      />
    </FacebookLoginWrapper>
  );
};

export default FacebookLogin;
