import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

function AddNew(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <g filter="url(#filter0_ddd)">
        <circle cx="76" cy="66" r="28" fill="#212121" />
        <path d="M83 67H77V73H75V67H69V65H75V59H77V65H83V67Z" fill="white" />
      </g>
      <defs>
        <filter id="filter0_ddd" x="0" y="0" width="152" height="152" filterUnits="userSpaceOnUse">
          <feFlood result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="10" />
          <feGaussianBlur stdDeviation="24" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.278431 0 0 0 0 0.309804 0 0 0 0.08 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="8" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.278431 0 0 0 0 0.309804 0 0 0 0.08 0" />
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="8" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.215686 0 0 0 0 0.278431 0 0 0 0 0.309804 0 0 0 0.04 0" />
          <feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect3_dropShadow" result="shape" />
        </filter>
      </defs>
    </SvgIcon>
  );
}

export default AddNew;
