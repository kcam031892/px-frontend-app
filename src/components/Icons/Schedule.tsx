import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

function Schedule(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13C21 8.02944 16.9706 4 12 4C7.02944 4 3 8.02944 3 13ZM11.963 7.5C11.7018 7.5 11.4845 7.70115 11.4645 7.96165L11.0317 13.588C11.0133 13.8271 11.1673 14.0456 11.3987 14.1087L15.8684 15.3278C16.1865 15.4145 16.5 15.1751 16.5 14.8454V14.7902C16.5 14.6107 16.4039 14.4451 16.2481 14.356L13 12.5L12.545 7.95025C12.5195 7.69465 12.3044 7.5 12.0475 7.5H11.963Z"
        fill="white"
      />
    </SvgIcon>
  );
}

export default Schedule;
