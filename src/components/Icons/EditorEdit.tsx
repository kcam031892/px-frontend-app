import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

function EditorEdit(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M3 17.4604V20.5004C3 20.7804 3.22 21.0004 3.5 21.0004H6.54C6.67 21.0004 6.8 20.9504 6.89 20.8504L17.81 9.94043L14.06 6.19043L3.15 17.1004C3.05 17.2004 3 17.3204 3 17.4604Z"
        fill="white"
      />
      <path
        opacity="0.5"
        d="M20.7099 7.04055C21.0999 6.65055 21.0999 6.02055 20.7099 5.63055L18.3699 3.29055C17.9799 2.90055 17.3499 2.90055 16.9599 3.29055L15.1299 5.12055L18.8799 8.87055L20.7099 7.04055Z"
        fill="white"
      />
    </SvgIcon>
  );
}

export default EditorEdit;
