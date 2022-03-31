import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

function ImageSliderLarge(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M23 18V6C23 4.9 22.1 4 21 4H3C1.9 4 1 4.9 1 6V18C1 19.1 1.9 20 3 20H21C22.1 20 23 19.1 23 18ZM8.9 12.98L11 15.51L14.1 11.52C14.3 11.26 14.7 11.26 14.9 11.53L18.41 16.21C18.66 16.54 18.42 17.01 18.01 17.01H6.02C5.6 17.01 5.37 16.53 5.63 16.2L8.12 13C8.31 12.74 8.69 12.73 8.9 12.98Z"
        fill="#707372"
      />
    </SvgIcon>
  );
}

export default ImageSliderLarge;
