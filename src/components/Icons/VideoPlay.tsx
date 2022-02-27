import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

function VideoPlay(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M20.3337 3.33301C11.1337 3.33301 3.66699 10.7997 3.66699 19.9997C3.66699 29.1997 11.1337 36.6663 20.3337 36.6663C29.5337 36.6663 37.0003 29.1997 37.0003 19.9997C37.0003 10.7997 29.5337 3.33301 20.3337 3.33301Z"
        fill="#25282A"
      />
      <path
        d="M17.0005 25.833V14.1664C17.0005 13.483 17.7838 13.083 18.3338 13.4997L26.1172 19.333C26.5672 19.6664 26.5672 20.333 26.1172 20.6664L18.3338 26.4997C17.7838 26.9164 17.0005 26.5164 17.0005 25.833Z"
        fill="white"
      />
    </SvgIcon>
  );
}

export default VideoPlay;
