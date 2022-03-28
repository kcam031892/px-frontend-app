import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

function Up(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <rect opacity="0.4" x="7.3335" y="3.33337" width="1.33333" height="9.33333" rx="0.666667" fill="#212121" />
      <path
        d="M4.47157 8.47145C4.21122 8.7318 3.78911 8.7318 3.52876 8.47145C3.26841 8.2111 3.26841 7.78899 3.52876 7.52864L7.52876 3.52864C7.78114 3.27625 8.18754 3.26742 8.45065 3.50861L12.4506 7.17527C12.7221 7.42407 12.7404 7.84578 12.4916 8.11719C12.2428 8.3886 11.8211 8.40694 11.5497 8.15814L8.02021 4.9228L4.47157 8.47145Z"
        fill="#212121"
      />
    </SvgIcon>
  );
}

export default Up;
