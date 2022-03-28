import { Box, FormControl, InputLabel } from '@material-ui/core';
import MuiPhoneInput from 'material-ui-phone-number';
import React from 'react';

import { Input } from '..';
import { useStyles } from './ContactInput.styles';

const ContactInput = () => {
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
        />
      </Box>
    </FormControl>
  );
};

export default ContactInput;
