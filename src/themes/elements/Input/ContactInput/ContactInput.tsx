import { Box, FormControl, InputLabel, TextFieldProps } from '@material-ui/core';
import React from 'react';
import MuiPhoneInput from 'material-ui-phone-number';

import { Input } from '..';
import { useStyles } from './ContactInput.styles';

type Props = {
  errorMessage?: string;
} & TextFieldProps;
const ContactInput: React.FC<Props> = ({ errorMessage, ...props }) => {
  const classes = useStyles();
  return (
    <FormControl fullWidth>
      <InputLabel id="lblContactInput" shrink>
        Contact Number
      </InputLabel>
      <Box className={classes.inputContainer}>
        <MuiPhoneInput
          defaultCountry="au"
          InputProps={{
            disableUnderline: true,
            readOnly: true,
            style: { width: 110, marginRight: 10 },
          }}
          inputProps={{ tabIndex: 3 }}
        />
        <Input
          fullWidth
          InputProps={{ disableUnderline: true }}
          InputLabelProps={{ shrink: true }}
          style={{ flex: '1' }}
          errorMessage={errorMessage}
          {...props}
        />
      </Box>
    </FormControl>
  );
};

export default ContactInput;
