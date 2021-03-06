import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

function Auditions(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect x="2" y="6" width="13" height="12" rx="2" fill="white" />
      <path
        opacity="0.4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.2929 7.70708C20.9228 7.07711 22 7.52328 22 8.41418V15.5858C22 16.4767 20.9228 16.9228 20.2929 16.2929L16.7071 12.7071C16.3166 12.3165 16.3166 11.6834 16.7071 11.2929L20.2929 7.70708Z"
        fill="white"
      />
    </SvgIcon>
  );
}

export default Auditions;
