import React from 'react';
import { InputProps } from 'antd';
import { CInput, ErrorText, InputLabel, InputWrapper, LabelWrapper, RequiredLabel } from './Input.styled';

type Props = InputProps & {
  errorMessage?: string;
  label?: string;
  isRequired?: boolean;
  $fullWidth?: boolean;
  type?: 'text' | 'search';
};
const Input: React.FC<Props> = ({ errorMessage, label, type, isRequired, $fullWidth, ...inputProps }) => {
  const renderInput = () => {
    switch (type) {
      case 'search':
        return <CInput.Search size="large" {...inputProps} />;
      default:
        return <CInput {...inputProps} />;
    }
  };

  return (
    <InputWrapper $haserror={!!errorMessage} $isFullWidth={$fullWidth}>
      {label && (
        <LabelWrapper>
          {isRequired && <RequiredLabel>*</RequiredLabel>}
          <InputLabel>{label}</InputLabel>
        </LabelWrapper>
      )}
      {renderInput()}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </InputWrapper>
  );
};

export default Input;
