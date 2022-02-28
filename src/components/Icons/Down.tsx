import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

function Down(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect opacity="0.4" x="7.3335" y="3.33337" width="1.33333" height="9.33333" rx="0.666667" fill="#212121" />
      <path
        d="M4.47157 7.52855C4.21122 7.2682 3.78911 7.2682 3.52876 7.52855C3.26841 7.7889 3.26841 8.21101 3.52876 8.47136L7.52876 12.4714C7.78114 12.7237 8.18754 12.7326 8.45065 12.4914L12.4506 8.82473C12.7221 8.57593 12.7404 8.15422 12.4916 7.88281C12.2428 7.6114 11.8211 7.59306 11.5497 7.84186L8.02021 11.0772L4.47157 7.52855Z"
        fill="#212121"
      />
    </SvgIcon>
  );
}

export default Down;
