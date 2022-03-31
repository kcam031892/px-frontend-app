import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

function Profiles(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        opacity="0.4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.85714 1H11.7364C12.0911 1 12.4343 1.12568 12.7051 1.35472L17.4687 5.38376C17.8057 5.66876 18 6.08767 18 6.52897V19.0826C18 20.8731 17.9796 20.9992 16.1429 20.9992H4.85714C3.02045 20.9992 3 20.8731 3 19.0826V2.91659C3 1.12612 3.02045 1 4.85714 1ZM7 12.9995C7 12.4472 7.44772 11.9995 8 11.9995H15C15.5523 11.9995 16 12.4472 16 12.9995C16 13.5518 15.5523 13.9995 15 13.9995H8C7.44772 13.9995 7 13.5518 7 12.9995ZM8 15.9994C7.44772 15.9994 7 16.4471 7 16.9993C7 17.5516 7.44772 17.9993 8 17.9993H11C11.5523 17.9993 12 17.5516 12 16.9993C12 16.4471 11.5523 15.9994 11 15.9994H8Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.85714 2.99976H14.7364C15.0911 2.99976 15.4343 3.12543 15.7051 3.35448L20.4687 7.38352C20.8057 7.66851 21 8.08742 21 8.52873V21.0823C21 22.8728 20.9796 22.9989 19.1429 22.9989H6.85714C5.02045 22.9989 5 22.8728 5 21.0823V4.91634C5 3.12588 5.02045 2.99976 6.85714 2.99976ZM7 12.9993C7 12.4471 7.44772 11.9994 8 11.9994H15C15.5523 11.9994 16 12.4471 16 12.9993C16 13.5516 15.5523 13.9993 15 13.9993H8C7.44772 13.9993 7 13.5516 7 12.9993ZM8 15.9992C7.44772 15.9992 7 16.4469 7 16.9992C7 17.5514 7.44772 17.9991 8 17.9991H11C11.5523 17.9991 12 17.5514 12 16.9992C12 16.4469 11.5523 15.9992 11 15.9992H8Z"
        fill="white"
      />
    </SvgIcon>
  );
}

export default Profiles;
