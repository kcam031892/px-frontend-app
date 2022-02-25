import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';

const MyTabs = withStyles({
  root: {
    borderBottom: '1px solid #D9D9D9',
  },
  indicator: {
    backgroundColor: '#212121',
    height: '4px',
    borderRadius: '4px 4px 0px 0px',
  },
  selected: {},
})(Tabs);

export default MyTabs;
