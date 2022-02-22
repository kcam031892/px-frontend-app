import styled from 'styled-components';

type SelectProps = {
  $isfullwidth?: boolean;
  $haserror?: boolean;
};
export const SelectWrapper = styled.div<SelectProps>`
  .__select {
    width: ${({ $isfullwidth }) => ($isfullwidth ? '100%' : '250px')};
  }
  .ant-select-selector {
    background-color: ${({ $haserror, theme }) => $haserror && theme.lightErrorColor} !important;
    border-color: ${({ $haserror, theme }) => $haserror && theme.errorColor} !important;
  }
`;

export const LabelWrapper = styled.div`
  display: flex;
  gap: 0.25rem;
`;
export const SelectLabel = styled.label`
  display: inline-block;
  margin-bottom: 0.25rem;
  color: #000;
`;
export const RequiredLabel = styled.label`
  color: ${({ theme }) => theme.errorColor};
`;

export const ErrorText = styled.label`
  display: block;
  margin-top: 0.25rem;
  color: ${({ theme }) => theme.errorColor};
`;
// border: 1px solid ;
// border-color: ${({ $haserror }) => $haserror && '#cc0033'};
