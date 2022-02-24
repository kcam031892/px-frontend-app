import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const VideoSlider = withStyles({
  root: {
    color: '#fff',
    height: 4,
    '& .MuiSlider-valueLabel': {
      left: 'calc(-50% + 2px)',
    },
  },
  thumb: {
    height: 20,
    width: 20,
    marginTop: -8,
    '&.Mui-disabled': {
      height: 20,
      width: 20,
      marginTop: -8,
    },
  },
  track: {
    height: 4,
  },
  rail: {
    height: 4,
  },
  valueLabel: {
    '& span span': {
      color: '#000',
    },
  },
})(Slider);

export default VideoSlider;
