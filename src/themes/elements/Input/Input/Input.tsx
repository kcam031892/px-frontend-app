import { Box, TextField, TextFieldProps, Typography } from '@material-ui/core';
import React from 'react';

type Props = {
  errorMessage?: string;
} & TextFieldProps;
const Input: React.FC<Props> = ({ errorMessage, ...props }) => {
  return (
    <>
      <TextField
        error={!!errorMessage}
        type={'text'}
        {...props}
        inputProps={{
          ...props.inputProps,
        }}
        helperText={!!errorMessage && errorMessage}
      />
    </>
  );
};

export default Input;
