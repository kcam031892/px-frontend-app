import { Input, InputNumber } from 'antd';
import styled from 'styled-components';

export const CInput = styled(Input)``;
export const CInputSearch = styled(Input.Search)``;
export const CInputNumber = styled(InputNumber)``;

CInput.defaultProps = {
  size: 'large',
};
CInputSearch.defaultProps = {
  size: 'large',
};

export const InputWrapper = styled.div<{
  $haserror?: boolean;
  $isFullWidth?: boolean;
}>`
  width: 100%;
  > ${CInput}, ${CInputNumber} {
    border-color: ${({ $haserror }) => $haserror && '#cc0033'};
    background-color: ${({ $haserror }) => $haserror && '#fce4e4'};
    width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};

    &.input-prefix {
      padding: 0;
      .ant-input-prefix {
        background-color: ${({ theme, $haserror }) => ($haserror ? theme.errorColor : theme.greyColor)};
        color: ${({ theme, $haserror }) => $haserror && theme.whiteColor};
        padding: 4px 11px;
        margin-right: 0;
      }
      .ant-input-suffix {
        background-color: ${({ theme, $haserror }) => ($haserror ? theme.errorColor : theme.greyColor)};
        color: ${({ theme, $haserror }) => $haserror && theme.whiteColor};
        padding: 4px 11px;
        margin-right: 0;
      }
    }
    .ant-input {
      background-color: ${({ $haserror }) => $haserror && '#fce4e4'};
      padding: 4px 11px;
    }
  }
`;

export const ErrorText = styled.label`
  display: block;
  margin-top: 0.25rem;
  color: ${({ theme }) => theme.errorColor};
`;
export const LabelWrapper = styled.div`
  display: flex;

  gap: 0.25rem;
`;
export const InputLabel = styled.label`
  display: inline-block;
  margin-bottom: 0.25rem;
  color: #000;
`;
export const RequiredLabel = styled.label`
  color: ${({ theme }) => theme.errorColor};
`;
