import { Checkbox, CheckboxProps } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

const CustomCheckbox = withStyles({
  root: {
    color: '#A4A4A4',
    '&$checked': {
      color: '#2962FF',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export default CustomCheckbox;
