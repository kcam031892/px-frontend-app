import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

function Audio(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.97852 15.8007C5.99272 15.7241 6 15.641 6 15.5512V15.5V5C6 5 10.0263 4.23253 11 4C11.4512 3.89226 12 3.51789 12 2.93171V1.17317C12 0.382255 11.2639 -0.181728 10.5394 0.0541831L4.78944 1.81272C4.31978 1.96567 4 2.41894 4 2.93171V13.1423C3.68722 13.0501 3.35064 13 3 13C1.34315 13 0 14.1193 0 15.5C0 16.8807 1.34315 18 3 18C4.53473 18 5.80029 17.0396 5.97852 15.8007Z"
        fill="#212121"
      />
    </SvgIcon>
  );
}

export default Audio;
