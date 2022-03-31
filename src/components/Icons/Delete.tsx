import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';
import React from 'react';

function Delete(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path
        d="M4 5.33276V13.1661C4 13.9945 4.67157 14.6661 5.5 14.6661H10.5C11.3284 14.6661 12 13.9945 12 13.1661V5.33276H4Z"
        fill="#212121"
      />
      <path
        opacity="0.4"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.3335 2.99927C9.3335 2.44698 8.88578 1.99927 8.3335 1.99927H7.66683C7.11455 1.99927 6.66683 2.44698 6.66683 2.99927H3.8335C3.55735 2.99927 3.3335 3.22313 3.3335 3.49927C3.3335 3.77541 3.55735 3.99927 3.8335 3.99927H12.1668C12.443 3.99927 12.6668 3.77541 12.6668 3.49927C12.6668 3.22313 12.443 2.99927 12.1668 2.99927H9.3335Z"
        fill="#212121"
      />
    </SvgIcon>
  );
}

export default Delete;
