import { Box, TextField, TextFieldProps, Typography } from '@material-ui/core';
import React from 'react';

type Props = {
  errorMessage?: string;
} & TextFieldProps;
const Input: React.FC<Props> = ({ errorMessage, ...props }) => {
  return (
    <Box>
      <TextField
        error={!!errorMessage}
        type={'text'}
        {...props}
        inputProps={{
          ...props.inputProps,
        }}
      />
      {errorMessage && (
        <Typography variant="caption" color="error">
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default Input;
