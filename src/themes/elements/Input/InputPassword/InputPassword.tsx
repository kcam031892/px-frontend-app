import { Box, IconButton, InputAdornment, TextField, TextFieldProps, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react';
import { classicNameResolver } from 'typescript';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    eyeIcon: {
      padding: '8px',
      marginRight: '-10px',
    },
  }),
);

type Props = {
  errorMessage?: string;
} & TextFieldProps;
const InputPassword: React.FC<Props> = ({ errorMessage, ...props }) => {
  const [showPassword, setIsShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => {
    setIsShowPassword((curr) => !curr);
  };
  const classes = useStyles();

  return (
    <Box>
      <TextField
        id="password"
        error={!!errorMessage}
        type={showPassword ? 'text' : 'password'}
        {...props}
        InputProps={{
          ...props.InputProps,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                className={classes.eyeIcon}
                onClick={toggleShowPassword}
              >
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
