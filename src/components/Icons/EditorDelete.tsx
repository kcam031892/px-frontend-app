import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

function EditorDelete(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M6 8.99902V20.499C6 21.3274 6.67157 21.999 7.5 21.999H16.5C17.3284 21.999 18 21.3275 18 20.499V8.99902H6Z"
        fill="white"
      />
      <path
        opacity="0.5"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14 4.49902V3.99902C14 3.44674 13.5523 2.99902 13 2.99902H11C10.4477 2.99902 10 3.44674 10 3.99902V4.49902H5.5C5.22386 4.49902 5 4.72288 5 4.99902V6.49902C5 6.77517 5.22386 6.99902 5.5 6.99902H18.5C18.7761 6.99902 19 6.77517 19 6.49902V4.99902C19 4.72288 18.7761 4.49902 18.5 4.49902H14Z"
        fill="white"
      />
    </SvgIcon>
  );
}

export default EditorDelete;
