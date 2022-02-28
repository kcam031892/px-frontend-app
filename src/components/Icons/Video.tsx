import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

function Video(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="2" y="6" width="13" height="12" rx="2" fill="#212121" />
      <path
        opacity="0.4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.2927 7.70696C20.9227 7.07699 21.9998 7.52316 21.9998 8.41406V15.5856C21.9998 16.4765 20.9227 16.9227 20.2927 16.2927L16.707 12.707C16.3164 12.3164 16.3164 11.6833 16.707 11.2927L20.2927 7.70696Z"
        fill="#212121"
      />
    </SvgIcon>
  );
}

export default Video;
