import { Slider, withStyles } from '@material-ui/core';

export const ImageSizeSlider = withStyles({
  root: {
    color: '#707372',
    height: 4,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#707372',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);
