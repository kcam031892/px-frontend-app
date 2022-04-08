import { TextField, TextFieldProps } from '@material-ui/core';
import React from 'react';

type Props = {
  errorMessage?: string;
} & TextFieldProps;
const InputNumber: React.FC<Props> = ({ errorMessage, ...props }) => {
  return (
    <>
      <TextField
        error={!!errorMessage}
        type={'number'}
        {...props}
        inputProps={{
          ...props.inputProps,
        }}
        helperText={!!errorMessage && errorMessage}
      />
    </>
  );
};

export default InputNumber;
