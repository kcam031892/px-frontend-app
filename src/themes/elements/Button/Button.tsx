import React from 'react';
import { Button as MUIButton, ButtonProps } from '@material-ui/core';
import clsx from 'clsx';
import { useStyles } from './Button.styles';

type Props = {
  customVariant?: 'newButton';
} & ButtonProps;
const Button: React.FC<Props> = ({ customVariant, ...props }) => {
  const classes = useStyles();
  return (
    <MUIButton
      className={clsx(
        {
          [classes.newButton]: customVariant === 'newButton',
        },
        props.className,
      )}
      {...props}
    >
      {props.children}
    </MUIButton>
  );
};

export default Button;
