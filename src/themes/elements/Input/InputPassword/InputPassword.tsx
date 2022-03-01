import { Box, IconButton, InputAdornment, TextField, TextFieldProps, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';

type Props = {
  errorMessage?: string;
} & TextFieldProps;
const InputPassword: React.FC<Props> = ({ errorMessage, ...props }) => {
  const [showPassword, setIsShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => {
    setIsShowPassword((curr) => !curr);
  };

  return (
    <Box>
      <TextField
        id="password"
        error={!!errorMessage}
        type={showPassword ? 'text' : 'password'}
        {...props}
        inputProps={{
          ...props.inputProps,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff style={{ color: '#D9D9D9' }} />}
              </IconButton>
            </InputAdornment>
          ),
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

export default InputPassword;
