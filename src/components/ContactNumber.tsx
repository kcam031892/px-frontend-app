import React from 'react';
import { Box, FormControl, FormHelperText, InputLabel, TextField } from '@material-ui/core';
import MuiPhoneInput from 'material-ui-phone-number';

interface inputProps {
  tabIndex?: number;
}

interface ContactNumberProps {
  contactNumber: string;
  contactNumberCode: string;
  onCodeChange: (value: string) => void;
  onNumberChange: (value: string) => void;
  codeInputProps?: inputProps;
  numberInputProps?: inputProps;
  error?: boolean;
  helperText?: string;
}

export default function ContactNumber(props: ContactNumberProps) {
  const codeInputProps = props.codeInputProps || {};
  const numberInputProps = props.numberInputProps || {};
  return (
    <FormControl margin={'normal'} fullWidth error={props.error || false}>
      <InputLabel id="lblContactNumber" shrink>
        Contact Number
      </InputLabel>
      <Box style={{ marginTop: 22, display: 'flex' }}>
        <MuiPhoneInput
          defaultCountry="au"
          value={props.contactNumberCode}
          error={props.error || false}
          InputProps={{
            disableUnderline: true,
            readOnly: true,
            style: { width: 110, marginRight: 10 },
          }}
          inputProps={{ ...codeInputProps }}
          onChange={(value: string) => props.onCodeChange && props.onCodeChange(value)}
        />
        <TextField
          value={props.contactNumber}
          InputProps={{ disableUnderline: true }}
          InputLabelProps={{ shrink: true }}
          error={props.error || false}
          style={{ flex: '1' }}
          inputProps={{ ...numberInputProps }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            props.onNumberChange && props.onNumberChange(event.target.value)
          }
        />
      </Box>
      <FormHelperText>{props.helperText || ''}</FormHelperText>
    </FormControl>
  );
}
