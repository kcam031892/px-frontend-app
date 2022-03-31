import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

function Pitch(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M8 5.77181C8 5.40898 8.37431 5.16696 8.70518 5.31585L22.5456 11.544C22.9386 11.7209 22.9386 12.279 22.5456 12.4559L8.70518 18.6841C8.37431 18.833 8 18.591 8 18.2281V13.1669L20.447 12L8 10.8331V5.77181Z"
        fill="white"
      />
      <g opacity="0.4">
        <path
          d="M4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8H5C5.55228 8 6 7.55228 6 7C6 6.44772 5.55228 6 5 6H4Z"
          fill="white"
        />
        <path
          d="M0 12C0 11.4477 0.447715 11 1 11H5C5.55228 11 6 11.4477 6 12C6 12.5523 5.55228 13 5 13H1C0.447715 13 0 12.5523 0 12Z"
          fill="white"
        />
        <path
          d="M3 17C3 16.4477 3.44772 16 4 16H5C5.55228 16 6 16.4477 6 17C6 17.5523 5.55228 18 5 18H4C3.44772 18 3 17.5523 3 17Z"
          fill="white"
        />
      </g>
    </SvgIcon>
  );
}

export default Pitch;
