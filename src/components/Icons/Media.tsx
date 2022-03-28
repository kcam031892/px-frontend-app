import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

function Media(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="2" y="6" width="13" height="12" rx="2" fill="white" />
      <path
        opacity="0.4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.293 7.70696C20.923 7.07699 22.0001 7.52316 22.0001 8.41406V15.5856C22.0001 16.4765 20.923 16.9227 20.293 16.2927L16.7072 12.707C16.3167 12.3164 16.3167 11.6833 16.7072 11.2927L20.293 7.70696Z"
        fill="white"
      />
    </SvgIcon>
  );
}

export default Media;
