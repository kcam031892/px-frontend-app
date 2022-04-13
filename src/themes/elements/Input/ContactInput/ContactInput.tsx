import { Box, FormControl, InputLabel, TextFieldProps } from '@material-ui/core';
import React from 'react';
// import MuiPhoneInput from 'material-ui-phone-number';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { Input } from '..';
import { useStyles } from './ContactInput.styles';

type Props = {
  errorMessage?: string;
  handleCodeChange?: any;
} & TextFieldProps;
const ContactInput: React.FC<Props> = ({ errorMessage, handleCodeChange, ...props }) => {
  const classes = useStyles();
  return (
    <FormControl fullWidth>
      <InputLabel id="lblContactInput" shrink>
        Contact Number
      </InputLabel>
      <Box className={classes.inputContainer}>
        {/* <MuiPhoneInput
          defaultCountry="us"
          InputProps={{
            disableUnderline: true,
            readOnly: true,
            style: { width: 130, marginRight: 10 },
          }}
          inputProps={{ tabIndex: 3 }}
        /> */}
        <PhoneInput
          specialLabel={''}
          country={'us'}
          inputClass={classes.contactInput_class}
          containerClass={classes.contactContainer_class}
          buttonClass={classes.contactButton_class}
          inputProps={{
            readOnly: true,
          }}
          onChange={(val) => handleCodeChange(val)}
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
