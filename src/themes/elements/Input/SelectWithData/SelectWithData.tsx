import { FormControl, FormHelperText, InputLabel, Select as MUISelect, MenuItem, SelectProps } from '@material-ui/core';
import React from 'react';
import { IKeyValue } from 'shared/interfaces/utils/IKeyValue';

type Props = {
  fullWidth?: boolean;
  label?: string;
  errorMessage?: string;
  data: IKeyValue[];
  hasMargin?: boolean;
} & SelectProps;
const SelectWithData: React.FC<Props> = ({ fullWidth, label, errorMessage, data, hasMargin = true, ...props }) => {
  return (
    <>
      <FormControl margin={hasMargin ? 'normal' : undefined} fullWidth={fullWidth} error={!!errorMessage}>
        {!!label && <InputLabel shrink>{label}</InputLabel>}

        <MUISelect disableUnderline {...props} error={!!errorMessage}>
          {data.map((item) => (
            <MenuItem value={item.value} key={item.key}>
              {item.key}
            </MenuItem>
          ))}
        </MUISelect>
        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default SelectWithData;

SelectWithData.defaultProps = {
  fullWidth: false,
};
