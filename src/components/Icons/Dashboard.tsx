import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

function Dashboard(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M3 4C2.44772 4 2 4.44772 2 5V7C2 7.55228 2.44771 8 3 8H20C20.5523 8 21 7.55228 21 7V5C21 4.44772 20.5523 4 20 4H3Z"
        fill="white"
      />
      <path
        d="M3 10C2.44772 10 2 10.4477 2 11V19C2 19.5523 2.44772 20 3 20H13C13.5523 20 14 19.5523 14 19V11C14 10.4477 13.5523 10 13 10H3Z"
        fill="white"
      />
      <rect opacity="0.4" x="16" y="10" width="5" height="10" rx="1" fill="white" />
    </SvgIcon>
  );
}

export default Dashboard;
