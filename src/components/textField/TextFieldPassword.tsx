import { IconButton, InputAdornment, TextField, TextFieldProps } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';

export default function TextFieldPassword(props: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      id="password"
      type={showPassword ? 'text' : 'password'}
      {...props}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Visibility /> : <VisibilityOff style={{ color: '#D9D9D9' }} />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
