import styled from 'styled-components';
import { Button as AntButton } from 'antd';
import { ButtonBaseStyles } from './ButtonBase';

const Button = styled(AntButton)`
  ${ButtonBaseStyles}
`;

Button.defaultProps = {
  type: 'primary',
};

export default Button;
