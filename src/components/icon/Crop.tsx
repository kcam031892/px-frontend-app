import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

function Crop(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M17 15H19V7C19 5.9 18.1 5 17 5H9V7H16C16.55 7 17 7.45 17 8V15ZM8 17C7.45 17 7 16.55 7 16V2C7 1.45 6.55 1 6 1C5.45 1 5 1.45 5 2V5H2C1.45 5 1 5.45 1 6C1 6.55 1.45 7 2 7H5V17C5 18.1 5.9 19 7 19H17V22C17 22.55 17.45 23 18 23C18.55 23 19 22.55 19 22V19H22C22.55 19 23 18.55 23 18C23 17.45 22.55 17 22 17H8Z" />
    </SvgIcon>
  );
}

export default Crop;
