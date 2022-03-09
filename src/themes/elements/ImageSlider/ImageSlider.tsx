import { Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const ImageSlider = withStyles({
  root: {
    color: '#fff',
    width: '256px',
    height: 4,
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
})(Slider);

export default ImageSlider;
