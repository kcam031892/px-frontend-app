import { withStyles } from '@material-ui/core/styles';
import MuiTab from '@material-ui/core/Tab';

const MyTab = withStyles({
  root: {
    '& .MuiTab-wrapper': {
      color: '#212121',
      fontSize: '16px',
      textTransform: 'capitalize',
      alignItems: 'flex-start',
    },
  },
  selected: {},
})(MuiTab);

export default MyTab;
