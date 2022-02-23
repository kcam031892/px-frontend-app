import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login';

export const FacebookLoginWrapper = styled.div`
  width: 100%;
  .kep-login-facebook {
    width: 100%;
    padding: 0.5rem 1rem;
    height: auto;
    font-size: 14px;
    text-transform: none;
    font-weight: 400;
  }
`;

export const FBLogin = styled(FacebookLogin)`
  color: red;
`;
