import styled from 'styled-components';
import { Input as AntInput, Space } from 'antd';

export const LoginWrapper = styled.div`
  min-height: 100vh;
  background-color: #333;
  /* background: url('./../../assets/loginBg.jpeg') no-repeat center center/cover; */
  display: grid;
  place-items: center;
`;

export const LoginContainer = styled.div`
  width: 380px;
  margin: auto;
`;

export const LoginCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 8px 8px rgba(255, 255, 255, 0.1);
  .card__title {
    font-size: 2.5rem !important;
  }
`;

export const LoginForm = styled.form`
  margin-top: 1rem;
  .form__space {
    width: 100%;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  display: block;
`;

export const Input = styled(AntInput)`
  .ant-input {
    width: 100%;
    padding: 6px 11px;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonContainer = styled(Space)`
  margin-top: 1rem;
  width: 100%;
`;
