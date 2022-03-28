import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MUISelect, SelectProps } from '@material-ui/core';
import React from 'react';
import { IKeyValue } from 'shared/interfaces/utils/IKeyValue';

type Props = {
  fullWidth?: boolean;
  label?: string;
  errorMessage?: string;
  data: IKeyValue[];
  hasMargin?: boolean;
} & SelectProps;
const Select: React.FC<Props> = ({ fullWidth, label, errorMessage, data, hasMargin = true, ...props }) => {
  return (
    <>
      <FormControl margin={hasMargin ? 'normal' : undefined} fullWidth={fullWidth} error={!!errorMessage}>
        {!!label && <InputLabel shrink>{label}</InputLabel>}

        <MUISelect disableUnderline {...props} error={!!errorMessage}>
          {data.map((item) => (
            <MenuItem value={item.value}>{item.key}</MenuItem>
          ))}
        </MUISelect>
        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default Select;

Select.defaultProps = {
  fullWidth: false,
};
