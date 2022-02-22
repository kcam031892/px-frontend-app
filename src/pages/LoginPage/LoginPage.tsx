import React from 'react';

import { Space, Typography, Checkbox } from 'antd';
import { Button } from 'shared/theme/elements';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'shared/constants/ROUTES';
import { FacebookLogin, Logo } from 'components';
import {
  ActionContainer,
  ButtonContainer,
  Input,
  InputWrapper,
  Label,
  LoginCard,
  LoginContainer,
  LoginForm,
  LoginWrapper,
} from './LoginPage.styled';

const { Title, Text } = Typography;

const LoginPage = () => {
  const { push } = useHistory();
  const handleLogin = () => {
    push(ROUTES.DASHBOARD);
  };
  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginCard>
          <Space size="middle" align="center">
            {/* <Logo /> */}
            <Space direction="vertical" size={0}>
              <Text>Welcome To </Text>
              <Title className="card__title">Project X</Title>
            </Space>
          </Space>

          <LoginForm>
            <Space size="middle" direction="vertical" className="form__space">
              <InputWrapper>
                <Label>Email Address</Label>
                <Input />
              </InputWrapper>

              <InputWrapper>
                <Label>Password</Label>
                <Input />
              </InputWrapper>
              <ActionContainer>
                <Checkbox>Remember Me</Checkbox>
                <Text>Forgot Password</Text>
              </ActionContainer>

              <ButtonContainer direction="vertical" size="small">
                <Button type="primary" fullwidth onClick={() => handleLogin()}>
                  Login
                </Button>
                <FacebookLogin />
                <Button type="ghost" fullwidth>
                  Create an Account
                </Button>
              </ButtonContainer>
            </Space>
          </LoginForm>
        </LoginCard>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default LoginPage;
