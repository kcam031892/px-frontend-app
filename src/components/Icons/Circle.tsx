import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

interface CircleProps extends SvgIconProps {
  fillColor: string | undefined;
}

function Circle(props: CircleProps) {
  return (
    <SvgIcon width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <circle cx="8" cy="8.00065" r="2.66667" fill={props.fillColor} />
    </SvgIcon>
  );
}

export default Circle;
